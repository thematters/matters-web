import { Form, Translate } from '~/components'

import SwitchLanguage from './SwitchLanguage'
import ViewMode from './ViewMode'

const UISettings = () => {
  return (
    <Form.List groupName={<Translate id="settingsUI" />}>
      <SwitchLanguage />
      <ViewMode />
    </Form.List>
  )
}

export default UISettings
