
import React, { useState } from 'react';
import Card, { CardContent, CardHeader, CardTitle, CardDescription } from '../components/Card';
import { useCalculationHistory } from '../hooks/useCalculationHistory';
import { LoanHistoryEntry, HistoryType } from '../types';
import SEO from '../components/SEO';

const LoanCalculator: React.FC = () => {
    const [amount, setAmount] = useState('10000');
    const [interest, setInterest] = useState('5');
    const [term, setTerm] = useState('5');
    const [result, setResult] = useState<{ monthlyPayment: number, totalPayment: number, totalInterest: number } | null>(null);

    const { history, addHistoryEntry, clearHistory } = useCalculationHistory<LoanHistoryEntry>(HistoryType.LOAN);

    const calculateLoan = () => {
        const principal = parseFloat(amount);
        const annualInterestRate = parseFloat(interest) / 100;
        const years = parseFloat(term);

        if (isNaN(principal) || isNaN(annualInterestRate) || isNaN(years) || principal <= 0 || annualInterestRate < 0 || years <= 0) {
            setResult(null);
            return;
        }

        const monthlyInterestRate = annualInterestRate / 12;
        const numberOfPayments = years * 12;

        if (monthlyInterestRate === 0) {
          const monthlyPayment = principal / numberOfPayments;
          setResult({
            monthlyPayment,
            totalPayment: principal,
            totalInterest: 0,
          });
        } else {
          const monthlyPayment = principal * (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) / (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);
          const totalPayment = monthlyPayment * numberOfPayments;
          const totalInterest = totalPayment - principal;
          setResult({ monthlyPayment, totalPayment, totalInterest });

          addHistoryEntry({
            monthlyPayment: formatCurrency(monthlyPayment),
            totalPayment: formatCurrency(totalPayment),
            totalInterest: formatCurrency(totalInterest),
            amount: formatCurrency(principal),
            interest: `${interest}%`,
            term: `${term} years`,
          });
        }
    };
    
    const clearFields = () => {
        setAmount('10000');
        setInterest('5');
        setTerm('5');
        setResult(null);
    };

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <SEO 
                title="Loan Calculator" 
                description="Estimate your monthly loan payments and total interest with our free Loan Calculator. Perfect for personal loans, mortgages, and auto loans."
            />
            <div className="lg:col-span-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Loan Calculator</CardTitle>
                        <CardDescription>Estimate your monthly payments, total interest, and total repayment for any loan. Perfect for mortgages, car loans, or personal loans.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div>
                            <label htmlFor="amount" className="block text-sm font-medium text-text-secondary">Loan Amount ($)</label>
                            <input type="number" id="amount" value={amount} onChange={e => setAmount(e.target.value)} className="mt-1 block w-full bg-secondary border-border rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm p-3" />
                        </div>
                        <div>
                            <label htmlFor="interest" className="block text-sm font-medium text-text-secondary">Annual Interest Rate (%)</label>
                            <input type="number" id="interest" value={interest} onChange={e => setInterest(e.target.value)} className="mt-1 block w-full bg-secondary border-border rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm p-3" />
                        </div>
                        <div>
                            <label htmlFor="term" className="block text-sm font-medium text-text-secondary">Loan Term (Years)</label>
                            <input type="number" id="term" value={term} onChange={e => setTerm(e.target.value)} className="mt-1 block w-full bg-secondary border-border rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm p-3" />
                        </div>
                        <div className="flex space-x-4">
                            <button onClick={calculateLoan} className="flex-1 bg-primary text-white py-3 px-4 rounded-md hover:bg-primary-hover transition">Calculate</button>
                            <button onClick={clearFields} className="flex-1 bg-secondary text-text-primary py-3 px-4 rounded-md hover:bg-border transition">Clear</button>
                        </div>
                        {result && (
                            <div className="space-y-4 bg-secondary p-6 rounded-lg" aria-live="polite">
                                <h3 className="text-xl font-bold text-center text-text-primary">Results</h3>
                                <div className="flex justify-between items-center border-b border-border pb-2">
                                    <span className="text-text-secondary">Monthly Payment</span>
                                    <span className="text-2xl font-bold text-primary">{formatCurrency(result.monthlyPayment)}</span>
                                </div>
                                <div className="flex justify-between items-center border-b border-border pb-2">
                                    <span className="text-text-secondary">Total Payment</span>
                                    <span className="font-semibold text-text-primary">{formatCurrency(result.totalPayment)}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-text-secondary">Total Interest</span>
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
                                <p className="font-bold text-text-primary">Payment: {entry.monthlyPayment}/mo</p>
                                <p className="text-sm text-text-secondary">{entry.amount} at {entry.interest} for {entry.term}</p>
                                <p className="text-xs text-gray-400">{entry.timestamp}</p>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default LoanCalculator;