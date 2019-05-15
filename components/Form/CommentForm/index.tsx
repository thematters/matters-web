import gql from 'graphql-tag'
import _get from 'lodash/get'
import dynamic from 'next/dynamic'
import { useContext, useState } from 'react'

import { Button } from '~/components/Button'
import { Mutation } from '~/components/GQL'
import ARTICLE_COMMENTS from '~/components/GQL/queries/articleComments'
import COMMENT_COMMENTS from '~/components/GQL/queries/commentComments'
import { Icon } from '~/components/Icon'
import IconSpinner from '~/components/Icon/Spinner'
import { Translate } from '~/components/Language'
import { Spinner } from '~/components/Spinner'
import { ViewerContext } from '~/components/Viewer'

import { ADD_TOAST, OPEN_MODAL } from '~/common/enums'
import { dom, trimLineBreaks } from '~/common/utils'
import ICON_POST from '~/static/icons/post.svg?sprite'

import styles from './styles.css'

const CommentEditor = dynamic(
  () => import('~/components/Editor/CommentEditor'),
  {
    ssr: false,
    loading: () => <Spinner />
  }
)

export const PUT_COMMENT = gql`
  mutation putComment($input: PutCommentInput!) {
    putComment(input: $input) {
      id
      content
    }
  }
`

interface CommentFormProps {
  defaultContent?: string | null
  articleMediaHash: string
  articleId: string
  commentId?: string
  replyToId?: string
  parentId?: string
  submitCallback?: () => void
  refetch?: boolean
  extraButton?: React.ReactNode
}

const CommentForm = ({
  defaultContent,
  articleMediaHash,
  commentId,
  parentId,
  replyToId,
  articleId,
  submitCallback,
  refetch,
  extraButton
}: CommentFormProps) => (
  <Mutation
    mutation={PUT_COMMENT}
    refetchQueries={
      !refetch
        ? []
        : parentId
        ? [
            {
              query: COMMENT_COMMENTS,
              variables: { id: parentId }
            }
          ]
        : articleMediaHash
        ? [
            {
              query: ARTICLE_COMMENTS,
              variables: { mediaHash: articleMediaHash }
            }
          ]
        : []
    }
  >
    {putComment => {
      const [isSubmitting, setSubmitting] = useState(false)
      const [expand, setExpand] = useState(false)
      const [content, setContent] = useState(defaultContent || '')
      const viewer = useContext(ViewerContext)
      const isValid = !!trimLineBreaks(content)

      const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        const mentions = dom.getAttributes('data-id', content)
        const input = {
          id: commentId,
          comment: {
            content: trimLineBreaks(content),
            replyTo: replyToId,
            articleId,
            parentId,
            mentions
          }
        }

        event.preventDefault()
        setSubmitting(true)

        putComment({ variables: { input } })
          .then(({ data }: any) => {
            if (submitCallback) {
              submitCallback()
            }
            setContent('')
            window.dispatchEvent(
              new CustomEvent(ADD_TOAST, {
                detail: {
                  color: 'green',
                  content: (
                    <Translate zh_hant="評論已送出" zh_hans="评论已送出" />
                  )
                }
              })
            )

            if (viewer.isOnboarding) {
              setTimeout(async () => {
                const result = await viewer.refetch()
                const newState = _get(result, 'data.viewer.status.state')
                if (newState === 'active') {
                  window.dispatchEvent(
                    new CustomEvent(OPEN_MODAL, {
                      detail: {
                        id: 'selfActivationModal'
                      }
                    })
                  )
                }
              }, 3000)
            }
          })
          .catch((result: any) => {
            window.dispatchEvent(
              new CustomEvent(ADD_TOAST, {
                detail: {
                  color: 'red',
                  content: (
                    <Translate zh_hant="評論送出失敗" zh_hans="评论失败送出" />
                  )
                }
              })
            )
          })
          .finally(() => {
            setSubmitting(false)
          })
      }

      return (
        <form
          onSubmit={handleSubmit}
          className={expand ? 'expand' : ''}
          onFocus={() => setExpand(true)}
        >
          <CommentEditor
            content={content}
            expand={expand}
            handleChange={value => setContent(value)}
          />
          <div className="buttons">
            {extraButton && extraButton}
            <Button
              type="submit"
              bgColor="green"
              disabled={
                isSubmitting ||
                !isValid ||
                !viewer.isAuthed ||
                viewer.isInactive
              }
              icon={
                isSubmitting ? (
                  <IconSpinner />
                ) : (
                  <Icon id={ICON_POST.id} viewBox={ICON_POST.viewBox} />
                )
              }
            >
              <Translate zh_hant="送出" zh_hans="送出" />
            </Button>
          </div>

          <style jsx>{styles}</style>
        </form>
      )
    }}
  </Mutation>
)

export default CommentForm
