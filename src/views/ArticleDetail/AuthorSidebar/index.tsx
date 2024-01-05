import { ArticleDetailPublicQuery } from '~/gql/graphql'

import Author from './Author'
import { fragments } from './gql'
import { Placeholder } from './Placeholder'

type AuthorSidebarProps = {
  article: NonNullable<ArticleDetailPublicQuery['article']>
}

export const AuthorSidebar = ({ article }: AuthorSidebarProps) => {
  return (
    <>
      <Author article={article} />
    </>
  )
}

AuthorSidebar.Placeholder = Placeholder
AuthorSidebar.fragments = fragments
