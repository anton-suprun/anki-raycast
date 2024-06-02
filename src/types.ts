export type DeckStats = {
  deck_id: number;
  name: string;
  new_count: number;
  learn_count: number;
  review_count: number;
  total_in_deck: number;
};

export type Card = {
  answer: string;
  question: string;
  deckName: string;
  modelName: string;
  fieldOrder: number;
  fields: {
    Front: { value: string; order: number };
    Back: { value: string; order: number };
  };
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
    Front: {
      value: string;
      order: number;
    };
    Back: {
      value: string;
      order: number;
    };
  };
};
