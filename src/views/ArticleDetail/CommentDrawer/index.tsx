import dynamic from 'next/dynamic'
import { useEffect } from 'react'
import { useIntl } from 'react-intl'

import IconLeft from '@/public/static/icons/24px/left.svg'
import { analytics } from '~/common/utils'
import { Drawer, Icon, useCommentEditorContext } from '~/components'

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
  id: string
  lock: boolean
  switchToCommentList: () => void
}

export const CommentDrawer: React.FC<CommentDrawerProps> = ({
  isOpen,
  onClose,
  step,
  id,
  lock,
  switchToCommentList,
}) => {
  const intl = useIntl()
  const isCommentDetail = step === 'commentDetail'
  const isCommentList = step === 'commentList'
  const { setActiveEditor } = useCommentEditorContext()

  useEffect(() => {
    if (isOpen) {
      analytics.trackEvent('view_comment_drawer', {
        contentType: 'article',
        id: id,
      })
    }

    if (!isOpen && isCommentList) {
      setActiveEditor(null)
    }
  }, [isOpen])

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
            <DynamicComments id={id} lock={lock} />
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
