import React, { useState } from 'react';
import { Car, ShoppingCart, Shirt, Gift, CreditCard, Pill, Briefcase, Plane, Heart } from 'lucide-react';
import ServiceModal from '../components/ServiceModal';

const services = [
  {
    id: 'taxi',
    name: 'Taxi Rides',
    icon: Car,
    description: 'Airport pickups, city rides, and transportation services',
    color: 'bg-blue-500'
  },
  {
    id: 'grocery',
    name: 'Grocery Shopping & Delivery',
    icon: ShoppingCart,
    description: 'We shop and deliver your groceries',
    color: 'bg-green-500'
  },
  {
    id: 'laundry',
    name: 'Laundry & Dry-Cleaning',
    icon: Shirt,
    description: 'Pickup, clean, and delivery of your clothes',
    color: 'bg-purple-500'
  },
  {
    id: 'delivery',
    name: 'Gift & Parcel Delivery',
    icon: Gift,
    description: 'Same-day delivery of gifts and packages',
    color: 'bg-pink-500'
  },
  {
    id: 'bills',
    name: 'Utility & Bill Payments',
    icon: CreditCard,
    description: 'Pay your bills and utilities on your behalf',
    color: 'bg-orange-500'
  },
  {
    id: 'prescription',
    name: 'Prescription Runs',
    icon: Pill,
    description: 'Collect medications from pharmacies',
    color: 'bg-red-500'
  },
  {
    id: 'errands',
    name: 'School & Office Errands',
    icon: Briefcase,
    description: 'Document collection, submissions, and more',
    color: 'bg-indigo-500'
  },
  {
    id: 'airport',
    name: 'Airport Pickups & Drop-offs',
    icon: Plane,
    description: 'Reliable airport transportation services',
    color: 'bg-cyan-500'
  },
  {
    id: 'senior',
    name: 'Senior Support & Pet Care',
    icon: Heart,
    description: 'Assistance for seniors and pet care services',
    color: 'bg-rose-500'
  }
];

export default function HomePage() {
  const [selectedService, setSelectedService] = useState<string | null>(null);

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-900 to-red-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            ✨ QUICKLINK SERVICES ✨
          </h1>
          <p className="text-2xl md:text-3xl mb-8 font-light">
            "Your Time, Our Priority"
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => setSelectedService('taxi')}
              className="bg-white text-red-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
            >
              Book a Service
            </button>
            <a 
              href="#services"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-red-900 transition-colors"
            >
              View Services
            </a>
          </div>
        </div>
      </section>

      {/* Trust Row */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-8 text-center">
            <div className="flex items-center space-x-2 text-lg font-medium text-gray-700">
              <span className="text-green-600">✔</span>
              <span>Fast & Reliable</span>
            </div>
            <div className="flex items-center space-x-2 text-lg font-medium text-gray-700">
              <span className="text-green-600">✔</span>
              <span>Affordable</span>
            </div>
            <div className="flex items-center space-x-2 text-lg font-medium text-gray-700">
              <span className="text-green-600">✔</span>
              <span>Trusted</span>
            </div>
            <div className="flex items-center space-x-2 text-lg font-medium text-gray-700">
              <span className="text-green-600">✔</span>
              <span>Personalized</span>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section id="services" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
            <p className="text-xl text-gray-600">Choose from our wide range of convenient services</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => {
              const IconComponent = service.icon;
              return (
                <div
                  key={service.id}
                  onClick={() => setSelectedService(service.id)}
                  className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2"
                >
                  <div className="p-8">
                    <div className={`${service.color} w-16 h-16 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{service.name}</h3>
                    <p className="text-gray-600 mb-4">{service.description}</p>
                    <div className="text-red-600 font-medium group-hover:text-red-700">
                      Book Now →
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose QuickLink?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: '24/7 Availability', desc: 'Always ready to serve you' },
              { title: 'Verified Providers', desc: 'All our service providers are vetted' },
              { title: 'Real-time Tracking', desc: 'Know exactly where your request stands' },
              { title: 'Satisfaction Guaranteed', desc: 'Your happiness is our priority' }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="bg-red-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">{index + 1}</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Special Offers */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Special Offers</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-8 rounded-xl">
              <h3 className="text-2xl font-bold mb-4">💼 Corporate Packages</h3>
              <p className="text-lg mb-6">Streamlined services for your business needs. Volume discounts and dedicated support.</p>
              <button className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Learn More
              </button>
            </div>
            <div className="bg-gradient-to-r from-green-500 to-teal-600 text-white p-8 rounded-xl">
              <h3 className="text-2xl font-bold mb-4">🏠 Household Plans</h3>
              <p className="text-lg mb-6">Monthly subscription plans for regular household services. Save up to 30%!</p>
              <button className="bg-white text-teal-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Service Modal */}
      {selectedService && (
        <ServiceModal
          serviceId={selectedService}
          serviceName={services.find(s => s.id === selectedService)?.name || ''}
          onClose={() => setSelectedService(null)}
        />
      )}
    </div>
  );
}