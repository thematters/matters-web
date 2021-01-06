import { useFormik } from 'formik'
import _pickBy from 'lodash/pickBy'
import { useContext, useRef } from 'react'

import { Dialog, Form, LanguageContext, Layout, Translate } from '~/components'
import { useMutation } from '~/components/GQL'
import PUT_CIRCLE from '~/components/GQL/mutations/putCircle'

import {
  parseFormSubmitErrors,
  translate,
  validateCircleAmount,
  validateCircleDisplayName,
  validateCircleName,
} from '~/common/utils'

import {
  PAYMENT_CURRENCY,
  PAYMENT_MAXIMUM_CIRCLE_AMOUNT,
  PAYMENT_MINIMAL_CIRCLE_AMOUNT,
} from '@/src/common/enums'

import styles from './styles.css'

import {
  PutCircle,
  PutCircle_putCircle,
} from '~/components/GQL/mutations/__generated__/PutCircle'

interface FormProps {
  purpose: 'dialog' | 'page'
  submitCallback: (circle: PutCircle_putCircle) => void
  closeDialog?: () => void
}

interface FormValues {
  name: string
  displayName: string
  amount: number
}

const Init: React.FC<FormProps> = ({
  purpose,
  submitCallback,
  closeDialog,
}) => {
  const [create] = useMutation<PutCircle>(PUT_CIRCLE)
  const { lang } = useContext(LanguageContext)
  const inputRef: React.RefObject<any> | null = useRef(null)
  // const isInDialog = purpose === 'dialog'
  const isInPage = purpose === 'page'
  const formId = 'create-circle-init-form'

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
    isSubmitting,
    isValid,
  } = useFormik<FormValues>({
    initialValues: {
      name: '',
      displayName: '',
      amount: 0,
    },
    validate: ({ name, displayName, amount }) =>
      _pickBy({
        name: validateCircleName(name, lang),
        displayName: validateCircleDisplayName(displayName, lang),
        amount: validateCircleAmount(amount, lang),
      }),
    onSubmit: async (
      { name, displayName, amount },
      { setFieldError, setSubmitting }
    ) => {
      try {
        const { data } = await create({
          variables: { input: { name, displayName, amount } },
        })
        const circle = data?.putCircle

        setSubmitting(false)

        if (circle) {
          submitCallback(circle)
        }
      } catch (error) {
        setSubmitting(false)

        const [messages, codes] = parseFormSubmitErrors(error, lang)
        setFieldError('name', messages[codes[0]])
      }
    },
  })

  const InnerForm = (
    <Form id={formId} onSubmit={handleSubmit}>
      <Form.Input
        label={<Translate zh_hant="圍爐名稱" zh_hans="围炉名称" />}
        type="text"
        name="displayName"
        required
        placeholder={translate({
          zh_hant: '給圍爐取一個吸引人的名字吧',
          zh_hans: '给围炉取一个吸引人的名字吧',
          lang,
        })}
        value={values.displayName}
        error={touched.displayName && errors.displayName}
        onBlur={handleBlur}
        onChange={handleChange}
      />

      <section className="displayNameInput">
        <Form.Input
          label={
            <Translate
              zh_hant="設置圍爐網址（創建後不可修改）"
              zh_hans="设置围炉网址（创建后不可修改）"
            />
          }
          type="text"
          name="name"
          required
          placeholder={translate({
            zh_hant: '自定義網址名稱',
            zh_hans: '自定义网址名称',
            lang,
          })}
          value={values.name}
          error={touched.name && errors.name}
          onBlur={handleBlur}
          onChange={handleChange}
          autoFocus
        />

        <style jsx>{styles}</style>
      </section>

      <Form.AmountInput
        autoFocus
        required
        min={PAYMENT_MINIMAL_CIRCLE_AMOUNT.HKD}
        max={PAYMENT_MAXIMUM_CIRCLE_AMOUNT.HKD}
        currency={PAYMENT_CURRENCY.HKD}
        label={
          <Translate
            zh_hant="設定圍爐門檻（每月）"
            zh_hans="设定围炉门槛（每月）"
          />
        }
        name="amount"
        value={values.amount}
        error={touched.amount && errors.amount}
        onBlur={handleBlur}
        onChange={(e) => {
          const value = e.target.valueAsNumber || 0
          const sanitizedAmount = Math.abs(Math.max(Math.floor(value), 0))
          if (inputRef.current) {
            inputRef.current.value = sanitizedAmount
          }
          setFieldValue('amount', sanitizedAmount)
        }}
        ref={inputRef}
      />
    </Form>
  )

  const SubmitButton = (
    <Dialog.Header.RightButton
      type="submit"
      form={formId}
      disabled={!isValid || isSubmitting}
      text={<Translate id="nextStep" />}
      loading={isSubmitting}
    />
  )

  if (isInPage) {
    return (
      <>
        <Layout.Header
          left={<Layout.Header.BackButton />}
          right={
            <>
              <Layout.Header.Title id="circleCreation" />
              {SubmitButton}
            </>
          }
        />
        {InnerForm}
      </>
    )
  }

  return (
    <>
      {closeDialog && (
        <Dialog.Header
          title="circleCreation"
          close={closeDialog}
          rightButton={SubmitButton}
        />
      )}

      <Dialog.Content hasGrow>{InnerForm}</Dialog.Content>
    </>
  )
}

export default Init
