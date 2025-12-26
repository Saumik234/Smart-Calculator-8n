import { useState, useCallback } from 'react';
import { HistoryEntry, HistoryType } from '../types';

export const useCalculationHistory = <T extends HistoryEntry>(historyKey: HistoryType) => {
  const [history, setHistory] = useState<T[]>(() => {
    try {
      const item = window.localStorage.getItem(historyKey);
      return item ? JSON.parse(item) : [];
    } catch (error) {
      console.error('Error reading history from localStorage', error);
      return [];
    }
  });

  const addHistoryEntry = useCallback((entry: Omit<T, 'id' | 'timestamp'>) => {
    const newEntry = {
      ...entry,
      id: new Date().toISOString() + Math.random(),
      timestamp: new Date().toLocaleString(),
    } as T;

    setHistory(prevHistory => {
      const updatedHistory = [newEntry, ...prevHistory].slice(0, 20); // Keep last 20 entries
      try {
        window.localStorage.setItem(historyKey, JSON.stringify(updatedHistory));
      } catch (error) {
        console.error('Error saving history to localStorage', error);
      }
      return updatedHistory;
    });
  }, [historyKey]);

  const clearHistory = useCallback(() => {
    try {
      window.localStorage.removeItem(historyKey);
      setHistory([]);
    } catch (error) {
      console.error('Error clearing history from localStorage', error);
    }
  }, [historyKey]);

  return { history, addHistoryEntry, clearHistory };
};
