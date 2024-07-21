import { useEffect, useState } from 'react';
import { findCards } from '../api/cardActions';

interface HookProps {
  deckName: string;
}

interface HookData {
  cardIDs: number[] | null | undefined;
  isLoading: boolean;
  error: Error | null;
}

export const useCards = ({ deckName }: HookProps): HookData => {
  const [cardIDs, setCardIDs] = useState<number[] | null>();
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    findCards(deckName)
      .then(cardIDs => setCardIDs(cardIDs))
      .catch(err => setError(err))
      .finally(() => setIsLoading(false));
  }, [deckName]);

  return { cardIDs, isLoading, error };
};
