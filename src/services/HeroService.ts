
import { useState, useEffect } from 'react';

export interface Hero {
  id: number;
  name: string;
  power: number;
  alterEgo?: string;
}

const mockHeroes: Hero[] = [
  { id: 1, name: 'Iron Angular', power: 95, alterEgo: 'Tony Framework' },
  { id: 2, name: 'Captain Component', power: 90, alterEgo: 'Steve Services' },
  { id: 3, name: 'Binding Woman', power: 85, alterEgo: 'Diana Template' },
  { id: 4, name: 'Reactive Man', power: 80, alterEgo: 'Bruce Observer' },
  { id: 5, name: 'Dependency Girl', power: 75, alterEgo: 'Natasha Injector' },
  { id: 6, name: 'Module Fury', power: 70, alterEgo: 'Nick NgModule' },
  { id: 7, name: 'Signal Hulk', power: 100, alterEgo: 'Bruce Renderer' },
  { id: 8, name: 'Router Girl', power: 88, alterEgo: 'Wanda Navigator' },
];

// Mock API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const useHeroes = () => {
  const [heroes, setHeroes] = useState<Hero[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchHeroes = async () => {
    setLoading(true);
    setError(null);
    try {
      await delay(800); // Simulate network request
      setHeroes(mockHeroes);
    } catch (err) {
      setError('Failed to fetch heroes');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const addHero = async (hero: Omit<Hero, 'id'>) => {
    setLoading(true);
    try {
      await delay(500);
      const newHero = { 
        ...hero, 
        id: Math.max(0, ...heroes.map(h => h.id)) + 1
      };
      setHeroes(prev => [...prev, newHero]);
      return newHero;
    } catch (err) {
      setError('Failed to add hero');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateHero = async (hero: Hero) => {
    setLoading(true);
    try {
      await delay(500);
      setHeroes(prev => prev.map(h => h.id === hero.id ? hero : h));
      return hero;
    } catch (err) {
      setError('Failed to update hero');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteHero = async (id: number) => {
    setLoading(true);
    try {
      await delay(500);
      setHeroes(prev => prev.filter(h => h.id !== id));
    } catch (err) {
      setError('Failed to delete hero');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getHero = async (id: number) => {
    try {
      await delay(300);
      return heroes.find(h => h.id === id) || null;
    } catch (err) {
      setError('Failed to get hero');
      throw err;
    }
  };

  useEffect(() => {
    fetchHeroes();
  }, []);

  return {
    heroes,
    loading,
    error,
    fetchHeroes,
    addHero,
    updateHero,
    deleteHero,
    getHero
  };
};
