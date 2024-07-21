import { Color, List } from '@raycast/api';
import { DeckStats, DeckName } from './types';

export const getDeckState = (deck: DeckStats): List.Item.Accessory[] => {
  return [
    {
      text: {
        value: `New: ${deck.new_count}`,
        color: deck.new_count > 0 ? Color.Blue : Color.SecondaryText,
      },
    },
    {
      text: {
        value: `Learn: ${deck.learn_count}`,
        color: deck.learn_count > 0 ? Color.Red : Color.SecondaryText,
      },
    },
    {
      text: {
        value: `Due: ${deck.review_count}`,
        color: deck.review_count > 0 ? Color.Green : Color.SecondaryText,
      },
    },
  ];
};

export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export function combineDeckInfo(
  deckStats: { [key: string]: DeckStats },
  deckNames: DeckName
): DeckStats[] {
  const idToFullName = Object.fromEntries(
    Object.entries(deckNames).map(([fullName, id]) => [id.toString(), fullName])
  );

  return Object.values(deckStats).map(stat => ({
    ...stat,
    name: idToFullName[stat.deck_id.toString()] || stat.name,
  }));
}

// Helper functions to interpret card type and queue
export function getCardType(type: number): string {
  const types = ['New', 'Learning', 'Review', 'Relearning'];
  return types[type] || 'Unknown';
}

export function getQueueType(queue: number): string {
  const queues = ['New', 'Learning', 'Review', 'Day Learn', 'Preview', 'Suspended'];
  return queues[queue] || 'Unknown';
}
