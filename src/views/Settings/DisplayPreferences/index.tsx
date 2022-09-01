import { Form, Translate } from '~/components'

import SwitchLanguage from './SwitchLanguage'

const DisplayPreferences = () => {
  return (
    <Form.List groupName={<Translate id="settingsUI" />}>
      <SwitchLanguage />
    </Form.List>
  )
}

export default DisplayPreferences
