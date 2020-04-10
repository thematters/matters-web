import gql from 'graphql-tag';

import AddCover from './AddCover';
import AddTags from './AddTags';
import CollectArticles from './CollectArticles';

import { DraftSidebarDraft } from './__generated__/DraftSidebarDraft';

interface SidebarProps {
  draft: DraftSidebarDraft;
  setSaveStatus: (status: 'saved' | 'saving' | 'saveFailed') => void;
}

const Sidebar = ({ draft, setSaveStatus }: SidebarProps) => (
  <>
    <AddCover draft={draft} setSaveStatus={setSaveStatus} />
    <AddTags draft={draft} setSaveStatus={setSaveStatus} />
    <CollectArticles draft={draft} setSaveStatus={setSaveStatus} />
  </>
);

Sidebar.fragments = {
  draft: gql`
    fragment DraftSidebarDraft on Draft {
      id
      ...AddCoverDraft
      ...AddTagsDraft
      ...CollectArticlesDraft
    }
    ${AddCover.fragments.draft}
    ${AddTags.fragments.draft}
    ${CollectArticles.fragments.draft}
  `,
};

export default Sidebar;
