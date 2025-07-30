import { useRouter } from 'next/router'
import baseToast from 'react-hot-toast'
import { FormattedMessage } from 'react-intl'

import { toPath } from '~/common/utils'
import { toast } from '~/components'
import { LatestVersionArticleQuery } from '~/gql/graphql'
interface PublishedStateProps {
  article: NonNullable<
    LatestVersionArticleQuery['article'] & { __typename: 'Article' }
  >
}

const PublishedState = ({ article }: PublishedStateProps) => {
  const router = useRouter()
  baseToast.dismiss()
  toast.success({
    message: (
      <FormattedMessage
        defaultMessage="The article has been successfully published and will be synced to IPFS soon."
        id="QOLRFh"
        description="src/views/Me/DraftDetail/PublishState/index.tsx"
      />
    ),
  })
  const path = toPath({ page: 'articleDetail', article })
  router.push(path.href)
  return null
}

export default PublishedState
