import { FormikProps, withFormik } from 'formik'
import gql from 'graphql-tag'
import { useContext } from 'react'
import { Mutation } from 'react-apollo'

import { Button } from '~/components/Button'
import { Form } from '~/components/Form'
import { Icon } from '~/components/Icon'
import { LanguageContext } from '~/components/Language'

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
  articleId: string
  commentId?: string
  replyToId?: string
  parentId?: string
  submitCallback?: () => void
}

interface FormValues {
  content: string
}

const InnerForm = ({
  values,
  errors,
  touched,
  isSubmitting,
  handleBlur,
  handleChange,
  handleSubmit,
  isValid
}: FormikProps<FormValues>) => {
  const { lang } = useContext(LanguageContext)

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
        <Button
          type="submit"
          bgColor="green"
          disabled={isSubmitting || !isValid}
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
  commentId,
  parentId,
  replyToId,
  submitCallback,
  articleId
}: CommentFormProps) => {
  const { lang } = useContext(LanguageContext)

  const WrappedForm = withFormik<{ putComment: any }, FormValues>({
    mapPropsToValues: () => ({
      content: ''
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

    handleSubmit: (values, { setSubmitting, props: { putComment } }) => {
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
    <Mutation mutation={PUT_COMMENT}>
      {putComment => <WrappedForm putComment={putComment} />}
    </Mutation>
  )
}

export default CommentForm
