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
    const path = "/Users/antonsuprun/Library/Application Support/Anki2/User 1/collection.media/"

    const cards = useCards({ deckName });
    const { card, isLoading, error } = useCardInfo({ cardID: currentCardID });

    const [turndownService] = useState(() => {
        const td = new TurndownService();
        td.addRule('image', {
            filter: 'img',
            replacement: (content, node, options) => {
                // @ts-ignore:
                const fileName = node.attributes["0"].data
                return `![](<${path + fileName}>)`
            }
        });
        return td;
    })

    useEffect(() => {
            if (!cards || !cards.cardIDs || !cards.cardIDs.length) return;
            // TODO: add logic for handling empty decks
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
    if (!cards || !cards.cardIDs || cards.cardIDs.length == 0) return;
    const l = cards.cardIDs.length
    setOrd((ord + 1)%l)
  }, [cards]);

  const handlePrev = useCallback(() => {
      setAnswerVisible(false)
    if (!cards || !cards.cardIDs || cards.cardIDs.length == 0) return;
      if (ord === 0 ) {
          setOrd(cards.cardIDs.length - 1)
       } else {
           setOrd(ord - 1)
       }
  }, [cards]);

  const view = useMemo(() => {
    if (!front || !back) return "";
    const mdf = turndownService.turndown(front)
    const mdb = turndownService.turndown(front)
    if (!answerVisible) return `${mdf}`;
    return `${mdf}\n\n\n\n\n\n${mdb}`;
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
