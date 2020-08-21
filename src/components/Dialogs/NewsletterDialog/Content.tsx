import { useFormik } from 'formik'
import fetch from 'isomorphic-unfetch'
import _pickBy from 'lodash/pickBy'
import { useContext } from 'react'

import { Dialog, Form, LanguageContext, Translate, useStep } from '~/components'

import { translate } from '~/common/utils'

import styles from './styles.css'

interface NewsletterDialogContentProps {
  closeDialog: () => void
}

interface FormValues {
  email: string
  name: string
}

type Step = 'subscribe' | 'complete' | 'retry'

const EMAIL_API =
  'https://api-backend.app.newsleopard.com/api/contacts/subscribe/40280ba0715a279e017177f6130c03eb/verify'

const isInvalid = (value: string, lang: Language) => {
  if (!value || value.length === 0) {
    return translate({ id: 'required', lang })
  }
}

const NewsletterDialogContent: React.FC<NewsletterDialogContentProps> = ({
  closeDialog,
}) => {
  const { lang } = useContext(LanguageContext)
  const { currStep, forward } = useStep<Step>('subscribe')
  const isSubscribe = currStep === 'subscribe'
  const isComplete = currStep === 'complete'
  const isRetry = currStep === 'retry'

  const formId = 'email-form'

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    isValid,
    isSubmitting,
  } = useFormik<FormValues>({
    initialValues: {
      email: '',
      name: '',
    },
    validate: ({ email, name }) =>
      _pickBy({
        email: isInvalid(email, lang),
        name: isInvalid(name, lang),
      }),
    onSubmit: async ({ email, name }, { setFieldError, setSubmitting }) => {
      try {
        const data = new URLSearchParams()
        data.append('email', email)
        data.append('name', name)

        await fetch(EMAIL_API, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: data,
        })

        setSubmitting(false)
        forward('complete')
      } catch (error) {
        setSubmitting(false)
        forward('retry')
      }
    },
  })

  const InnerForm = (
    <Form id={formId} onSubmit={handleSubmit}>
      <Form.Input
        label="姓名"
        type="text"
        name="name"
        placeholder={translate({
          zh_hant: '請輸入姓名',
          zh_hans: '请输入姓名',
          lang,
        })}
        value={values.name}
        error={touched.name && errors.name}
        onBlur={handleBlur}
        onChange={handleChange}
        required
      />

      <Form.Input
        label={<Translate id="email" />}
        type="email"
        name="email"
        placeholder={translate({ id: 'enterEmail', lang })}
        value={values.email}
        error={touched.email && errors.email}
        onBlur={handleBlur}
        onChange={handleChange}
        required
      />
    </Form>
  )

  const SubmitButton = (
    <Dialog.Header.RightButton
      text={<Translate zh_hant="訂閱" zh_hans="订阅" />}
      type="submit"
      form={formId}
      disabled={!isValid || isSubmitting}
      loading={isSubmitting}
    />
  )

  return (
    <>
      <Dialog.Header
        title={
          <Translate zh_hant="訂閱 Matters 通訊" zh_hans="订阅 Matters 通讯" />
        }
        close={closeDialog}
        rightButton={isSubscribe ? SubmitButton : null}
      />
      <Dialog.Content
        spacing={isSubscribe ? [0, 0] : ['base', 'xloose']}
        hasGrow
      >
        {isSubscribe && InnerForm}
        {isComplete && (
          <>
            <p className="title">
              <Translate zh_hant="訂閱服務確認" zh_hans="订阅服务确认" />
            </p>
            <p className="description">
              <Translate
                zh_hant="已發送驗證信給你，請點擊信件連結完成訂閱程序。"
                zh_hans="已发送验证信给你，请点击信件链接完成订阅程序。"
              />
            </p>
          </>
        )}
        {isRetry && (
          <>
            <p className="title">
              <Translate zh_hant="訂閱失敗" zh_hans="订阅失败" />
            </p>
            <p className="description">
              <Translate
                zh_hant="暫時無法接受訂閱，請稍候重新嘗試。"
                zh_hans="暂时无法接受订阅，请稍候重新尝试。"
              />
            </p>
          </>
        )}
      </Dialog.Content>
      <style jsx>{styles}</style>
    </>
  )
}

export default NewsletterDialogContent
