import { FormattedMessage, useIntl } from 'react-intl'

import IconIndent from '@/public/static/icons/24px/indent.svg'
import { Icon, Switch } from '~/components'

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
      icon={<Icon icon={IconIndent} size={24} />}
      title={<FormattedMessage defaultMessage="Paragraph indent" id="0r2yd+" />}
      rightButton={
        <Switch
          name="indent"
          label={intl.formatMessage({
            defaultMessage: 'Paragraph indent',
            id: '0r2yd+',
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
