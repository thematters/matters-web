import dynamic from 'next/dynamic'
import { useState } from 'react'
import { FormattedMessage } from 'react-intl'

import { ReactComponent as IconLeft } from '@/public/static/icons/24px/left.svg'
import { ReactComponent as IconTimes } from '@/public/static/icons/24px/times.svg'
import { OPEN_COMMENT_DETAIL_DIALOG } from '~/common/enums'
import { Dialog, Icon, useDialogSwitch, useEventListener } from '~/components'
import {
  ArticleDetailPublicQuery,
  ToolbarArticlePrivateFragment,
  ToolbarArticlePublicFragment,
} from '~/gql/graphql'

import { Placeholder } from '../Placeholder'

type Step = 'commentList' | 'commentDetail'
interface CommentsDialogProps {
  id: string
  lock: boolean
  children: ({ openDialog }: { openDialog: () => void }) => React.ReactNode
  step?: Step

  // FixedToolbar
  article: ToolbarArticlePublicFragment & Partial<ToolbarArticlePrivateFragment>
  articleDetails: NonNullable<ArticleDetailPublicQuery['article']>
  translated: boolean
  translatedLanguage?: string | null
  privateFetched: boolean
  showCommentToolbar: boolean
  openCommentsDialog?: () => void
}

const DynamicListContent = dynamic(() => import('./ListContent'), {
  loading: () => (
    <Dialog.Content fixedHeight>
      <Placeholder />
    </Dialog.Content>
  ),
})

const DynamicDetailContent = dynamic(() => import('./DetailContent'), {
  loading: () => (
    <Dialog.Content fixedHeight>
      <Placeholder />
    </Dialog.Content>
  ),
})

const BaseCommentsDialogDialog = ({
  id,
  lock,
  children,
  step: _step = 'commentList',

  // from FixedToolbar
  article,
  articleDetails,
  translated,
  translatedLanguage,
  privateFetched,
  showCommentToolbar,
  openCommentsDialog,
}: CommentsDialogProps) => {
  const { show, openDialog, closeDialog } = useDialogSwitch(true)
  const [step, setStep] = useState<Step>(_step)
  const isInCommentDetail = step === 'commentDetail'
  const isInCommentList = step === 'commentList'

  const backToCommentList = () => setStep('commentList')

  return (
    <>
      {children({ openDialog })}

      <Dialog
        isOpen={show}
        onDismiss={() => {
          backToCommentList()
          closeDialog()
        }}
      >
        <Dialog.Header
          title={
            <>
              {isInCommentList && (
                <FormattedMessage defaultMessage="Comment" id="LgbKvU" />
              )}
              {isInCommentDetail && (
                <FormattedMessage
                  defaultMessage="Comment Details"
                  id="4OMGUj"
                />
              )}
            </>
          }
          leftBtn={
            isInCommentDetail && (
              <button onClick={backToCommentList}>
                <Icon icon={IconLeft} size={24} />
              </button>
            )
          }
          titleLeft={isInCommentList}
          rightBtn={
            <button
              onClick={() => {
                backToCommentList()
                closeDialog()
              }}
            >
              <Icon icon={IconTimes} size={24} />
            </button>
          }
        />
        {isInCommentList && (
          <DynamicListContent
            id={id}
            lock={lock}
            closeDialog={closeDialog}
            article={article}
            articleDetails={articleDetails}
            translated={translated}
            translatedLanguage={translatedLanguage}
            privateFetched={privateFetched}
            showCommentToolbar={showCommentToolbar}
            openCommentsDialog={openCommentsDialog}
          />
        )}
        {isInCommentDetail && (
          <DynamicDetailContent
            closeDialog={closeDialog}
            backToCommentList={backToCommentList}
          />
        )}
      </Dialog>
    </>
  )
}

export const CommentsDialog = (props: CommentsDialogProps) => {
  const [step, setStep] = useState<Step>('commentList')
  const Children = ({ openDialog }: { openDialog: () => void }) => {
    useEventListener(OPEN_COMMENT_DETAIL_DIALOG, () => {
      setStep('commentDetail')
      setTimeout(() => {
        openDialog()
      })
    })
    return <>{props.children && props.children({ openDialog })}</>
  }
  return (
    <Dialog.Lazy mounted={<BaseCommentsDialogDialog {...props} step={step} />}>
      {({ openDialog }) => <Children openDialog={openDialog} />}
    </Dialog.Lazy>
  )
}
