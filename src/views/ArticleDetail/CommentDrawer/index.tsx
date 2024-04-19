import dynamic from 'next/dynamic'
import { useIntl } from 'react-intl'

import { Drawer, IconArrowLeft24 } from '~/components'

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
  defaultCommentContent?: string
}

export const CommentDrawer: React.FC<CommentDrawerProps> = ({
  isOpen,
  onClose,
  step,
  id,
  lock,
  switchToCommentList,
  defaultCommentContent,
}) => {
  const intl = useIntl()
  const isCommentDetail = step === 'commentDetail'
  const isCommentList = step === 'commentList'

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
            <DynamicComments
              id={id}
              lock={lock}
              defaultCommentContent={defaultCommentContent}
            />
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
                text={<IconArrowLeft24 size="md" />}
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
