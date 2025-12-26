export interface BmiHistoryEntry {
  id: string;
  bmi: string;
  weight: string;
  height: string;
  unit: 'metric' | 'imperial';
  timestamp: string;
}

export interface LoanHistoryEntry {
  id: string;
  monthlyPayment: string;
  totalPayment: string;
  totalInterest: string;
  amount: string;
  interest: string;
  term: string;
  timestamp: string;
}

export interface CompoundInterestHistoryEntry {
  id: string;
  futureValue: string;
  totalInterest: string;
  principal: string;
  rate: string;
  years: string;
  compounds: string;
  timestamp: string;
}

export interface CalorieHistoryEntry {
  id: string;
  bmr: string;
  calories: string;
  age: string;
  gender: 'male' | 'female';
  weight: string;
  height: string;
  activityLevel: string;
  unit: 'metric' | 'imperial';
  timestamp: string;
}

export interface CurrencyHistoryEntry {
  id: string;
  fromAmount: string;
  fromCurrency: string;
  toAmount: string;
  toCurrency: string;
  rate: string;
  timestamp: string;
}

export type HistoryEntry = BmiHistoryEntry | LoanHistoryEntry | CompoundInterestHistoryEntry | CalorieHistoryEntry | CurrencyHistoryEntry;

export enum HistoryType {
    BMI = 'bmiHistory',
    LOAN = 'loanHistory',
    COMPOUND_INTEREST = 'compoundInterestHistory',
    CALORIE = 'calorieHistory',
    CURRENCY = 'currencyHistory'
}