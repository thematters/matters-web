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
              defaultMessage="Your work has been republished. Share it on different platforms "
              id="09AywK"
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
        <FormattedMessage defaultMessage="Article republished" id="gz0EGC" />
      }
      btns={
        <Dialog.RoundedButton
          text={
            <FormattedMessage
              defaultMessage="View republished article"
              id="AQuumI"
            />
          }
          onClick={() => {
            window.location.href = path.href
          }}
        />
      }
      smUpBtns={
        <Dialog.TextButton
          text={
            <FormattedMessage
              defaultMessage="View republished article"
              id="AQuumI"
            />
          }
          onClick={() => {
            window.location.href = path.href
          }}
        />
      }
    >
      {({ openDialog }) => <BasePublishedState openShareDialog={openDialog} />}
    </ShareDialog>
  )
}

export default PublishedState
