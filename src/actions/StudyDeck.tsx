import { Action, ActionPanel, Detail, showToast } from '@raycast/api';
import { useState, useMemo, useCallback, useEffect } from 'react';
import { Card, CardField, CardFieldObj, Ease, ShortcutDictionary } from '../types';
import { useCachedPromise } from '@raycast/utils';
import cardActions from '../api/cardActions';
import useTurndown from '../hooks/useTurndown';
import useAnkiConfig from '../hooks/useAnkiConfig';

interface Props {
  deckName: string;
}

export const StudyDeck = ({ deckName }: Props) => {
  const { mediaPath } = useAnkiConfig();
  const { turndown } = useTurndown(mediaPath);

  const {
    data: cards,
    isLoading: cardsLoading,
    error: cardsError,
  } = useCachedPromise(cardActions.findCards, [deckName]);

  const {
    data: cardsDueInfo,
    isLoading: cardsDueLoading,
    error: cardsDueError,
    revalidate,
  } = useCachedPromise(cardActions.cardsDueInfo, [cards]);

  const shortcuts = useMemo((): ShortcutDictionary => {
    return {
      showCardInfo: { modifiers: ['cmd'], key: 'i' },
      againAction: { modifiers: ['ctrl'], key: '1' },
      hardAction: { modifiers: ['ctrl'], key: '2' },
      easyAction: { modifiers: ['ctrl'], key: '4' },
    };
  }, []);

  const [showAnswer, setShowAnswer] = useState(false);
  const [showCardInfo, setShowCardInfo] = useState(false);
  const [currentCard, setCurrentCard] = useState<Card | undefined>();

  const parseFields = useCallback((fields: CardFieldObj): Array<CardField> => {
    return Object.entries(fields).map(([fieldName, field]) => ({
      fieldName: fieldName,
      value: field.value,
    }));
  }, []);

  const renderMarkdownString = useCallback(
    (fields: Array<CardField>, showAnswer: boolean) => {
      if (!turndown) return;
      const { value: questionValue } = fields[0];
      const question = `${turndown.turndown(questionValue)}\n`;

      const answers = fields.slice(1).map(answer => {
        return `\n---\n${turndown.turndown(answer.value)}\n`;
      });

      return showAnswer ? question + answers.join('\n') : question;
    },
    [turndown]
  );

  //==================
  useEffect(() => {
    if (!cardsDueInfo) return;
    console.log('cards due changed', cardsDueInfo.length);
    setCurrentCard(cardsDueInfo[0]);
  }, [cardsDueInfo]);
  //==================

  const cardView = useMemo(() => {
    if (!cardsDueInfo || cardsDueLoading) return;
    if (cardsDueError) {
      showToast({
        title: 'Error: cardsDueError',
        message: `Getting cards due failed`,
      });
    }
    if (!cardsDueInfo.length) return '## Congratulations! You have finished this deck for now.';
    return renderMarkdownString(parseFields(cardsDueInfo[0].fields), showAnswer);
  }, [showAnswer, cardsDueInfo, parseFields]);

  const handleShowCardInfo = () => setShowCardInfo(!showCardInfo);
  const handleShowAnswer = () => setShowAnswer(!showAnswer);
  const handleAnswerCard = useCallback(
    async (ease: Ease) => {
      if (!currentCard) return;
      try {
        const success = await cardActions.answerCard(currentCard.cardId, ease);

        if (!success) return;
        setShowAnswer(false);
        revalidate();
      } catch (error) {
        console.error(error);
      }
    },
    [currentCard]
  );

  return (
    <Detail
      markdown={cardView}
      isLoading={cardsLoading || cardsDueLoading}
      actions={
        <ActionPanel>
          {!showAnswer ? (
            <Action title="Show Answer" onAction={handleShowAnswer} />
          ) : (
            <>
              <Action title="Good" onAction={async () => await handleAnswerCard(Ease.Good)} />
              <Action
                title="Again"
                shortcut={shortcuts.againAction}
                onAction={async () => await handleAnswerCard(Ease.Again)}
              />
              <Action
                title="Hard"
                shortcut={shortcuts.hardAction}
                onAction={async () => await handleAnswerCard(Ease.Hard)}
              />
              <Action
                title="Easy"
                shortcut={shortcuts.easyAction}
                onAction={async () => await handleAnswerCard(Ease.Easy)}
              />
            </>
          )}
          <ActionPanel.Section />
          <Action
            title="Show Card Info"
            shortcut={shortcuts.showAnswer}
            onAction={handleShowCardInfo}
          />
        </ActionPanel>
      }
    />
  );
};
