import { useMemo } from 'react';
import TurndownService from 'turndown';

function useTurndown(mediaPath: string) {
  const turndown = useMemo((): TurndownService | undefined => {
    if (!mediaPath) return;

    const td = new TurndownService();

    td.addRule('image', {
      filter: 'img',
      replacement: (_, node) => {
        const imgNode = node as HTMLImageElement;
        return `![](<${mediaPath}${imgNode.getAttribute('src')}>)`;
      },
    });

    return td;
  }, [mediaPath]);

  return {
    turndown,
  };
}
export default useTurndown;
