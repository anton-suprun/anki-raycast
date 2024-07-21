import { Action, ActionPanel, Form } from '@raycast/api';
import { addCard } from '../api/noteActions';
import { useDeckStats } from '../hooks/useDeckStats';

export default function AddCardAction() {
  const { decks, isLoading, error } = useDeckStats();
  return (
    <Form
      actions={
        <ActionPanel>
          <Action.SubmitForm title="Add Note" onSubmit={addCard} />
        </ActionPanel>
      }
    >
      <Form.Dropdown id="decks" title="Deck">
        {decks?.map(deck => (
          <Form.Dropdown.Item key={deck.deck_id} title={deck.name} value={deck.name} />
        ))}
      </Form.Dropdown>
      <Form.TextField id="front" title="Card front" />
      <Form.TextArea id="back" title="Card back" />
      <Form.TextField id="tags" title="Tags" />
    </Form>
  );
}
