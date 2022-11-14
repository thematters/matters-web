import { Form, Translate } from '~/components'

import CurrencyConvertor from './CurrencyConvertor'
import SwitchLanguage from './SwitchLanguage'

const UISettings = () => {
  return (
    <Form.List groupName={<Translate id="settingsUI" />}>
      <SwitchLanguage />
      <CurrencyConvertor />
    </Form.List>
  )
}

export default UISettings
