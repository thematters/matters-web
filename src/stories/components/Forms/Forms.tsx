import React from 'react'

import { translate } from '~/common/utils'
import { Form, Translate } from '~/components'

import styles from './styles.module.css'

const Forms = () => (
  <section className={styles.container}>
    <ul>
      {/* Form.Input */}
      <li>
        <Form>
          <Form.Input
            label={<Translate id="email" />}
            type="email"
            name="email"
            required
            placeholder={translate({ id: 'enterEmail', lang: 'zh_hant' })}
          />

          <Form.Input
            label={<Translate id="password" />}
            type="password"
            name="password"
            required
            placeholder={translate({ id: 'enterPassword', lang: 'zh_hant' })}
          />
        </Form>
      </li>

      {/* Form.PinInput */}
      <li>
        <Form>
          <Form.PinInput
            length={6}
            value=""
            name="password"
            hint={<Translate id="hintPaymentPassword" />}
            onChange={() => null}
          />
        </Form>
      </li>

      {/* Form.Textarea */}
      <li>
        <Form>
          <Form.Textarea
            label={<Translate id="tagDescription" />}
            name="newDescription"
            placeholder={translate({
              id: 'tagDescriptionPlaceholder',
              lang: 'zh_hant',
            })}
          />
        </Form>
      </li>

      {/* Form.CheckBox */}
      <li>
        <Form.CheckBox
          name="tos"
          hint={
            <Translate
              zh_hant="我已閱讀並同意"
              zh_hans="我已阅读并同意"
              en="I have read and agree to"
            />
          }
          required
        />
      </li>

      {/* Form.Select */}
      <li>
        <Form.Select
          name="select-period"
          onChange={() => null}
          label={
            <Translate
              zh_hant="免費資格時長"
              zh_hans="免费资格时长"
              en="Free trial period"
            />
          }
          options={[30, 90, 180, 360].map((value) => ({
            name: (
              <>
                {value} <Translate id="days" />
              </>
            ),
            value,
            selected: 30 === value,
          }))}
        />
      </li>
    </ul>
  </section>
)

export default Forms
