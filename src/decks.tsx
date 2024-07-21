import { Action, ActionPanel, confirmAlert, List, showToast } from '@raycast/api';
import { useCachedPromise } from '@raycast/utils';
import AddCardAction from './actions/AddCardAction';
import CreateDeckAction from './actions/CreateDeckAction';
import { StudyDeck } from './actions/StudyDeck';
import { delay, getDeckState } from './util';
import { deleteDeck, getDecks } from './api/deckActions';
import { useCallback, useEffect, useMemo } from 'react';
import { ShortcutDictionary } from './types';

export default function Decks() {
  const { data, isLoading, revalidate, error } = useCachedPromise(getDecks);

  const shortcuts = useMemo((): ShortcutDictionary => {
    return {
      addCardToDeck: { modifiers: ['ctrl'], key: 'a' },
      createNewDeck: { modifiers: ['cmd'], key: 'n' },
      deleteDeck: { modifiers: ['cmd'], key: 'd' },
      renameDeck: { modifiers: ['cmd'], key: 'r' },
    };
  }, []);

  const handleDeleteDeck = async (deckName: string) => {
    const deleteConfirm = await confirmAlert({
      title: `Are you sure you want to delete deck: ${deckName}?`,
    });

    if (deleteConfirm) {
      try {
        await deleteDeck(deckName);
        await delay(1);
        revalidate();
      } catch (error: unknown) {
        if (error instanceof Error) {
          showToast({ title: 'Error', message: error.message });
        } else {
          showToast({ title: 'Error', message: 'An unknown error occurred' });
        }
      }
    }
  };

  useEffect(() => {
    if (error) {
      showToast({
        title: error.message,
      });
    }
  }, [error]);

  const handleUpdateCache = useCallback(() => revalidate(), []);

  return (
    <List
      isLoading={isLoading}
      navigationTitle="Search Decks"
      searchBarPlaceholder="Enter deck name..."
    >
      <List.Section title="Deck" subtitle="Total cards">
        {data?.map(deck => (
          <List.Item
            key={deck.deck_id}
            title={deck.name}
            subtitle={`${deck.total_in_deck}`}
            accessories={getDeckState(deck)}
            actions={
              <ActionPanel>
                <Action.Push
                  title="Study Deck"
                  onPop={handleUpdateCache}
                  target={<StudyDeck deckName={deck.name} />}
                />
                <Action.Push
                  title="Browse Deck"
                  onPop={handleUpdateCache}
                  shortcut={shortcuts.viewDeck}
                  target={<CreateDeckAction />}
                />
                <Action.Push
                  title="Add Card To Deck"
                  onPop={handleUpdateCache}
                  shortcut={shortcuts.addCardToDeck}
                  target={<AddCardAction />}
                />
                <Action.Push
                  title="Create New Deck"
                  onPop={handleUpdateCache}
                  shortcut={shortcuts.createNewDeck}
                  target={<CreateDeckAction />}
                />
                <Action
                  title="Delete Deck"
                  shortcut={shortcuts.deleteDeck}
                  onAction={async () => await handleDeleteDeck(deck.name)}
                />
              </ActionPanel>
            }
          />
        ))}
      </List.Section>
    </List>
  );
}
