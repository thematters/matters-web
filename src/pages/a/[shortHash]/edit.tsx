import { Protected } from '~/components'
import ArticleDetailEdit from '~/views/ArticleDetail/Edit'

const ProtectedArticleDetailEdit = () => (
  <Protected>
    <ArticleDetailEdit />
  </Protected>
)

export default ProtectedArticleDetailEdit
