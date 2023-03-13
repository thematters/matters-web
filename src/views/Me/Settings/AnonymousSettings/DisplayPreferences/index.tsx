import { FormattedMessage } from 'react-intl'

import { Form } from '~/components'

import SwitchLanguage from './SwitchLanguage'

const DisplayPreferences = () => {
  return (
    <Form.List
      groupName={
        <FormattedMessage
          defaultMessage="Display Preferences"
          description="src/views/Me/Settings/AnonymousSettings/DisplayPreferences/index.tsx"
        />
      }
    >
      <SwitchLanguage />
    </Form.List>
  )
}

export default DisplayPreferences
