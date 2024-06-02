import { Action, ActionPanel, Form } from "@raycast/api";
import { addCard } from "../api/noteActions";
import { useDeckNames } from "../hooks/useDeckNames";

export default function AddCardAction() {
  const { names, isLoading, error } = useDeckNames();
  return (
    <Form
      actions={
        <ActionPanel>
          <Action.SubmitForm title="Add Note" onSubmit={addCard} />
        </ActionPanel>
      }
    >
      <Form.Dropdown id="deck" title="Deck">
        {names.map((deck) => (
          <Form.Dropdown.Item key={deck} title={deck} value={deck} />
        ))}
      </Form.Dropdown>
      <Form.TextArea id="front" title="Card front" />
      <Form.TextArea id="back" title="Card back" />
      <Form.TextField id="tags" title="Tags" />
    </Form>
  );
}
