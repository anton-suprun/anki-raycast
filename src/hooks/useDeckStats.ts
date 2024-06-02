import { useEffect, useState } from "react";
import { getDeckStats } from "../api/deckActions";
import { DeckStats } from "../types";
import { useDeckNames } from "./useDeckNames";

interface HookData {
  decks: DeckStats[] | undefined;
  isLoading: boolean;
  error: Error | null;
}

export const useDeckStats = (): HookData => {
  const deckNames = useDeckNames();

  const [decks, setDecks] = useState<DeckStats[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    if (deckNames.isLoading || deckNames.error || !deckNames.names.length) return;
    getDeckStats(deckNames.names)
      .then((deckStats) => setDecks(deckStats))
      .catch((err) => setError(err))
      .finally(() => setIsLoading(false));
  }, [deckNames.names, deckNames.isLoading, deckNames.error]);

  return { decks, isLoading, error };
};
