import {
  ActionPanel,
  Detail,
  Action,
  openExtensionPreferences,
  getPreferenceValues,
} from '@raycast/api';
import { useSQL } from '@raycast/utils';
import { useEffect } from 'react';

export default function TestCommand() {
  const markdown = 'API key incorrect. Please update it in extension preferences and try again.';

  const { ankiPath } = getPreferenceValues<Preferences>();

  const query = 'SELECT crt FROM col';

  const { data, isLoading } = useSQL(`${ankiPath}/collection.anki2`, query, {
    execute: Boolean(ankiPath),
  });

  useEffect(() => {
    if (isLoading || !data) return;
  }, [data, isLoading, ankiPath]);

  return (
    <Detail
      markdown={markdown}
      actions={
        <ActionPanel>
          <Action title="Open Extension Preferences" onAction={openExtensionPreferences} />
        </ActionPanel>
      }
    />
  );
}
