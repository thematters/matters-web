import React from 'react'
import { FormattedMessage } from 'react-intl'

import { Form, Translate } from '~/components'

import styles from './styles.module.css'

const Forms = () => (
  <section className={styles.container}>
    <ul>
      {/* Form.Input */}
      <li>
        <Form>
          <Form.Input
            label={<FormattedMessage defaultMessage="Email" id="sy+pv5" />}
            type="email"
            name="email"
            required
            placeholder="Enter email"
          />

          <Form.Input
            label={<FormattedMessage defaultMessage="Password" id="5sg7KC" />}
            type="password"
            name="password"
            required
            placeholder="Enter password"
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
            hint={
              <FormattedMessage
                defaultMessage="Enter a 6-digit payment password."
                id="OpeFTV"
              />
            }
            onChange={() => null}
          />
        </Form>
      </li>

      {/* Form.Textarea */}
      <li>
        <Form>
          <Form.Textarea
            label={
              <FormattedMessage defaultMessage="Description" id="Q8Qw5B" />
            }
            name="newDescription"
            placeholder="Enter description"
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
        <Form.Select<number>
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
                {value} <FormattedMessage defaultMessage="days" id="Bc20la" />
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
