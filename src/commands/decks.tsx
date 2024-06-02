import { Action, ActionPanel, List } from "@raycast/api";
import AddNoteAction from "../actions/AddNoteAction";
import { useDeckStats } from "../hooks/useDeckStats";
import { getDeckState } from "../util";

export default function Decks() {
  const { decks } = useDeckStats();

  const listItems = decks.map((deck) => (
    <List.Item
      key={deck.deck_id}
      title={deck.name}
      subtitle={`${deck.total_in_deck}`}
      accessories={getDeckState(deck)}
      actions={
        <ActionPanel>
          <Action title={`Study ${deck.name}`} onAction={AddNoteAction} />
          <Action title="Add note to deck" onAction={AddNoteAction} />
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
