import { useEffect, useState } from "react";
import { getDeckNames } from "../api/deckActions";

interface HookData {
  names: string[];
  isLoading: boolean;
  error: Error | null;
}

export const useDeckNames = (): HookData => {
  const [names, setDeckNames] = useState<string[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    getDeckNames()
      .then((deckNames) => setDeckNames(deckNames))
      .catch((err) => setError(err))
      .finally(() => setIsLoading(false));
  }, []);

  return { names, isLoading, error };
};
