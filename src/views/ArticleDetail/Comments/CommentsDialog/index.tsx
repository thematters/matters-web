import dynamic from 'next/dynamic'
import { useState } from 'react'
import { FormattedMessage } from 'react-intl'

import IconLeft from '@/public/static/icons/24px/left.svg'
import IconTimes from '@/public/static/icons/24px/times.svg'
import { OPEN_COMMENT_DETAIL_DIALOG } from '~/common/enums'
import { Dialog, Icon, useDialogSwitch, useEventListener } from '~/components'
import { ArticleDetailPublicQuery } from '~/gql/graphql'

import { Placeholder } from '../Placeholder'

type Step = 'commentList' | 'commentDetail'
interface CommentsDialogProps {
  id: string
  lock: boolean
  initStep?: Step

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
  initStep = 'commentList',

  articleDetails,
  translated,
  translatedLanguage,
  privateFetched,
  showCommentToolbar,
  openCommentsDialog,
}: CommentsDialogProps) => {
  const { show, openDialog, closeDialog } = useDialogSwitch(true)
  const [step, setStep] = useState<Step>(initStep)
  const isInCommentDetail = step === 'commentDetail'
  const isInCommentList = step === 'commentList'

  const backToCommentList = () => setStep('commentList')

  useEventListener(OPEN_COMMENT_DETAIL_DIALOG, openDialog)

  return (
    <>
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
    useEventListener(
      OPEN_COMMENT_DETAIL_DIALOG,
      (detail?: { parentId: string }) => {
        if (detail?.parentId) {
          setStep('commentDetail')
          setTimeout(() => {
            openDialog()
          })
        } else {
          openDialog()
        }
      }
    )
    return <></>
  }
  return (
    <Dialog.Lazy
      mounted={<BaseCommentsDialogDialog {...props} initStep={step} />}
    >
      {({ openDialog }) => <Children openDialog={openDialog} />}
    </Dialog.Lazy>
  )
}
