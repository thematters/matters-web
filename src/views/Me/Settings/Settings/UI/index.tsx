import { Form, Translate } from '~/components'

import SwitchLanguage from './SwitchLanguage'

const UISettings = () => {
  return (
    <Form.List groupName={<Translate id="settingsUI" />}>
      <SwitchLanguage />
    </Form.List>
  )
}

export default UISettings
