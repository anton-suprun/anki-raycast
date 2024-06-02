import { useEffect, useState } from "react";
import { cardInfo } from "../api/cardActions";
import { Card } from "../types";

interface HookProps {
  cardID: number | undefined;
}

interface HookData {
  card: Card[] | null | undefined;
  isLoading: boolean;
  error: Error | null;
}

export const useCardInfo = ({ cardID }: HookProps): HookData => {
  const [card, setCard] = useState<Card[] | null>();
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!cardID) return;
    setIsLoading(true);
    cardInfo(cardID)
      .then((card) => setCard(card))
      .catch((err) => setError(err))
      .finally(() => setIsLoading(false));
  }, [cardID]);

  return { card, isLoading, error };
};
