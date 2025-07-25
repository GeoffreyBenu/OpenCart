const mongoose = require('mongoose');
const slugify = require('slugify');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
    unique: true,
    maxlength: [100, 'Product name cannot exceed 100 characters'],
    minlength: [3, 'Product name must be at least 3 characters']
  },
  slug: String,
  description: {
    type: String,
    required: [true, 'Product description is required'],
    maxlength: [1000, 'Description cannot exceed 1000 characters'],
    minlength: [20, 'Description must be at least 20 characters']
  },
  price: {
    type: Number,
    required: [true, 'Product price is required'],
    min: [0, 'Price cannot be negative'],
    set: val => Math.round(val * 100) / 100 // Ensure 2 decimal places
  },
  discountedPrice: {
    type: Number,
    validate: {
      validator: function(val) {
        return val < this.price;
      },
      message: 'Discounted price ({VALUE}) must be below regular price'
    }
  },
  category: {
    type: String,
    required: [true, 'Product category is required'],
    enum: {
      values: ['Luxury Sedan', 'Sports Coupe', 'Electric Sedan', 'Luxury SUV', 'Hybrid Sedan'],
      message: '{VALUE} is not a valid category'
    }
  },
  images: [{
    type: String,
    validate: {
      validator: function(val) {
        return val.match(/\.(jpeg|jpg|png|webp)$/);
      },
      message: 'Image URL must be a valid image file (jpeg, jpg, png, webp)'
    }
  }],
  stock: {
    type: Number,
    required: [true, 'Stock quantity is required'],
    min: [0, 'Stock cannot be negative'],
    default: 0
  },
  ratingsAverage: {
    type: Number,
    default: 4.5,
    min: [1, 'Rating must be at least 1.0'],
    max: [5, 'Rating must be at most 5.0'],
    set: val => Math.round(val * 10) / 10 // 1 decimal place
  },
  ratingsQuantity: {
    type: Number,
    default: 0
  },
  features: [String],
  specifications: {
    type: Map,
    of: String
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    select: false
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual property for discount percentage
productSchema.virtual('discountPercentage').get(function() {
  if (!this.discountedPrice) return 0;
  return Math.round((1 - this.discountedPrice / this.price) * 100);
});

// Document middleware: runs before .save() and .create()
productSchema.pre('save', function(next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

// Query middleware
productSchema.pre(/^find/, function(next) {
  this.find({ isActive: { $ne: false } });
  next();
});

// Aggregation middleware
productSchema.pre('aggregate', function(next) {
  this.pipeline().unshift({ $match: { isActive: { $ne: false } } });
  next();
});

// Indexes
productSchema.index({ category: 1, isActive: 1 });
productSchema.index({ price: 1, ratingsAverage: -1 });
productSchema.index({ name: 'text', description: 'text' });
productSchema.index({ slug: 1 });

// Static methods
productSchema.statics.getCategories = function() {
  return this.distinct('category');
};

// Instance methods
productSchema.methods.isInStock = function(quantity = 1) {
  return this.stock >= quantity;
};

const Product = mongoose.model('Product', productSchema);

module.exports = Product;