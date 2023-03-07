import { useContext } from 'react'
import { FormattedMessage } from 'react-intl'

import { GUIDE_LINKS, PATHS } from '~/common/enums'
import { Form, LanguageContext } from '~/components'

const Learn = () => {
  const { lang } = useContext(LanguageContext)

  return (
    <Form.List
      groupName={
        <FormattedMessage defaultMessage="Learn More" description="" />
      }
    >
      <Form.List.Item
        role="link"
        title={<FormattedMessage defaultMessage="About Us" description="" />}
        href={PATHS.ABOUT}
      />
      <Form.List.Item
        role="link"
        title={
          <FormattedMessage defaultMessage="Explore Matters" description="" />
        }
        href={PATHS.GUIDE}
      />
      <Form.List.Item
        role="link"
        title={
          <FormattedMessage defaultMessage="Matters Community" description="" />
        }
        href={PATHS.COMMUNITY}
      />
      <Form.List.Item
        role="link"
        title={
          <FormattedMessage
            defaultMessage="Migrate to Matters"
            description=""
          />
        }
        href={PATHS.MIGRATION}
      />
      <Form.List.Item
        role="link"
        title={
          <FormattedMessage defaultMessage="Term of Services" description="" />
        }
        href={PATHS.TOS}
      />
      <Form.List.Item
        role="link"
        title={
          <FormattedMessage defaultMessage="Download App" description="" />
        }
        href={GUIDE_LINKS.PWA[lang]}
      />
    </Form.List>
  )
}

export default Learn
