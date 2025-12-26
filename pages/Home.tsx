import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const calculators = [
  { name: 'BMI Calculator', path: '/bmi', description: 'Calculate your Body Mass Index.', icon: '❤️' },
  { name: 'Loan Calculator', path: '/loan', description: 'Estimate your loan payments.', icon: '💰' },
  { name: 'Compound Interest', path: '/compound-interest', description: 'See your investments grow.', icon: '📈' },
  { name: 'Calorie Calculator', path: '/calorie', description: 'Estimate your daily calorie needs.', icon: '🥗' },
  { name: 'Currency Converter', path: '/currency', description: 'Convert between world currencies.', icon: '💸' },
  { name: 'Calculation History', path: '/history', description: 'View all your past calculations.', icon: '📚' },
];

const Home: React.FC = () => {
  return (
    <div className="space-y-8">
      <SEO 
        title="Home" 
        description="Your free, all-in-one calculator for health and finance. Instantly calculate BMI, loan payments, compound interest, daily calories, and convert currency."
      />
      <div className="text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-text-primary sm:text-5xl md:text-6xl">
          Your All-in-One <span className="text-sky-400">Smart Calculator</span>
        </h1>
        <p className="mt-3 max-w-md mx-auto text-base text-text-secondary sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
          Instantly solve your daily health and financial questions. From calculating your BMI and loan payments to tracking investments and converting currency, we provide the simple, powerful tools you need. Get started below.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {calculators.map((calc) => (
          <Link
            key={calc.name}
            to={calc.path}
            className="group block bg-card rounded-xl p-6 shadow-lg hover:bg-secondary transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="flex items-center space-x-4">
              <div className="text-4xl">{calc.icon}</div>
              <div>
                <h3 className="text-lg font-bold text-text-primary group-hover:text-primary">{calc.name}</h3>
                <p className="text-text-secondary text-sm">{calc.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;