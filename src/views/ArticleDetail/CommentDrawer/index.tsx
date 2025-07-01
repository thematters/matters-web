import dynamic from 'next/dynamic'
import { useEffect } from 'react'
import { useIntl } from 'react-intl'

import IconLeft from '@/public/static/icons/24px/left.svg'
import { KEYVALUE } from '~/common/enums'
import { analytics } from '~/common/utils'
import {
  Drawer,
  Icon,
  useCommentEditorContext,
  useNativeEventListener,
} from '~/components'
import { ArticleDetailPublicQuery } from '~/gql/graphql'

import { Placeholder as CommentsPlaceholder } from '../Comments/Placeholder'

const DynamicComments = dynamic(() => import('../Comments'), {
  ssr: false,
  loading: () => <CommentsPlaceholder />,
})

const DynamicCommentsDetail = dynamic(
  () => import('../Comments/CommentDetail'),
  {
    ssr: false,
    loading: () => <CommentsPlaceholder />,
  }
)

export type CommentDrawerStep = 'commentList' | 'commentDetail'

type CommentDrawerProps = {
  isOpen: boolean
  onClose: () => void
  step: CommentDrawerStep
  lock: boolean
  switchToCommentList: () => void
  article: NonNullable<ArticleDetailPublicQuery['article']>
}

export const CommentDrawer: React.FC<CommentDrawerProps> = ({
  isOpen,
  onClose,
  step,
  lock,
  switchToCommentList,
  article,
}) => {
  const intl = useIntl()
  const isCommentDetail = step === 'commentDetail'
  const isCommentList = step === 'commentList'
  const { setActiveEditor } = useCommentEditorContext()

  const canComment = article.canComment

  useEffect(() => {
    if (isOpen) {
      analytics.trackEvent('view_comment_drawer', {
        contentType: 'article',
        id: article.id,
      })
    }

    if (!isOpen && isCommentList) {
      setActiveEditor(null)
    }
  }, [isOpen])

  // Keyboard shortcuts for open/close comment drawer
  useNativeEventListener('keydown', (event: KeyboardEvent) => {
    const keyCode = event.code.toLowerCase()

    if (keyCode === KEYVALUE.escape && isOpen) {
      onClose()
    }

    if (keyCode === KEYVALUE.keyC && !isOpen) {
      if (!canComment) {
        return
      }

      onClose()
    }
  })

  return (
    <Drawer isOpen={isOpen} onClose={onClose}>
      {isCommentList && (
        <>
          <Drawer.Header
            title={intl.formatMessage({
              defaultMessage: 'Comment',
              description: 'src/views/ArticleDetail/index.tsx',
              id: 'OsX3KM',
            })}
            closeDrawer={onClose}
          />
          <Drawer.Content>
            <DynamicComments id={article.id} lock={lock} />
          </Drawer.Content>
        </>
      )}
      {isCommentDetail && (
        <>
          <Drawer.Header
            title={intl.formatMessage({
              defaultMessage: 'Comment Details',
              id: '4OMGUj',
            })}
            leftBtn={
              <Drawer.TextButton
                onClick={switchToCommentList}
                aria-label={intl.formatMessage({
                  defaultMessage: 'Back',
                  id: 'cyR7Kh',
                })}
                text={<Icon icon={IconLeft} size={24} />}
              />
            }
            closeDrawer={onClose}
          />
          <Drawer.Content>
            <DynamicCommentsDetail />
          </Drawer.Content>
        </>
      )}
    </Drawer>
  )
}
