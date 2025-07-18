import { FormattedMessage, useIntl } from 'react-intl'

import { Switch } from '~/components'

import Box from '../Box'

export type SidebarCanCommentProps = {
  canComment: boolean
  editCanComment: (canComment: boolean) => void
  saving: boolean
}

const SidebarCanComment: React.FC<SidebarCanCommentProps> = (props) => {
  const intl = useIntl()
  const { canComment, editCanComment, saving } = props
  return (
    <Box
      title={
        <FormattedMessage
          defaultMessage="Allow Comments"
          id="+grX8J"
          description="src/components/Editor/Sidebar/CanComment/index.tsx"
        />
      }
      subtitle={
        <FormattedMessage
          defaultMessage="Comments allowed, cannot be closed once published"
          id="gsZ/aj"
          description="src/components/Editor/Sidebar/CanComment/index.tsx"
        />
      }
      rightButton={
        <Switch
          name="allow-comment"
          label={intl.formatMessage({
            defaultMessage: 'Allow Comments',
            description: 'src/components/Editor/Sidebar/CanComment/index.tsx',
            id: '+grX8J',
          })}
          checked={!!canComment}
          onChange={() => editCanComment(!canComment)}
          loading={saving}
        />
      }
    />
  )
}

export default SidebarCanComment
