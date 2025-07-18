import { FormattedMessage, useIntl } from 'react-intl'

import { Switch } from '~/components'

import Box from '../Box'

export type SidebarIndentProps = {
  indented: boolean
  toggleIndent: (indented: boolean) => void
  indentSaving: boolean
}

const SidebarIndent: React.FC<SidebarIndentProps> = ({
  indented,
  toggleIndent,
  indentSaving,
}) => {
  const intl = useIntl()

  return (
    <Box
      title={<FormattedMessage defaultMessage="Paragraph Indent" id="uOUCWK" />}
      subtitle={
        <FormattedMessage
          defaultMessage="Indent the beginning of paragraph text"
          id="cpYr3r"
        />
      }
      rightButton={
        <Switch
          name="indent"
          label={intl.formatMessage({
            defaultMessage: 'Paragraph Indent',
            id: 'uOUCWK',
          })}
          checked={!!indented}
          onChange={() => toggleIndent(!indented)}
          loading={indentSaving}
        />
      }
    />
  )
}

export default SidebarIndent
