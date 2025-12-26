
import React, { useState } from 'react';
import Card, { CardContent, CardHeader, CardTitle, CardDescription } from '../components/Card';
import { useCalculationHistory } from '../hooks/useCalculationHistory';
import { CurrencyHistoryEntry, HistoryType } from '../types';
import SEO from '../components/SEO';

// Mock currency data (base: USD) for demonstration purposes.
// In a real app, this would be fetched from an API.
const currencies: { [key: string]: { name: string; rate: number } } = {
    'USD': { name: 'United States Dollar', rate: 1 },
    'EUR': { name: 'Euro', rate: 0.93 },
    'JPY': { name: 'Japanese Yen', rate: 157.25 },
    'GBP': { name: 'British Pound', rate: 0.79 },
    'AUD': { name: 'Australian Dollar', rate: 1.51 },
    'CAD': { name: 'Canadian Dollar', rate: 1.37 },
    'CHF': { name: 'Swiss Franc', rate: 0.90 },
    'CNY': { name: 'Chinese Yuan', rate: 7.25 },
    'INR': { name: 'Indian Rupee', rate: 83.54 },
    'BRL': { name: 'Brazilian Real', rate: 5.25 },
};

const currencyCodes = Object.keys(currencies);

const CurrencyConverter: React.FC = () => {
    const [amount, setAmount] = useState('100');
    const [fromCurrency, setFromCurrency] = useState('USD');
    const [toCurrency, setToCurrency] = useState('EUR');
    const [result, setResult] = useState<{ convertedAmount: number, rate: number } | null>(null);

    const { history, addHistoryEntry, clearHistory } = useCalculationHistory<CurrencyHistoryEntry>(HistoryType.CURRENCY);

    const calculateConversion = () => {
        const amountNum = parseFloat(amount);
        if (isNaN(amountNum) || amountNum <= 0) {
            setResult(null);
            return;
        }

        const fromRate = currencies[fromCurrency].rate;
        const toRate = currencies[toCurrency].rate;
        
        // Convert 'from' currency to base (USD), then base to 'to' currency
        const amountInUsd = amountNum / fromRate;
        const convertedAmount = amountInUsd * toRate;
        const singleUnitRate = toRate / fromRate;

        setResult({ convertedAmount, rate: singleUnitRate });

        addHistoryEntry({
            fromAmount: formatValue(amountNum),
            fromCurrency,
            toAmount: formatValue(convertedAmount),
            toCurrency,
            rate: `1 ${fromCurrency} = ${singleUnitRate.toFixed(4)} ${toCurrency}`
        });
    };

    const clearFields = () => {
        setAmount('100');
        setFromCurrency('USD');
        setToCurrency('EUR');
        setResult(null);
    };
    
    const swapCurrencies = () => {
        setFromCurrency(toCurrency);
        setToCurrency(fromCurrency);
    };

    const formatValue = (value: number) => {
        return new Intl.NumberFormat('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(value);
    };

    const formatCurrencyDisplay = (value: number, currency: string) => {
         try {
            return new Intl.NumberFormat('en-US', { 
                style: 'currency', 
                currency,
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            }).format(value);
        } catch (e) {
            // Fallback for currencies that might not be supported by Intl
            return `${formatValue(value)} ${currency}`;
        }
    }
    
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <SEO 
                title="Currency Converter" 
                description="Convert between major world currencies with live exchange rates. Fast, simple, and free currency conversion."
            />
            <div className="lg:col-span-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Currency Converter</CardTitle>
                        <CardDescription>Get fast and free currency conversions. Please note: exchange rates are for demonstration purposes only.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div>
                            <label htmlFor="amount" className="block text-sm font-medium text-text-secondary">Amount</label>
                            <input type="number" id="amount" value={amount} onChange={e => setAmount(e.target.value)} className="mt-1 block w-full bg-secondary border-border rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm p-3" />
                        </div>
                        <div className="flex items-center space-x-2 md:space-x-4">
                            <div className="flex-1">
                                <label htmlFor="from-currency" className="block text-sm font-medium text-text-secondary">From</label>
                                <select id="from-currency" value={fromCurrency} onChange={e => setFromCurrency(e.target.value)} className="mt-1 block w-full bg-secondary border-border rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm p-3">
                                    {currencyCodes.map(code => <option key={code} value={code}>{code} - {currencies[code].name}</option>)}
                                </select>
                            </div>
                            <button onClick={swapCurrencies} className="p-2 mt-6 rounded-full bg-secondary hover:bg-border transition" aria-label="Swap currencies">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                                </svg>
                            </button>
                            <div className="flex-1">
                                <label htmlFor="to-currency" className="block text-sm font-medium text-text-secondary">To</label>
                                <select id="to-currency" value={toCurrency} onChange={e => setToCurrency(e.target.value)} className="mt-1 block w-full bg-secondary border-border rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm p-3">
                                    {currencyCodes.map(code => <option key={code} value={code}>{code} - {currencies[code].name}</option>)}
                                </select>
                            </div>
                        </div>
                        <div className="flex space-x-4">
                            <button onClick={calculateConversion} className="flex-1 bg-primary text-white py-3 px-4 rounded-md hover:bg-primary-hover transition">Convert</button>
                            <button onClick={clearFields} className="flex-1 bg-secondary text-text-primary py-3 px-4 rounded-md hover:bg-border transition">Clear</button>
                        </div>
                        {result && (
                            <div className="text-center bg-secondary p-6 rounded-lg" aria-live="polite">
                                <p className="text-text-secondary">{formatCurrencyDisplay(parseFloat(amount), fromCurrency)} is</p>
                                <p className="text-5xl font-bold text-primary">{formatCurrencyDisplay(result.convertedAmount, toCurrency)}</p>
                                <p className="mt-2 text-text-secondary">1 {fromCurrency} = {result.rate.toFixed(4)} {toCurrency}</p>
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
                        {history.length === 0 ? <p className="text-text-secondary">No conversions yet.</p> : history.map(entry => (
                            <div key={entry.id} className="bg-secondary p-3 rounded-md">
                                <p className="font-bold text-text-primary">{entry.fromAmount} {entry.fromCurrency} → {entry.toAmount} {entry.toCurrency}</p>
                                <p className="text-sm text-text-secondary">{entry.rate}</p>
                                <p className="text-xs text-gray-400">{entry.timestamp}</p>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default CurrencyConverter;