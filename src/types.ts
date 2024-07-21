import { Keyboard } from '@raycast/api';

export interface AnkiCollectionData {
  crt: number;
}

// Base type for AnkiResponse with generic result and error types
export type AnkiResponse<T, E> = {
  result: T;
  error: E;
};

export type DeckName = {
  [deckName: string]: number;
};
export type DeckStats = {
  deck_id: number;
  name: string;
  new_count: number;
  learn_count: number;
  review_count: number;
  total_in_deck: number;
};

export interface CardField {
  fieldName: string;
  value: string;
}
export type CardFieldObj = {
  [fieldName: string]: { value: string; order: number };
};

export enum Ease {
  Again = 1,
  Hard = 2,
  Good = 3,
  Easy = 4,
}

export type Card = {
  answer: string;
  question: string;
  deckName: string;
  modelName: string;
  fieldOrder: number;
  fields: CardFieldObj;
  css: string;
  cardId: number;
  interval: number;
  note: number;
  ord: number;
  type: number;
  queue: number;
  due: number;
  reps: number;
  lapses: number;
  left: number;
  mod: number;
};

export type Note = {
  noteId: number;
  modelName: string;
  tags: string[];
  fields: {
    [fieldName: string]: {
      value: string;
      order: number;
    };
  };
  cards: number[];
};

export type ShortcutDictionary = {
  [shortcut: string]: Keyboard.Shortcut;
};
