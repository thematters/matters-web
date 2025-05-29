import { CardElement } from '@stripe/react-stripe-js'
import type {
  StripeCardElementChangeEvent,
  StripeCardElementOptions,
} from '@stripe/stripe-js'
import React, { useContext } from 'react'
import { FormattedMessage } from 'react-intl'

import { FIELD_ID_STRIPE_CHECKOUT } from '~/common/enums'
import { Form, LanguageContext, Spacer } from '~/components'

import styles from './styles.module.css'

interface StripeCheckoutProps {
  error?: string | React.ReactNode
  onChange: (error: StripeCardElementChangeEvent) => void
}

const FONT_FAMILY = {
  zh_hant:
    '-apple-system, BlinkMacSystemFont, "Helvetica Neue", "Segoe UI", Roboto, Arial, "PingFang TC", "PingFang SC", "Microsoft JhengHei", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
  zh_hans:
    '-apple-system, BlinkMacSystemFont, "Helvetica Neue", "Segoe UI", Roboto, Arial, "PingFang SC", "PingFang TC", "Microsoft YaHei", "Microsoft JhengHei", "WenQuanYi Micro Hei", sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
}

const StripeCheckout: React.FC<StripeCheckoutProps> = ({ error, onChange }) => {
  const { lang } = useContext(LanguageContext)
  const options: StripeCardElementOptions = {
    style: {
      base: {
        color: '#333',
        iconColor: '#ddd',
        lineHeight: '48px',
        fontFamily:
          lang === 'zh_hans' ? FONT_FAMILY.zh_hans : FONT_FAMILY.zh_hant,
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#999c9d',
        },
      },
      invalid: {
        color: '#c85c41',
        iconColor: '#c85c41',
      },
    },
    hidePostalCode: true,
  }
  const fieldId = FIELD_ID_STRIPE_CHECKOUT
  const fieldMsgId = `${fieldId}-msg-checkout`

  return (
    <>
      <Form.Field>
        <Form.Field.Header
          htmlFor={fieldId}
          hasLabel
          label={
            <FormattedMessage
              defaultMessage="Visa / Mastercard / American Express payment"
              description="src/components/Forms/PaymentForm/StripeCheckout/index.tsx"
              id="wicnP9"
            />
          }
        />

        <Form.Field.Content>
          <section className={styles.checkoutInput}>
            <CardElement id={fieldId} options={options} onChange={onChange} />
          </section>
        </Form.Field.Content>

        <Form.Field.Footer fieldMsgId={fieldMsgId} error={error} />
        <Spacer size="sp16" />
        <Form.Field.Footer
          fieldMsgId={fieldMsgId}
          hint={
            <FormattedMessage
              defaultMessage="Payment will be processed by Stripe, allowing your support to be unrestricted by region."
              description="src/components/Forms/PaymentForm/StripeCheckout/index.tsx"
              id="dQhNbF"
            />
          }
        />
      </Form.Field>
    </>
  )
}

export default StripeCheckout
