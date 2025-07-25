
import React from 'react';
import { Car, Users, Award, MapPin } from 'lucide-react';

const About = () => {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <div className="text-center">
        <div className="flex items-center justify-center space-x-3 mb-6">
          <Car className="text-emerald-600" size={48} />
          <h1 className="text-4xl font-bold text-gray-800">About MagariSeller Auto</h1>
        </div>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          For over a decade, we've been connecting car enthusiasts with their dream vehicles. 
          Our commitment to quality, service, and value has made us a trusted name in the automotive industry.
        </p>
      </div>

      {/* Story Section */}
      <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Story</h2>
        <p className="text-gray-600 text-lg leading-relaxed mb-6">
          Founded in 2010, MagariSeller Auto began as a small family business with a simple mission: 
          to provide exceptional cars at fair prices with unmatched customer service. What started as 
          a single showroom has grown into a nationwide network of automotive excellence.
        </p>
        <p className="text-gray-600 text-lg leading-relaxed">
          Today, we're proud to offer an extensive selection of luxury sedans, sports coupes, 
          electric vehicles, and hybrid cars from the world's most respected manufacturers. 
          Every vehicle in our inventory undergoes rigorous inspection to ensure it meets our 
          high standards of quality and reliability.
        </p>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="text-center">
          <div className="text-4xl font-bold text-emerald-600 mb-2">10+</div>
          <div className="text-gray-600">Years of Experience</div>
        </div>
        <div className="text-center">
          <div className="text-4xl font-bold text-emerald-600 mb-2">5,000+</div>
          <div className="text-gray-600">Happy Customers</div>
        </div>
        <div className="text-center">
          <div className="text-4xl font-bold text-emerald-600 mb-2">500+</div>
          <div className="text-gray-600">Cars Sold Monthly</div>
        </div>
        <div className="text-center">
          <div className="text-4xl font-bold text-emerald-600 mb-2">15</div>
          <div className="text-gray-600">Locations Nationwide</div>
        </div>
      </div>

      {/* Values Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="text-center p-6">
          <Award className="text-emerald-600 mx-auto mb-4" size={48} />
          <h3 className="text-xl font-bold text-gray-800 mb-2">Quality First</h3>
          <p className="text-gray-600">Every car is thoroughly inspected and certified before sale</p>
        </div>
        <div className="text-center p-6">
          <Users className="text-emerald-600 mx-auto mb-4" size={48} />
          <h3 className="text-xl font-bold text-gray-800 mb-2">Customer Focused</h3>
          <p className="text-gray-600">Your satisfaction is our top priority, always</p>
        </div>
        <div className="text-center p-6">
          <MapPin className="text-emerald-600 mx-auto mb-4" size={48} />
          <h3 className="text-xl font-bold text-gray-800 mb-2">Nationwide Service</h3>
          <p className="text-gray-600">Serving customers across the country with excellence</p>
        </div>
      </div>
    </div>
  );
};

export default About;
