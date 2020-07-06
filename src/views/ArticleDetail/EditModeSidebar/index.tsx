import gql from 'graphql-tag'

import EditCollection from './EditCollection'

import { EditModeSidebarArticle } from './__generated__/EditModeSidebarArticle'

interface EditModeSidebarProps {
  article: EditModeSidebarArticle
}

const EditModeSidebar = ({ article }: EditModeSidebarProps) => (
  <>
    <EditCollection article={article} />
  </>
)

EditModeSidebar.fragments = {
  article: gql`
    fragment EditModeSidebarArticle on Article {
      id
      ...EditCollectionArticle
    }
    ${EditCollection.fragments.article}
  `,
}

export default EditModeSidebar
