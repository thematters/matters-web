import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { FormattedMessage } from 'react-intl'

import { toPath } from '~/common/utils'
import { Dialog, ShareDialog } from '~/components'
import { LatestVersionArticleQuery } from '~/gql/graphql'
interface PublishedStateProps {
  article: NonNullable<
    LatestVersionArticleQuery['article'] & { __typename: 'Article' }
  >
}

const BasePublishedState = ({
  openShareDialog,
}: {
  openShareDialog: () => void
}) => {
  useEffect(() => {
    openShareDialog()
  }, [])

  return null
}

const PublishedState = ({ article }: PublishedStateProps) => {
  const router = useRouter()
  const path = toPath({ page: 'articleDetail', article })

  return (
    <ShareDialog
      disableNativeShare
      title={article.title}
      path={encodeURI(path.href)}
      description={
        <>
          <p>
            <FormattedMessage
              defaultMessage="Your work has been published. Share it on different platforms "
              id="tqEGfa"
            />
          </p>
          <p>
            <FormattedMessage
              defaultMessage="to receive more support"
              id="MV0JlP"
            />
          </p>
        </>
      }
      headerTitle={
        <FormattedMessage defaultMessage="Article published" id="uYwH7j" />
      }
      btns={
        <Dialog.RoundedButton
          text={
            <FormattedMessage
              defaultMessage="View published article"
              id="GRrsEH"
            />
          }
          onClick={() => {
            router.push(path.href)
          }}
        />
      }
      smUpBtns={
        <Dialog.TextButton
          text={
            <FormattedMessage
              defaultMessage="View published article"
              id="GRrsEH"
            />
          }
          onClick={() => {
            router.push(path.href)
          }}
        />
      }
    >
      {({ openDialog }) => <BasePublishedState openShareDialog={openDialog} />}
    </ShareDialog>
  )
}

export default PublishedState
