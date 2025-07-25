
# MagariSeller Backend API

A comprehensive REST API for the MagariSeller Auto e-commerce platform built with Node.js, Express, and MongoDB.

## Features

- **Product Management**: Full CRUD operations for car inventory
- **Order Processing**: Complete order lifecycle management
- **Payment Processing**: Secure payment handling with multiple methods
- **Data Validation**: Comprehensive input validation and error handling
- **Database Integration**: Seamless MongoDB integration with Mongoose ODM

## API Endpoints

### Products
- `GET /api/products` - List all products with filtering and pagination
- `GET /api/products/:id` - Get single product details
- `POST /api/products` - Create new product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product (soft delete)

### Orders
- `GET /api/orders` - List all orders with filtering
- `GET /api/orders/:id` - Get single order details
- `POST /api/orders` - Create new order
- `PUT /api/orders/:id` - Update order status
- `DELETE /api/orders/:id` - Cancel order

### Payments
- `GET /api/payments` - List all payments
- `GET /api/payments/:id` - Get payment details
- `POST /api/payments` - Process payment
- `PUT /api/payments/:id` - Update payment status
- `POST /api/payments/:id/refund` - Process refund

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud)

### Installation

1. **Install Dependencies**
   ```bash
   cd backend
   npm install
   ```

2. **Environment Configuration**
   ```bash
   cp .env.example .env
   # Edit .env with your MongoDB connection string
   ```

3. **Database Setup**
   ```bash
   # Seed the database with sample data
   npm run seed
   ```

4. **Start the Server**
   ```bash
   # Development mode with auto-restart
   npm run dev
   
   # Production mode
   npm start
   ```

### MongoDB Connection

#### Local MongoDB
```
MONGODB_URI=mongodb://localhost:27017/magariseller
```

#### MongoDB Atlas (Cloud)
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/magariseller
```

### API Usage Examples

#### Get All Products
```bash
curl http://localhost:5000/api/products
```

#### Create New Order
```bash
curl -X POST http://localhost:5000/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "customerInfo": {
      "firstName": "John",
      "lastName": "Doe",
      "email": "john@example.com",
      "phone": "+1234567890"
    },
    "shippingAddress": {
      "street": "123 Main St",
      "city": "New York",
      "state": "NY",
      "zipCode": "10001"
    },
    "items": [
      {
        "product": "PRODUCT_ID_HERE",
        "quantity": 1
      }
    ]
  }'
```

#### Process Payment
```bash
curl -X POST http://localhost:5000/api/payments \
  -H "Content-Type: application/json" \
  -d '{
    "orderId": "ORDER_ID_HERE",
    "paymentMethod": "credit_card",
    "paymentDetails": {
      "cardNumber": "4111111111111111",
      "cardBrand": "Visa"
    }
  }'
```

## Development

### Running Tests
```bash
npm test
```

### Project Structure
```
backend/
├── models/          # MongoDB schemas
├── routes/          # API route handlers
├── scripts/         # Utility scripts
├── server.js        # Main application file
└── package.json     # Dependencies and scripts
```

### Error Handling
All endpoints return consistent error responses:
```json
{
  "success": false,
  "error": "Error description",
  "message": "Detailed error message"
}
```

### Success Responses
All successful responses follow this format:
```json
{
  "success": true,
  "data": {},
  "message": "Success message (optional)"
}
```

## Production Deployment

1. Set `NODE_ENV=production` in your environment
2. Use a process manager like PM2
3. Set up proper MongoDB indexes for performance
4. Configure proper CORS settings
5. Set up logging and monitoring

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details
```
