import { FormikProps, withFormik } from 'formik'
import gql from 'graphql-tag'
import { useContext } from 'react'

import { Button } from '~/components/Button'
import { Form } from '~/components/Form'
import { Mutation } from '~/components/GQL'
import ARTICLE_COMMENTS from '~/components/GQL/queries/articleComments'
import COMMENT_COMMENTS from '~/components/GQL/queries/commentComments'
import { Icon } from '~/components/Icon'
import { LanguageContext, Translate } from '~/components/Language'
import { ViewerContext } from '~/components/Viewer'

import { translate } from '~/common/utils'
import ICON_POST from '~/static/icons/post.svg?sprite'

import styles from './styles.css'

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
  extraButton?: React.ReactNode
}

interface FormValues {
  content: string
}

interface InnerFormProps {
  extraButton?: React.ReactNode
}

const InnerForm = ({
  values,
  errors,
  touched,
  isSubmitting,
  handleBlur,
  handleChange,
  handleSubmit,
  isValid,
  extraButton
}: InnerFormProps & FormikProps<FormValues>) => {
  const { lang } = useContext(LanguageContext)
  const viewer = useContext(ViewerContext)

  return (
    <form onSubmit={handleSubmit}>
      <Form.Textarea
        field="content"
        placeholder={translate({
          zh_hant: '發表你的評論…',
          zh_hans: '发表你的评论…',
          lang
        })}
        values={values}
        errors={errors}
        touched={touched}
        handleBlur={handleBlur}
        handleChange={handleChange}
      />
      <div className="buttons">
        {extraButton && extraButton}
        <Button
          type="submit"
          bgColor="green"
          disabled={
            isSubmitting || !isValid || !viewer.isAuthed || viewer.isInactive
          }
          icon={<Icon id={ICON_POST.id} viewBox={ICON_POST.viewBox} />}
        >
          {translate({ zh_hant: '送出', zh_hans: '送出', lang })}
        </Button>
      </div>

      <style jsx>{styles}</style>
    </form>
  )
}

const CommentForm = ({
  defaultContent,
  articleMediaHash,
  commentId,
  parentId,
  replyToId,
  articleId,
  submitCallback,
  extraButton
}: CommentFormProps) => {
  const { lang } = useContext(LanguageContext)

  const WrappedForm = withFormik<
    { putComment: any } & Pick<CommentFormProps, 'extraButton'>,
    FormValues
  >({
    mapPropsToValues: () => ({
      content: defaultContent || ''
    }),

    validate: ({ content }) => {
      const errors: { content?: string } = {}

      if (!content || content.length <= 0) {
        errors.content = translate({
          zh_hant: '請輸入評論內容',
          zh_hans: '请输入评论内容',
          lang
        })
      }

      return errors
    },

    handleSubmit: (
      values,
      { resetForm, setSubmitting, props: { putComment } }
    ) => {
      const input = {
        id: commentId,
        comment: {
          content: values.content,
          replyTo: replyToId,
          articleId,
          parentId
          // mentions:
        }
      }

      putComment({ variables: { input } })
        .then(({ data }: any) => {
          if (submitCallback && data.putComment) {
            submitCallback()
            resetForm({ content: '' })
            window.dispatchEvent(
              new CustomEvent('addToast', {
                detail: {
                  color: 'white',
                  content: (
                    <Translate zh_hant="評論已送出" zh_hans="评论已送出" />
                  )
                }
              })
            )
          }
        })
        .catch((result: any) => {
          // TODO: Handle error
        })
        .finally(() => {
          setSubmitting(false)
        })
    }
  })(InnerForm)

  return (
    <Mutation
      mutation={PUT_COMMENT}
      refetchQueries={
        commentId
          ? [
              {
                query: COMMENT_COMMENTS,
                variables: { id: commentId }
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
      {putComment => (
        <WrappedForm putComment={putComment} extraButton={extraButton} />
      )}
    </Mutation>
  )
}

export default CommentForm
