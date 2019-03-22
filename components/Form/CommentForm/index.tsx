import gql from 'graphql-tag'
import dynamic from 'next/dynamic'
import { useContext, useState } from 'react'

import { Button } from '~/components/Button'
import { Mutation } from '~/components/GQL'
import ARTICLE_COMMENTS from '~/components/GQL/queries/articleComments'
import COMMENT_COMMENTS from '~/components/GQL/queries/commentComments'
import { Icon } from '~/components/Icon'
import IconSpinner from '~/components/Icon/Spinner'
import { LanguageContext, Translate } from '~/components/Language'
import { Spinner } from '~/components/Spinner'
import { ViewerContext } from '~/components/Viewer'

import { translate } from '~/common/utils'
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
      const [content, setContent] = useState(defaultContent || '')
      const [error, setError] = useState<string | null>(null)
      const viewer = useContext(ViewerContext)
      const { lang } = useContext(LanguageContext)
      const isValid = !error && content

      const validate = (c: string) => {
        if (!c || c.length <= 0) {
          setError(
            translate({
              zh_hant: '請輸入評論內容',
              zh_hans: '请输入评论内容',
              lang
            })
          )
        }
      }

      const handleChange = (c: string) => {
        validate(c)
        setContent(c)
      }

      const handleSubmit = () => {
        const input = {
          id: commentId,
          comment: {
            content,
            replyTo: replyToId,
            articleId,
            parentId
            // mentions:
          }
        }

        setSubmitting(true)

        putComment({ variables: { input } })
          .then(({ data }: any) => {
            if (submitCallback) {
              submitCallback()
            }
            setContent('')
            window.dispatchEvent(
              new CustomEvent('addToast', {
                detail: {
                  color: 'green',
                  content: (
                    <Translate zh_hant="評論已送出" zh_hans="评论已送出" />
                  )
                }
              })
            )
          })
          .catch((result: any) => {
            // TODO: Handle error
          })
          .finally(() => {
            setSubmitting(false)
          })
      }

      return (
        <form onSubmit={handleSubmit}>
          <CommentEditor
            content={content}
            placeholder={translate({
              zh_hant: '發表你的評論…',
              zh_hans: '发表你的评论…',
              lang
            })}
            handleChange={handleChange}
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
              {translate({ zh_hant: '送出', zh_hans: '送出', lang })}
            </Button>
          </div>

          <style jsx>{styles}</style>
        </form>
      )
    }}
  </Mutation>
)

export default CommentForm
