
import React, { useState, useMemo } from 'react';
import Card, { CardContent, CardHeader, CardTitle, CardDescription } from '../components/Card';
import { useCalculationHistory } from '../hooks/useCalculationHistory';
import { BmiHistoryEntry, HistoryType } from '../types';
import SEO from '../components/SEO';

const BmiCalculator: React.FC = () => {
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [feet, setFeet] = useState('');
  const [inches, setInches] = useState('');
  const [bmi, setBmi] = useState<number | null>(null);

  const { history, addHistoryEntry, clearHistory } = useCalculationHistory<BmiHistoryEntry>(HistoryType.BMI);

  const calculateBmi = () => {
    let weightNum = parseFloat(weight);
    let heightNum = 0;

    if (unit === 'metric') {
      heightNum = parseFloat(height) / 100; // cm to m
    } else {
      const feetNum = parseFloat(feet) || 0;
      const inchesNum = parseFloat(inches) || 0;
      heightNum = (feetNum * 12) + inchesNum; // total inches
    }

    if (isNaN(weightNum) || isNaN(heightNum) || weightNum <= 0 || heightNum <= 0) {
      setBmi(null);
      return;
    }
    
    let calculatedBmi;
    if (unit === 'metric') {
      calculatedBmi = weightNum / (heightNum * heightNum);
    } else {
      calculatedBmi = (weightNum / (heightNum * heightNum)) * 703;
    }

    setBmi(calculatedBmi);
    addHistoryEntry({
        bmi: calculatedBmi.toFixed(2),
        weight: unit === 'metric' ? `${weight} kg` : `${weight} lbs`,
        height: unit === 'metric' ? `${height} cm` : `${feet}' ${inches}"`,
        unit,
    });
  };

  const clearFields = () => {
    setWeight('');
    setHeight('');
    setFeet('');
    setInches('');
    setBmi(null);
  };
  
  const bmiCategory = useMemo(() => {
    if (bmi === null) return null;
    if (bmi < 18.5) return { name: 'Underweight', color: 'text-blue-400' };
    if (bmi < 25) return { name: 'Normal weight', color: 'text-green-400' };
    if (bmi < 30) return { name: 'Overweight', color: 'text-yellow-400' };
    return { name: 'Obesity', color: 'text-red-400' };
  }, [bmi]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <SEO 
        title="BMI Calculator" 
        description="Calculate your Body Mass Index (BMI) instantly with our free tool. Supports metric (kg/cm) and imperial (lbs/feet) units."
      />
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>BMI Calculator</CardTitle>
            <CardDescription>Instantly check your Body Mass Index (BMI). Our calculator supports both metric (kg, cm) and imperial (lbs, ft, in) units to help you track your health.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex bg-secondary rounded-lg p-1">
              <button onClick={() => setUnit('metric')} className={`w-1/2 py-2 rounded-md transition ${unit === 'metric' ? 'bg-primary text-white' : 'text-text-secondary'}`}>Metric</button>
              <button onClick={() => setUnit('imperial')} className={`w-1/2 py-2 rounded-md transition ${unit === 'imperial' ? 'bg-primary text-white' : 'text-text-secondary'}`}>Imperial</button>
            </div>
            {unit === 'metric' ? (
              <>
                <div>
                  <label htmlFor="weight-metric" className="block text-sm font-medium text-text-secondary">Weight (kg)</label>
                  <input type="number" id="weight-metric" value={weight} onChange={(e) => setWeight(e.target.value)} className="mt-1 block w-full bg-secondary border-border rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm p-3" />
                </div>
                <div>
                  <label htmlFor="height-metric" className="block text-sm font-medium text-text-secondary">Height (cm)</label>
                  <input type="number" id="height-metric" value={height} onChange={(e) => setHeight(e.target.value)} className="mt-1 block w-full bg-secondary border-border rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm p-3" />
                </div>
              </>
            ) : (
              <>
                <div>
                  <label htmlFor="weight-imperial" className="block text-sm font-medium text-text-secondary">Weight (lbs)</label>
                  <input type="number" id="weight-imperial" value={weight} onChange={(e) => setWeight(e.target.value)} className="mt-1 block w-full bg-secondary border-border rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm p-3" />
                </div>
                <div className="flex space-x-4">
                  <div className="flex-1">
                    <label htmlFor="feet" className="block text-sm font-medium text-text-secondary">Height (ft)</label>
                    <input type="number" id="feet" value={feet} onChange={(e) => setFeet(e.target.value)} className="mt-1 block w-full bg-secondary border-border rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm p-3" />
                  </div>
                  <div className="flex-1">
                    <label htmlFor="inches" className="block text-sm font-medium text-text-secondary">(in)</label>
                    <input type="number" id="inches" value={inches} onChange={(e) => setInches(e.target.value)} className="mt-1 block w-full bg-secondary border-border rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm p-3" />
                  </div>
                </div>
              </>
            )}
            <div className="flex space-x-4">
              <button onClick={calculateBmi} className="flex-1 bg-primary text-white py-3 px-4 rounded-md hover:bg-primary-hover transition">Calculate</button>
              <button onClick={clearFields} className="flex-1 bg-secondary text-text-primary py-3 px-4 rounded-md hover:bg-border transition">Clear</button>
            </div>
            {bmi !== null && (
              <div className="text-center bg-secondary p-6 rounded-lg" aria-live="polite">
                <p className="text-text-secondary">Your BMI is</p>
                <p className="text-5xl font-bold text-primary">{bmi.toFixed(2)}</p>
                {bmiCategory && <p className={`mt-2 text-xl font-semibold ${bmiCategory.color}`}>{bmiCategory.name}</p>}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      <div>
        <Card>
            <CardHeader className="flex justify-between items-center">
                <CardTitle>History</CardTitle>
                <button onClick={clearHistory} className="text-sm text-primary hover:underline">Clear</button>
            </CardHeader>
            <CardContent className="space-y-4 max-h-96 overflow-y-auto">
                {history.length === 0 ? <p className="text-text-secondary">No calculations yet.</p> : history.map(entry => (
                    <div key={entry.id} className="bg-secondary p-3 rounded-md">
                        <p className="font-bold text-text-primary">BMI: {entry.bmi}</p>
                        <p className="text-sm text-text-secondary">W: {entry.weight}, H: {entry.height}</p>
                        <p className="text-xs text-gray-400">{entry.timestamp}</p>
                    </div>
                ))}
            </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BmiCalculator;