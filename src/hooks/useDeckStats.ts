import { useEffect, useState } from 'react';
import { getDeckNames, getDeckStats } from '../api/deckActions';
import { DeckStats } from '../types';

interface HookData {
  decks: DeckStats[] | undefined;
  isLoading: boolean;
  error: Error | null;
}

const DELAY_BEFORE_STATS = 0; // 1 second delay

export const useDeckStats = (): HookData => {
  const [decks, setDecks] = useState<DeckStats[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Fetch deck names
        const names = await getDeckNames();

        if (!isMounted) return;

        if (!names || names.length === 0) {
          setIsLoading(false);
          return;
        }

        // Add delay before fetching deck stats
        await new Promise(resolve => setTimeout(resolve, DELAY_BEFORE_STATS));

        if (!isMounted) return;

        // Fetch deck stats
        const stats = await getDeckStats(names);

        if (isMounted) {
          setDecks(stats);
        }
      } catch (err) {
        console.error('Error in fetchData:', err);
        if (isMounted) {
          setError(err instanceof Error ? err : new Error('An unknown error occurred'));
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  return { decks, isLoading, error };
};
