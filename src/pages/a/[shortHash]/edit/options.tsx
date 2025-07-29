import { Protected } from '~/components'
import ArticleDetailEdit from '~/views/ArticleDetail/Edit'

const ProtectedArticleDetailEditOptions = () => {
  return (
    <Protected>
      <ArticleDetailEdit />
    </Protected>
  )
}

export default ProtectedArticleDetailEditOptions
