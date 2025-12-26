
import React, { Suspense, lazy } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

const Home = lazy(() => import('./pages/Home'));
const BmiCalculator = lazy(() => import('./pages/BmiCalculator'));
const LoanCalculator = lazy(() => import('./pages/LoanCalculator'));
const CompoundInterestCalculator = lazy(() => import('./pages/CompoundInterestCalculator'));
const CalorieCalculator = lazy(() => import('./pages/CalorieCalculator'));
const CurrencyConverter = lazy(() => import('./pages/CurrencyConverter'));
const History = lazy(() => import('./pages/History'));
const Terms = lazy(() => import('./pages/Terms'));
const Privacy = lazy(() => import('./pages/Privacy'));
const Contact = lazy(() => import('./pages/Contact'));
const About = lazy(() => import('./pages/About'));
const Disclaimer = lazy(() => import('./pages/Disclaimer'));

const App: React.FC = () => {
  return (
    <HashRouter>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow container mx-auto p-4 sm:p-6 lg:p-8">
          <Suspense fallback={<div className="text-center p-8 text-text-secondary">Loading...</div>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/bmi" element={<BmiCalculator />} />
              <Route path="/loan" element={<LoanCalculator />} />
              <Route path="/compound-interest" element={<CompoundInterestCalculator />} />
              <Route path="/calorie" element={<CalorieCalculator />} />
              <Route path="/currency" element={<CurrencyConverter />} />
              <Route path="/history" element={<History />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/about" element={<About />} />
              <Route path="/disclaimer" element={<Disclaimer />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
};

export default App;