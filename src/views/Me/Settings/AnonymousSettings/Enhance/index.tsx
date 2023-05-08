import { FormattedMessage } from 'react-intl'

import { EXTERNAL_LINKS } from '~/common/enums'
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
        href={EXTERNAL_LINKS.DEVELOPER_RESOURCE}
      />
      <Form.List.Item
        role="link"
        title={<FormattedMessage defaultMessage="Bug Bounty" description="" />}
        href={EXTERNAL_LINKS.SECURITY_LINK}
      />
    </Form.List>
  )
}

export default Enhance
