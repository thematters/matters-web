import { withFormik } from 'formik'
import gql from 'graphql-tag'
import { FC, useContext } from 'react'
import { Mutation } from 'react-apollo'

import { Button } from '~/components/Button'
import { Form } from '~/components/Form'
import { Icon } from '~/components/Icon'
import { LanguageContext } from '~/components/Language'

import { translate } from '~/common/utils'
import ICON_POST from '~/static/icons/post.svg?sprite'

import styles from './styles.css'

interface Props {
  articleId: string
  commentId?: string
  replyToId?: string
  parentId?: string
  submitCallback?: () => void
}

export const PUT_COMMENT = gql`
  mutation putComment($input: PutCommentInput!) {
    putComment(input: $input) {
      id
      content
    }
  }
`

const CommentForm: FC<Props> = ({
  articleId,
  commentId,
  replyToId,
  parentId,
  submitCallback
}) => {
  const { lang } = useContext(LanguageContext)

  const BaseForm = ({
    values,
    errors,
    touched,
    isSubmitting,
    handleBlur,
    handleChange,
    handleSubmit
  }: {
    [key: string]: any
  }) => {
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
            style={{ width: 80 }}
            disabled={isSubmitting}
            icon={<Icon id={ICON_POST.id} viewBox={ICON_POST.viewBox} />}
          >
            {translate({ zh_hant: '送出', zh_hans: '送出', lang })}
          </Button>
        </div>

        <style jsx>{styles}</style>
      </form>
    )
  }

  const MainForm: any = withFormik({
    mapPropsToValues: () => ({
      content: ''
    }),

    // validate: ({ content }) => {},

    handleSubmit: (values, { props, setSubmitting }: any) => {
      const { submitAction } = props
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

      submitAction({ variables: { input } })
        .then(({ data }: any) => {
          const { resetPassword } = data
          if (submitCallback && resetPassword) {
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
  })(BaseForm)

  return (
    <>
      <Mutation mutation={PUT_COMMENT}>
        {put => <MainForm submitAction={put} />}
      </Mutation>
      <style jsx>{styles}</style>
    </>
  )
}

export default CommentForm
