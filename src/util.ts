import { Color, List } from "@raycast/api";
import { DeckStats } from "./types";

export const getDeckState = (deck: DeckStats): List.Item.Accessory[] => {
  return [
    {
      text: {
        value: `Due: ${deck.review_count}`,
        color: deck.review_count > 0 ? Color.Green : Color.SecondaryText,
      },
    },
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
  ];
};
