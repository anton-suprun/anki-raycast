import { Action, ActionPanel, List } from '@raycast/api';
import { useCachedPromise } from '@raycast/utils';
import { useCallback, useEffect, useMemo, useState } from 'react';
import useAnkiConfig from './hooks/useAnkiConfig';
import useTurndown from './hooks/useTurndown';
import { Card, ShortcutDictionary } from './types';
import cardActions from './api/cardActions';
import { getCardType, getQueueType } from './util';
import AddCardAction from './actions/AddCardAction';

export default function BrowseCards() {
  const { mediaPath } = useAnkiConfig();
  const { turndown } = useTurndown(mediaPath);

  const shortcuts = useMemo((): ShortcutDictionary => {
    return {
      deleteCard: { modifiers: ['cmd'], key: 'd' },
      addCard: { modifiers: ['cmd'], key: 'd' },
      toggleMetadata: { modifiers: ['cmd'], key: 'd' },
      openAnkiManual: { modifiers: ['cmd'], key: 'o' },
    };
  }, []);

  const handleUpdateQuery = useCallback((text: string) => {
    setQuery(text);
  }, []);

  const [query, setQuery] = useState<string>('');
  const [metadataVisible, setMetadataVisible] = useState<boolean>(true);

  const { data, isLoading, error, revalidate } = useCachedPromise(cardActions.findCardsInfo, [
    query,
  ]);

  useEffect(() => {
    if (isLoading || error || !data) return;
    console.log(data[0]);
  }, [data, isLoading, error]);

  const handleDeleteCard = useCallback(() => {
    // delete card
    console.log('deleteing card');
  }, []);

  const handleToggleMetadata = useCallback(
    () => setMetadataVisible(!metadataVisible),
    [metadataVisible]
  );

  const listItemActions = useMemo(() => {
    return (
      <ActionPanel>
        <ActionPanel.Section>
          <Action
            title="Toggle Metadata"
            shortcut={shortcuts.toggleMetadata}
            onAction={handleToggleMetadata}
          />
          <Action.Push
            title="Create New Card"
            onPop={revalidate}
            shortcut={shortcuts.addCard}
            target={<AddCardAction />}
          />
          <Action title="Delete Card" shortcut={shortcuts.deleteCard} onAction={handleDeleteCard} />
        </ActionPanel.Section>
        <ActionPanel.Section>
          <Action.OpenInBrowser
            url="https://docs.ankiweb.net/searching.html"
            title="Open Anki Manual"
            shortcut={shortcuts.openAnkiManual}
          />

          <Action title="Delete Card" shortcut={shortcuts.deleteCard} onAction={handleDeleteCard} />
        </ActionPanel.Section>
      </ActionPanel>
    );
  }, [handleDeleteCard, handleToggleMetadata, shortcuts]);

  const listItems = useCallback(
    (card: Card) => {
      if (!card || !turndown) return <></>;

      const fields = Object.entries(card.fields);
      const title = turndown.turndown(fields[0][1].value);

      const markdown = fields
        .map(([key, field]) => `#### ${key}\n___\n${turndown.turndown(field.value)}`)
        .join('\n\n');

      return (
        <List.Item
          actions={listItemActions}
          key={card.cardId}
          title={{ value: title, tooltip: 'tooltip' }}
          detail={
            <List.Item.Detail
              markdown={markdown}
              metadata={
                metadataVisible && (
                  <List.Item.Detail.Metadata>
                    <List.Item.Detail.Metadata.Label title="Deck" text={card.deckName} />
                    <List.Item.Detail.Metadata.Label title="Model" text={card.modelName} />
                    <List.Item.Detail.Metadata.Label
                      title="Interval"
                      text={`${card.interval} days`}
                    />
                    <List.Item.Detail.Metadata.Label
                      title="Due"
                      text={new Date(card.due * 1000).toLocaleDateString()}
                    />
                    <List.Item.Detail.Metadata.Label
                      title="Repetitions"
                      text={card.reps.toString()}
                    />
                    <List.Item.Detail.Metadata.Label title="Lapses" text={card.lapses.toString()} />
                    <List.Item.Detail.Metadata.Label title="Type" text={getCardType(card.type)} />
                    <List.Item.Detail.Metadata.Label
                      title="Queue"
                      text={getQueueType(card.queue)}
                    />
                    <List.Item.Detail.Metadata.Label
                      title="Last Modified"
                      text={new Date(card.mod * 1000).toLocaleString()}
                    />
                  </List.Item.Detail.Metadata>
                )
              }
              isLoading={isLoading}
            />
          }
        />
      );
    },
    [turndown, isLoading, metadataVisible, handleToggleMetadata]
  );

  return (
    <List
      isShowingDetail
      searchBarPlaceholder="Search cards..."
      isLoading={isLoading}
      searchText={query}
      onSearchTextChange={handleUpdateQuery}
    >
      {data && data?.map(listItems)}{' '}
    </List>
  );
}
