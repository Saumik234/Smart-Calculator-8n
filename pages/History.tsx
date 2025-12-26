
import React, { useState, useEffect } from 'react';
import Card, { CardHeader, CardTitle } from '../components/Card';
import { HistoryEntry, HistoryType, BmiHistoryEntry, LoanHistoryEntry, CompoundInterestHistoryEntry, CalorieHistoryEntry, CurrencyHistoryEntry } from '../types';
import SEO from '../components/SEO';

const History: React.FC = () => {
    const [allHistory, setAllHistory] = useState<Record<HistoryType, HistoryEntry[]>>({
        [HistoryType.BMI]: [],
        [HistoryType.LOAN]: [],
        [HistoryType.COMPOUND_INTEREST]: [],
        [HistoryType.CALORIE]: [],
        [HistoryType.CURRENCY]: [],
    });

    useEffect(() => {
        const historyKeys = Object.values(HistoryType);
        const loadedHistory: Record<string, HistoryEntry[]> = {};
        historyKeys.forEach(key => {
            try {
                const item = window.localStorage.getItem(key);
                loadedHistory[key] = item ? JSON.parse(item) : [];
            } catch (error) {
                console.error(`Error loading history for ${key}`, error);
                loadedHistory[key] = [];
            }
        });
        setAllHistory(loadedHistory as Record<HistoryType, HistoryEntry[]>);
    }, []);

    const clearAllHistory = () => {
        if (window.confirm('Are you sure you want to clear all calculation history? This action cannot be undone.')) {
            Object.values(HistoryType).forEach(key => {
                window.localStorage.removeItem(key);
            });
            setAllHistory({
                [HistoryType.BMI]: [],
                [HistoryType.LOAN]: [],
                [HistoryType.COMPOUND_INTEREST]: [],
                [HistoryType.CALORIE]: [],
                [HistoryType.CURRENCY]: [],
            });
        }
    }

    const renderBmiEntry = (entry: BmiHistoryEntry) => (
        <>
            <p className="font-bold text-text-primary">BMI: {entry.bmi}</p>
            <p className="text-sm text-text-secondary">W: {entry.weight}, H: {entry.height}</p>
        </>
    );

    const renderLoanEntry = (entry: LoanHistoryEntry) => (
        <>
            <p className="font-bold text-text-primary">Payment: {entry.monthlyPayment}/mo</p>
            <p className="text-sm text-text-secondary">{entry.amount} at {entry.interest} for {entry.term}</p>
        </>
    );

    const renderInterestEntry = (entry: CompoundInterestHistoryEntry) => (
        <>
            <p className="font-bold text-text-primary">FV: {entry.futureValue}</p>
            <p className="text-sm text-text-secondary">{entry.principal} at {entry.rate} for {entry.years}</p>
        </>
    );
    
    const renderCalorieEntry = (entry: CalorieHistoryEntry) => (
        <>
            <p className="font-bold text-text-primary">Calories: {entry.calories}</p>
            <p className="text-sm text-text-secondary">{entry.age}y {entry.gender}, {entry.weight}, {entry.height}</p>
        </>
    );

    const renderCurrencyEntry = (entry: CurrencyHistoryEntry) => (
         <>
            <p className="font-bold text-text-primary">{entry.fromAmount} {entry.fromCurrency} → {entry.toAmount} {entry.toCurrency}</p>
            <p className="text-sm text-text-secondary">{entry.rate}</p>
        </>
    );

    const renderEntry = (entry: HistoryEntry, type: HistoryType) => {
        let content;
        switch(type) {
            case HistoryType.BMI: content = renderBmiEntry(entry as BmiHistoryEntry); break;
            case HistoryType.LOAN: content = renderLoanEntry(entry as LoanHistoryEntry); break;
            case HistoryType.COMPOUND_INTEREST: content = renderInterestEntry(entry as CompoundInterestHistoryEntry); break;
            case HistoryType.CALORIE: content = renderCalorieEntry(entry as CalorieHistoryEntry); break;
            case HistoryType.CURRENCY: content = renderCurrencyEntry(entry as CurrencyHistoryEntry); break;
            default: content = null;
        }
        return (
             <div key={entry.id} className="bg-secondary p-3 rounded-md">
                {content}
                <p className="text-xs text-gray-400 mt-1">{entry.timestamp}</p>
            </div>
        );
    };

    return (
        <Card>
            <SEO 
                title="Calculation History" 
                description="View your past calculations from BMI, Loan, Interest, and Calorie tools."
            />
            <CardHeader className="flex justify-between items-center">
                <CardTitle>Calculation History</CardTitle>
                 <button onClick={clearAllHistory} className="text-sm bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700">Clear All History</button>
            </CardHeader>

            <div className="space-y-8 mt-6">
                <div>
                    <h3 className="text-xl font-semibold text-primary mb-4">BMI History</h3>
                    <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
                        {allHistory[HistoryType.BMI].length > 0 ? allHistory[HistoryType.BMI].map(e => renderEntry(e, HistoryType.BMI)) : <p className="text-text-secondary">No BMI calculations found.</p>}
                    </div>
                </div>
                 <div>
                    <h3 className="text-xl font-semibold text-primary mb-4">Loan History</h3>
                    <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
                        {allHistory[HistoryType.LOAN].length > 0 ? allHistory[HistoryType.LOAN].map(e => renderEntry(e, HistoryType.LOAN)) : <p className="text-text-secondary">No Loan calculations found.</p>}
                    </div>
                </div>
                 <div>
                    <h3 className="text-xl font-semibold text-primary mb-4">Compound Interest History</h3>
                    <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
                        {allHistory[HistoryType.COMPOUND_INTEREST].length > 0 ? allHistory[HistoryType.COMPOUND_INTEREST].map(e => renderEntry(e, HistoryType.COMPOUND_INTEREST)) : <p className="text-text-secondary">No Interest calculations found.</p>}
                    </div>
                </div>
                 <div>
                    <h3 className="text-xl font-semibold text-primary mb-4">Calorie History</h3>
                    <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
                        {allHistory[HistoryType.CALORIE].length > 0 ? allHistory[HistoryType.CALORIE].map(e => renderEntry(e, HistoryType.CALORIE)) : <p className="text-text-secondary">No Calorie calculations found.</p>}
                    </div>
                </div>
                 <div>
                    <h3 className="text-xl font-semibold text-primary mb-4">Currency Conversion History</h3>
                    <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
                        {allHistory[HistoryType.CURRENCY].length > 0 ? allHistory[HistoryType.CURRENCY].map(e => renderEntry(e, HistoryType.CURRENCY)) : <p className="text-text-secondary">No Currency conversions found.</p>}
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default History;