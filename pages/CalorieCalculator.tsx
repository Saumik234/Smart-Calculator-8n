
import React, { useState } from 'react';
import Card, { CardContent, CardHeader, CardTitle, CardDescription } from '../components/Card';
import { useCalculationHistory } from '../hooks/useCalculationHistory';
import { CalorieHistoryEntry, HistoryType } from '../types';
import SEO from '../components/SEO';

const activityLevels = [
    { label: 'Sedentary (little or no exercise)', value: 1.2 },
    { label: 'Lightly active (light exercise/sports 1-3 days/week)', value: 1.375 },
    { label: 'Moderately active (moderate exercise/sports 3-5 days/week)', value: 1.55 },
    { label: 'Very active (hard exercise/sports 6-7 days a week)', value: 1.725 },
    { label: 'Extra active (very hard exercise/physical job)', value: 1.9 },
];

const CalorieCalculator: React.FC = () => {
    const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
    const [age, setAge] = useState('25');
    const [gender, setGender] = useState<'male' | 'female'>('male');
    const [weight, setWeight] = useState('70');
    const [height, setHeight] = useState('175');
    const [feet, setFeet] = useState('5');
    const [inches, setInches] = useState('9');
    const [activityLevel, setActivityLevel] = useState('1.55');
    const [result, setResult] = useState<{ bmr: number; calories: number } | null>(null);

    const { history, addHistoryEntry, clearHistory } = useCalculationHistory<CalorieHistoryEntry>(HistoryType.CALORIE);

    const calculateCalories = () => {
        const ageNum = parseInt(age);
        let weightKg = parseFloat(weight);
        let heightCm = parseFloat(height);

        if (unit === 'imperial') {
            weightKg = parseFloat(weight) * 0.453592;
            const feetNum = parseFloat(feet) || 0;
            const inchesNum = parseFloat(inches) || 0;
            heightCm = ((feetNum * 12) + inchesNum) * 2.54;
        }

        if (isNaN(ageNum) || isNaN(weightKg) || isNaN(heightCm) || ageNum <= 0 || weightKg <= 0 || heightCm <= 0) {
            setResult(null);
            return;
        }

        let bmr: number;
        if (gender === 'male') {
            bmr = 10 * weightKg + 6.25 * heightCm - 5 * ageNum + 5;
        } else {
            bmr = 10 * weightKg + 6.25 * heightCm - 5 * ageNum - 161;
        }

        const calories = bmr * parseFloat(activityLevel);
        setResult({ bmr, calories });

        addHistoryEntry({
            bmr: bmr.toFixed(0),
            calories: calories.toFixed(0),
            age, gender,
            weight: unit === 'metric' ? `${weight} kg` : `${weight} lbs`,
            height: unit === 'metric' ? `${height} cm` : `${feet}' ${inches}"`,
            activityLevel: activityLevels.find(a => a.value === parseFloat(activityLevel))?.label || '',
            unit,
        });
    };
    
    const clearFields = () => {
      setAge('25');
      setGender('male');
      setWeight('70');
      setHeight('175');
      setFeet('5');
      setInches('9');
      setActivityLevel('1.55');
      setResult(null);
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <SEO 
                title="Calorie Calculator" 
                description="Find your daily calorie needs and Basal Metabolic Rate (BMR). Optimize your diet and reach your weight goals."
            />
            <div className="lg:col-span-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Daily Calorie Calculator</CardTitle>
                        <CardDescription>Calculate your Basal Metabolic Rate (BMR) and daily calorie needs for weight maintenance based on your age, gender, height, weight, and activity level.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                         <div className="flex bg-secondary rounded-lg p-1">
                            <button onClick={() => setUnit('metric')} className={`w-1/2 py-2 rounded-md transition ${unit === 'metric' ? 'bg-primary text-white' : 'text-text-secondary'}`}>Metric</button>
                            <button onClick={() => setUnit('imperial')} className={`w-1/2 py-2 rounded-md transition ${unit === 'imperial' ? 'bg-primary text-white' : 'text-text-secondary'}`}>Imperial</button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="age" className="block text-sm font-medium text-text-secondary">Age</label>
                                <input type="number" id="age" value={age} onChange={e => setAge(e.target.value)} className="mt-1 block w-full bg-secondary border-border rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm p-3" />
                            </div>
                            <div>
                                <label htmlFor="gender" className="block text-sm font-medium text-text-secondary">Gender</label>
                                <select id="gender" value={gender} onChange={e => setGender(e.target.value as 'male' | 'female')} className="mt-1 block w-full bg-secondary border-border rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm p-3">
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
                            </div>
                        </div>
                        {unit === 'metric' ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="weight-metric" className="block text-sm font-medium text-text-secondary">Weight (kg)</label>
                                <input type="number" id="weight-metric" value={weight} onChange={e => setWeight(e.target.value)} className="mt-1 block w-full bg-secondary border-border rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm p-3" />
                            </div>
                            <div>
                                <label htmlFor="height-metric" className="block text-sm font-medium text-text-secondary">Height (cm)</label>
                                <input type="number" id="height-metric" value={height} onChange={e => setHeight(e.target.value)} className="mt-1 block w-full bg-secondary border-border rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm p-3" />
                            </div>
                        </div>
                        ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="weight-imperial" className="block text-sm font-medium text-text-secondary">Weight (lbs)</label>
                                <input type="number" id="weight-imperial" value={weight} onChange={e => setWeight(e.target.value)} className="mt-1 block w-full bg-secondary border-border rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm p-3" />
                            </div>
                            <div className="flex space-x-4">
                                <div className="flex-1">
                                    <label htmlFor="feet" className="block text-sm font-medium text-text-secondary">Height (ft)</label>
                                    <input type="number" id="feet" value={feet} onChange={e => setFeet(e.target.value)} className="mt-1 block w-full bg-secondary border-border rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm p-3" />
                                </div>
                                <div className="flex-1">
                                    <label htmlFor="inches" className="block text-sm font-medium text-text-secondary">(in)</label>
                                    <input type="number" id="inches" value={inches} onChange={e => setInches(e.target.value)} className="mt-1 block w-full bg-secondary border-border rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm p-3" />
                                </div>
                            </div>
                        </div>
                        )}
                        <div>
                            <label htmlFor="activity" className="block text-sm font-medium text-text-secondary">Activity Level</label>
                            <select id="activity" value={activityLevel} onChange={e => setActivityLevel(e.target.value)} className="mt-1 block w-full bg-secondary border-border rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm p-3">
                                {activityLevels.map(level => <option key={level.value} value={level.value}>{level.label}</option>)}
                            </select>
                        </div>

                        <div className="flex space-x-4">
                            <button onClick={calculateCalories} className="flex-1 bg-primary text-white py-3 px-4 rounded-md hover:bg-primary-hover transition">Calculate</button>
                             <button onClick={clearFields} className="flex-1 bg-secondary text-text-primary py-3 px-4 rounded-md hover:bg-border transition">Clear</button>
                        </div>
                        {result && (
                            <div className="text-center bg-secondary p-6 rounded-lg" aria-live="polite">
                                <p className="text-text-secondary">Daily Calories to Maintain Weight</p>
                                <p className="text-5xl font-bold text-primary">{result.calories.toFixed(0)}</p>
                                <p className="mt-2 text-text-secondary">Basal Metabolic Rate (BMR): {result.bmr.toFixed(0)} calories/day</p>
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
                                <p className="font-bold text-text-primary">Calories: {entry.calories}</p>
                                <p className="text-sm text-text-secondary">{entry.age}y {entry.gender}, {entry.weight}, {entry.height}</p>
                                <p className="text-xs text-gray-400">{entry.timestamp}</p>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default CalorieCalculator;