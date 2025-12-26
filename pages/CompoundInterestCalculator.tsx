
import React, { useState } from 'react';
import Card, { CardContent, CardHeader, CardTitle, CardDescription } from '../components/Card';
import { useCalculationHistory } from '../hooks/useCalculationHistory';
import { CompoundInterestHistoryEntry, HistoryType } from '../types';
import SEO from '../components/SEO';

const CompoundInterestCalculator: React.FC = () => {
    const [principal, setPrincipal] = useState('1000');
    const [rate, setRate] = useState('7');
    const [years, setYears] = useState('10');
    const [compounds, setCompounds] = useState('12'); // Monthly
    const [result, setResult] = useState<{ futureValue: number, totalInterest: number } | null>(null);

    const { history, addHistoryEntry, clearHistory } = useCalculationHistory<CompoundInterestHistoryEntry>(HistoryType.COMPOUND_INTEREST);

    const calculateInterest = () => {
        const p = parseFloat(principal);
        const r = parseFloat(rate) / 100;
        const t = parseFloat(years);
        const n = parseFloat(compounds);

        if (isNaN(p) || isNaN(r) || isNaN(t) || isNaN(n) || p < 0 || r < 0 || t <= 0 || n <= 0) {
            setResult(null);
            return;
        }

        const futureValue = p * Math.pow(1 + (r / n), n * t);
        const totalInterest = futureValue - p;
        setResult({ futureValue, totalInterest });

        addHistoryEntry({
            futureValue: formatCurrency(futureValue),
            totalInterest: formatCurrency(totalInterest),
            principal: formatCurrency(p),
            rate: `${rate}%`,
            years: `${years} years`,
            compounds: getCompoundText(String(n)),
        });
    };

    const clearFields = () => {
        setPrincipal('1000');
        setRate('7');
        setYears('10');
        setCompounds('12');
        setResult(null);
    };

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
    };

    const getCompoundText = (val: string) => {
        switch(val) {
            case '1': return 'Annually';
            case '2': return 'Semi-Annually';
            case '4': return 'Quarterly';
            case '12': return 'Monthly';
            case '365': return 'Daily';
            default: return `${val} times/year`;
        }
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <SEO 
                title="Compound Interest Calculator" 
                description="Calculate the future value of your investments with our Compound Interest Calculator. Plan your savings and wealth growth effectively."
            />
            <div className="lg:col-span-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Compound Interest Calculator</CardTitle>
                        <CardDescription>See how your savings or investments can grow over time with the power of compounding interest. Plan for your financial future.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div>
                            <label htmlFor="principal" className="block text-sm font-medium text-text-secondary">Principal Amount ($)</label>
                            <input type="number" id="principal" value={principal} onChange={e => setPrincipal(e.target.value)} className="mt-1 block w-full bg-secondary border-border rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm p-3" />
                        </div>
                        <div>
                            <label htmlFor="rate" className="block text-sm font-medium text-text-secondary">Annual Interest Rate (%)</label>
                            <input type="number" id="rate" value={rate} onChange={e => setRate(e.target.value)} className="mt-1 block w-full bg-secondary border-border rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm p-3" />
                        </div>
                        <div>
                            <label htmlFor="years" className="block text-sm font-medium text-text-secondary">Number of Years</label>
                            <input type="number" id="years" value={years} onChange={e => setYears(e.target.value)} className="mt-1 block w-full bg-secondary border-border rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm p-3" />
                        </div>
                        <div>
                            <label htmlFor="compounds" className="block text-sm font-medium text-text-secondary">Compounds per Year</label>
                            <select id="compounds" value={compounds} onChange={e => setCompounds(e.target.value)} className="mt-1 block w-full bg-secondary border-border rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm p-3">
                                <option value="1">Annually</option>
                                <option value="2">Semi-Annually</option>
                                <option value="4">Quarterly</option>
                                <option value="12">Monthly</option>
                                <option value="365">Daily</option>
                            </select>
                        </div>
                        <div className="flex space-x-4">
                            <button onClick={calculateInterest} className="flex-1 bg-primary text-white py-3 px-4 rounded-md hover:bg-primary-hover transition">Calculate</button>
                            <button onClick={clearFields} className="flex-1 bg-secondary text-text-primary py-3 px-4 rounded-md hover:bg-border transition">Clear</button>
                        </div>
                        {result && (
                            <div className="space-y-4 bg-secondary p-6 rounded-lg" aria-live="polite">
                                <h3 className="text-xl font-bold text-center text-text-primary">Results</h3>
                                <div className="flex justify-between items-center border-b border-border pb-2">
                                    <span className="text-text-secondary">Future Value</span>
                                    <span className="text-2xl font-bold text-primary">{formatCurrency(result.futureValue)}</span>
                                </div>
                                <div className="flex justify-between items-center border-b border-border pb-2">
                                    <span className="text-text-secondary">Principal</span>
                                    <span className="font-semibold text-text-primary">{formatCurrency(parseFloat(principal))}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-text-secondary">Total Interest Earned</span>
                                    <span className="font-semibold text-text-primary">{formatCurrency(result.totalInterest)}</span>
                                </div>
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
                                <p className="font-bold text-text-primary">FV: {entry.futureValue}</p>
                                <p className="text-sm text-text-secondary">{entry.principal} at {entry.rate} for {entry.years}</p>
                                <p className="text-xs text-gray-400">{entry.timestamp}</p>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default CompoundInterestCalculator;