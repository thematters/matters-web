import { Translate } from '~/components'
import { Toast } from '~/components/Toast'

const PublishedState = () => {
  return (
    <Toast
      color="green"
      header={<Translate zh_hant="文章已發布" zh_hans="文章已发布" />}
    />
  )
}

export default PublishedState
