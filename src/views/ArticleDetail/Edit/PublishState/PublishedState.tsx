import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { FormattedMessage } from 'react-intl'

import { MAX_META_SUMMARY_LENGTH } from '~/common/enums'
import { makeSummary, normalizeTag, toPath } from '~/common/utils'
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
      title={
        article.author.displayName
          ? `${makeSummary(article.title, MAX_META_SUMMARY_LENGTH)} - ${article.author.displayName} - Matters`
          : `${makeSummary(article.title, MAX_META_SUMMARY_LENGTH)} - Matters`
      }
      path={path.href}
      tags={article.tags
        ?.map((tag) => tag.content)
        .map(normalizeTag)
        .join(' ')
        .split(/\s+/)}
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
