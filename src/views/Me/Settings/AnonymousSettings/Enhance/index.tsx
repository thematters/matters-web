import { FormattedMessage } from 'react-intl'

import { Form } from '~/components'

const Enhance = () => {
  return (
    <Form.List
      groupName={
        <FormattedMessage
          defaultMessage="Build Together"
          description="src/views/Me/Settings/AnonymousSettings/Enhance/index.tsx"
        />
      }
    >
      <Form.List.Item
        role="link"
        title={<FormattedMessage defaultMessage="Open Source" description="" />}
        href="https://github.com/thematters/developer-resource"
      />
      <Form.List.Item
        role="link"
        title={<FormattedMessage defaultMessage="Bug Bounty" description="" />}
        href="https://github.com/thematters/developer-resource/blob/master/SECURITY.md"
      />
    </Form.List>
  )
}

export default Enhance
