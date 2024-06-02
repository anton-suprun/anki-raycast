import { Form, ActionPanel, Action, showToast, ToastStyle, useNavigation } from "@raycast/api";
import { createDeck } from "../api/deckActions";

export const CreateDeckAction = () => {
  const { pop } = useNavigation();
  const handleSubmit = async (values: { deckName: string }) => {
    await createDeck(values.deckName);
    await showToast({
      style: ToastStyle.Success,
      title: "Created deck",
      message: values.deckName,
    });
    pop();
  };

  return (
    <Form
      actions={
        <ActionPanel>
          <Action.SubmitForm title="Add Note" onSubmit={handleSubmit} />
        </ActionPanel>
      }
    >
      <Form.TextField id="deckName" title="Deck Name" />
    </Form>
  );
};
