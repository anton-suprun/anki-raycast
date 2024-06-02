import { Action, ActionPanel, List } from "@raycast/api";
import { useEffect } from "react";
import AddCardAction from "./actions/AddCardAction";
import { CreateDeckAction } from "./actions/CreateDeckAction";
import { StudyDeck } from "./actions/StudyDeck";
import { useDeckStats } from "./hooks/useDeckStats";
import { getDeckState } from "./util";

export default function Decks() {
  const { decks } = useDeckStats();

  useEffect(() => {
    console.log(decks);
  }, [decks]);

  const listItems = decks.map((deck) => (
    <List.Item
      key={deck.deck_id}
      title={deck.name}
      subtitle={`${deck.total_in_deck}`}
      accessories={getDeckState(deck)}
      actions={
        <ActionPanel>
          <Action.Push title={`Study ${deck.name}`} target={<StudyDeck deckName={deck.name} />} />
          <Action title="Add Card" onAction={AddCardAction} />
          <Action.Push title="Create Deck" target={<CreateDeckAction />} />
        </ActionPanel>
      }
    />
  ));

  return (
    <List navigationTitle="Search Decks" searchBarPlaceholder="Enter deck name...">
      <List.Section title="Deck" subtitle="Total cards">
        {listItems}
      </List.Section>
    </List>
  );
}
