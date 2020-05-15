import { CardElement } from '@stripe/react-stripe-js'
import { StripeCardElementChangeEvent } from '@stripe/stripe-js'
import React, { useContext } from 'react'

import { Form, LanguageContext, Translate } from '~/components'

import styles from './styles.css'

interface CardSectionProps {
  error?: string | React.ReactNode
  onChange: (event: StripeCardElementChangeEvent) => any
}

const FONT_FAMILY = {
  zh_hant:
    '-apple-system, BlinkMacSystemFont, "Helvetica Neue", "Segoe UI", Roboto, Arial, "PingFang TC", "Microsoft YaHei", "Source Han Sans TC", "Noto Sans CJK TC", "WenQuanYi Micro Hei", sans-serif',
  zh_hans:
    '-apple-system, BlinkMacSystemFont, "Helvetica Neue", "Segoe UI", Roboto, Arial, "PingFang TC", "Microsoft YaHei", "Source Han Sans TC", "Noto Sans CJK TC", "WenQuanYi Micro Hei", sans-serif',
}

const CardSection: React.FC<CardSectionProps> = ({ error, onChange }) => {
  const { lang } = useContext(LanguageContext)
  const options = {
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

  return (
    <>
      <Form.Field>
        <Form.Field.Header
          htmlFor="field-checkout"
          label={<Translate zh_hant="信用卡信息" zh_hans="信用卡信息" />}
        />

        <Form.Field.Content>
          <CardElement options={options} onChange={onChange} />
        </Form.Field.Content>

        <Form.Field.Footer
          fieldMsgId="field-msg-checkout"
          hint={
            <Translate
              zh_hant="付款信息由 Stripe 處理，不會被 Matters 儲存。"
              zh_hans="付款信息由 Stripe 处理，不会被 Matters 储存。"
            />
          }
          error={error}
        />
      </Form.Field>

      <style jsx global>
        {styles}
      </style>
    </>
  )
}

export default CardSection
