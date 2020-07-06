import gql from 'graphql-tag'

import CollectArticles from './CollectArticles'

import { EditModeSidebarArticle } from './__generated__/EditModeSidebarArticle'

interface EditModeSidebarProps {
  article: EditModeSidebarArticle
}

const EditModeSidebar = ({ article }: EditModeSidebarProps) => (
  <>
    <CollectArticles article={article} />
  </>
)

EditModeSidebar.fragments = {
  article: gql`
    fragment EditModeSidebarArticle on Article {
      id
      ...CollectArticlesArticle
    }
    ${CollectArticles.fragments.article}
  `,
}

export default EditModeSidebar
