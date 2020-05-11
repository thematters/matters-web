import { useFormik } from 'formik'
import _pickBy from 'lodash/pickBy'
import { useContext, useState } from 'react'

import {
  Button,
  Dialog,
  Form,
  LanguageContext,
  Translate,
  ViewerContext,
} from '~/components'
import { useMutation } from '~/components/GQL'
import PAY_TO from '~/components/GQL/mutations/payTo'

import {
  OPEN_LIKE_COIN_DIALOG,
  PAYMENT_CURRENCY as CURRENCY,
} from '~/common/enums'
import {
  translate,
  validateCurrency,
  validateDonationAmount,
} from '~/common/utils'

import styles from './styles.css'

import { UserDonationRecipient } from '~/components/Dialogs/DonationDialog/__generated__/UserDonationRecipient'
import {
  PayTo as PayToMutate,
  PayTo_payTo as PayToResult,
} from '~/components/GQL/mutations/__generated__/PayTo'

type SetAmountCallbackValues = {
  amount: number
  currency: CURRENCY
} & Partial<Omit<PayToResult, '__typename'>>

interface FormProps {
  close: () => void
  recipient: UserDonationRecipient
  submitCallback: (values: SetAmountCallbackValues) => void
  targetId: string
}

interface FormValues {
  amount: number
  currency: CURRENCY
}

interface NoLikerId {
  canGetLike: boolean
  canPayLike: boolean
}

const NoLikerIdMessage = ({ canGetLike, canPayLike }: NoLikerId) => {
  if (!canPayLike) {
    return (
      <Translate
        zh_hant="請先綁定 LikerID， 才能用 LikeCoin 支持作者"
        zh_hans="请先绑定 LikerID， 才能用 LikeCoin 支持作者"
      />
    )
  }
  if (!canGetLike) {
    return (
      <Translate
        zh_hant="作者還沒有綁定 LikerID，你還不能用 LikeCoin 支持他"
        zh_hans="作者还没有绑定 LikerID，你还不能用 LikeCoin 支持他"
      />
    )
  }
  return null
}

const NoLikerIdButton = ({
  canGetLike,
  canPayLike,
  close,
  setFieldValue,
}: NoLikerId & {
  close: () => void
  setFieldValue: (field: string, value: any) => void
}) => {
  if (!canPayLike) {
    return (
      <Dialog.Footer.Button
        type="button"
        bgColor="green"
        textColor="white"
        onClick={() => {
          window.dispatchEvent(new CustomEvent(OPEN_LIKE_COIN_DIALOG, {}))
          close()
        }}
      >
        <Translate zh_hant="綁定 LikeID" zh_hans="綁定 LikeID" />
      </Dialog.Footer.Button>
    )
  }
  if (!canGetLike) {
    return (
      <Dialog.Footer.Button
        type="button"
        bgColor="green"
        textColor="white"
        onClick={() => setFieldValue('currency', CURRENCY.HKD)}
      >
        <Translate zh_hant="使用港幣支持" zh_hans="使用港币支持" />
      </Dialog.Footer.Button>
    )
  }
  return null
}

const SetAmount: React.FC<FormProps> = ({
  close,
  recipient,
  submitCallback,
  targetId,
}) => {
  const defaultHKDAmount = 5
  const defaultLikeAmount = 160
  const formId = 'pay-to-set-amount-form'

  const viewer = useContext(ViewerContext)
  const { lang } = useContext(LanguageContext)
  const [fixed, setFixed] = useState<boolean>(true)
  const [payTo] = useMutation<PayToMutate>(PAY_TO)

  const {
    errors,
    handleBlur,
    handleSubmit,
    isValid,
    isSubmitting,
    setFieldValue,
    touched,
    values,
  } = useFormik<FormValues>({
    initialValues: {
      amount: defaultLikeAmount,
      currency: CURRENCY.LIKE,
    },
    validate: ({ amount, currency }) =>
      _pickBy({
        amount: validateDonationAmount(amount, lang),
        currency: validateCurrency(currency, lang),
      }),
    onSubmit: async ({ amount, currency }, { setSubmitting }) => {
      try {
        switch (currency) {
          case CURRENCY.LIKE:
            const result = await payTo({
              variables: {
                amount,
                currency,
                purpose: 'donation',
                recipientId: recipient.id,
                targetId,
              },
            })

            const redirectUrl = result?.data?.payTo.redirectUrl
            const transaction = result?.data?.payTo.transaction
            if (!redirectUrl || !transaction) {
              throw new Error()
            }
            setSubmitting(false)
            submitCallback({ amount, currency, redirectUrl, transaction })
            break
          case CURRENCY.HKD:
            setSubmitting(false)
            submitCallback({ amount, currency })
            break
        }
      } catch (error) {
        setSubmitting(false)
      }
    },
  })

  const isHKD = values.currency === CURRENCY.HKD
  const isLike = values.currency === CURRENCY.LIKE
  const canGetLike = isLike && !!recipient.liker.likerId
  const canPayLike = isLike && !!viewer.liker.likerId
  const canProcess = isHKD || (canGetLike && canPayLike)
  const color = isLike ? 'green' : 'red'

  const InnerForm = (
    <Form id={formId} onSubmit={handleSubmit} noBackground>
      <Form.CurrencyRadioInput
        isLike={isLike}
        name="currency"
        value={values.currency}
        error={touched.currency && errors.currency}
        onBlur={handleBlur}
        onChange={(e) => {
          const raw = (e.target.value || '') as keyof typeof CURRENCY
          const value = CURRENCY[raw]
          if (value) {
            setFieldValue('currency', value)
            setFieldValue(
              'amount',
              value === CURRENCY.LIKE ? defaultLikeAmount : defaultHKDAmount
            )
          }
        }}
      />

      {fixed && canProcess && (
        <Form.AmountRadioInput
          currency={values.currency}
          isLike={isLike}
          name="amount"
          value={values.amount}
          error={touched.amount && errors.amount}
          onBlur={handleBlur}
          onChange={(e) => {
            const value = parseInt(e.target.value, 10) || 0
            setFieldValue('amount', value)
          }}
        />
      )}

      {!fixed && canProcess && (
        <Form.AmountInput
          autoFocus
          required
          className={isHKD ? 'red-style' : undefined}
          fixedPlaceholder={values.currency}
          name="amount"
          min={0}
          value={values.amount}
          error={touched.amount && errors.amount}
          onBlur={handleBlur}
          onChange={(e) => {
            const value = e.target.valueAsNumber || 0
            const sanitizedAmount = Math.min(Math.floor(value))
            setFieldValue('amount', sanitizedAmount)
          }}
        />
      )}

      {canProcess && (
        <section className="set-amount-other">
          <Button
            textColor={color}
            onClick={() => {
              // reset default fixed amount
              if (fixed === false) {
                setFieldValue(
                  'amount',
                  isLike ? defaultLikeAmount : defaultHKDAmount
                )
              }
              setFixed(!fixed)
            }}
          >
            {fixed
              ? translate({ zh_hant: '其他金額', zh_hans: '其他金額', lang })
              : translate({ zh_hant: '固定金額', zh_hans: '固定金額', lang })}
          </Button>
        </section>
      )}

      {!canProcess && (
        <section className="set-amount-no-liker-id">
          <NoLikerIdMessage canGetLike={canGetLike} canPayLike={canPayLike} />
        </section>
      )}
      <style jsx>{styles}</style>
    </Form>
  )

  return (
    <>
      <Dialog.Content hasGrow>
        <section>
          {InnerForm}

          {!isLike && (
            <section className="set-amount-fee">
              <Translate id="fee" />
            </section>
          )}

          <style jsx>{styles}</style>
        </section>
      </Dialog.Content>

      <Dialog.Footer>
        {canProcess && (
          <Dialog.Footer.Button
            type="submit"
            form={formId}
            disabled={!isValid || isSubmitting}
            bgColor={color}
            textColor="white"
            loading={isSubmitting}
          >
            <Translate id="nextStep" />
          </Dialog.Footer.Button>
        )}
        {!canProcess && (
          <NoLikerIdButton
            canGetLike={canGetLike}
            canPayLike={canPayLike}
            close={close}
            setFieldValue={setFieldValue}
          />
        )}
      </Dialog.Footer>
    </>
  )
}

export default SetAmount
