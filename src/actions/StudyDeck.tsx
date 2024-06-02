import { Action, ActionPanel, Detail } from "@raycast/api";
import { useCallback, useEffect, useMemo, useState } from "react";
import TurndownService from "turndown";
import { useCardInfo } from "../hooks/useCardInfo";
import { useCards } from "../hooks/useCards";

interface ViewProps {
deckName: string;
}

export const StudyDeck = ({ deckName }: ViewProps) => {
    const [currentCardID, setCurrentCardID] = useState<number | undefined>();
    const [ord, setOrd] = useState<number>(0);
    const [front, setFront] = useState<string | undefined>();
    const [back, setBack] = useState<string | undefined>();
    const [answerVisible, setAnswerVisible] = useState<boolean>(false);

    const cards = useCards({ deckName });
    const { card, isLoading, error } = useCardInfo({ cardID: currentCardID });

    const [turndownService] = useState(() => {
        return new TurndownService();
        })

    useEffect(() => {
            if (!cards || !cards.cardIDs || !cards.cardIDs.length) return;
            // TODO: add logic for handling empty decks
            console.log("Order: ", ord, "CardIDs: ", cards.cardIDs)
            setCurrentCardID(cards.cardIDs[ord]);
            }, [cards, ord]);

    useEffect(() => {
            if (!currentCardID || !card || !card.length) return;
            setFront(card[0].fields.Front.value);
            setBack(card[0].fields.Back.value);
    }, [card]);

    const handleShowAnswer = useCallback(() => {
            setAnswerVisible(true);
    }, []);

  const handleNext = useCallback(() => {
    setAnswerVisible(false)
    setOrd((ord + 1)%cards?.cardIDs?.length)
  }, [cards]);

  const handlePrev = useCallback(() => {
      setAnswerVisible(false)
      if (ord === 0 ) {
          setOrd(cards.cardIDs.length - 1)
       } else {
           setOrd(ord - 1)
       }
  }, [cards]);

  const view = useMemo(() => {
    if (!front || !back) return "";
    if (!answerVisible) return `${turndownService.turndown(front)}`;
    return `${turndownService.turndown(front)}\n\n\n\n\n\n${turndownService.turndown(back)}`;
  }, [answerVisible, front, back]);

  return (
    <>
      <Detail
        markdown={view}
        actions={
          <ActionPanel>
            <Action title="Show Answer" onAction={handleShowAnswer} />
            <Action title="Next Card" onAction={handleNext} />
            <Action title="Previous Card" onAction={handlePrev} />
          </ActionPanel>
        }
      />
    </>
  );
};
