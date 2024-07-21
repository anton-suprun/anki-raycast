import { Action, ActionPanel, Form, showToast } from '@raycast/api';
import { addCard } from '../api/noteActions';
import { useCachedPromise } from '@raycast/utils';
import { getDecks } from '../api/deckActions';
import { useEffect, useMemo, useRef } from 'react';
import { ShortcutDictionary } from '../types';

interface AddCardValues {
  front: string;
  back: string;
  deck: string;
  tags: string;
}

export default function AddCardAction() {
  const { data, isLoading, error } = useCachedPromise(getDecks);

  const frontCardRef = useRef<Form.TextArea>(null);
  const backCardRef = useRef<Form.TextArea>(null);
  const tagsCardRef = useRef<Form.TextArea>(null);

  const shortcuts = useMemo((): ShortcutDictionary => {
    return {
      clearForm: { modifiers: ['cmd'], key: 'x' },
    };
  }, []);

  useEffect(() => {
    if (error) {
      showToast({
        title: error.message,
      });
    }
  }, [error]);

  const handleClearForm = () => {
    frontCardRef.current?.reset();
    backCardRef.current?.reset();
    tagsCardRef.current?.reset();

    frontCardRef.current?.focus();
  };

  const handleAddCard = async (values: AddCardValues) => {
    try {
      await addCard(values);

      showToast({
        title: `Added new card to deck: ${values.deck}`,
      });

      handleClearForm();

      return true;
    } catch (error: unknown) {
      if (error instanceof Error) {
        showToast({ title: error.message });
      } else {
        showToast({ title: 'An unknown error occurred' });
      }
      return false;
    }
  };

  return (
    <Form
      actions={
        <ActionPanel>
          <Action.SubmitForm title="Add Card" onSubmit={handleAddCard} />
          <Action title="Clear Form" shortcut={shortcuts.clearForm} onAction={handleClearForm} />
        </ActionPanel>
      }
      navigationTitle="Add Card"
    >
      <Form.Dropdown id="deck" title="Deck" isLoading={isLoading} storeValue={false}>
        {data?.map(deck => (
          <Form.Dropdown.Item key={deck.deck_id} title={deck.name} value={deck.name} />
        ))}
      </Form.Dropdown>
      <Form.TextArea id="front" title="Card front" storeValue={false} ref={frontCardRef} />
      <Form.TextArea id="back" title="Card back" storeValue={false} ref={backCardRef} />
      <Form.TextField id="tags" title="Tags" storeValue={false} ref={tagsCardRef} />
    </Form>
  );
}
