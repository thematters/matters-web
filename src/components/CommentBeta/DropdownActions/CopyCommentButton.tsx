import { FormattedMessage } from 'react-intl'

import { ReactComponent as IconCopy } from '@/public/static/icons/24px/copy.svg'
import { CopyToClipboard, Icon, Menu } from '~/components'

const CopyCommentButton = ({ content }: { content: string }) => {
  return (
    <CopyToClipboard text={content} type="html">
      {({ copyToClipboard }) => (
        <Menu.Item
          text={<FormattedMessage defaultMessage="Copy comment" id="eY3YIa" />}
          icon={<Icon icon={IconCopy} size="mdS" />}
          onClick={copyToClipboard}
        />
      )}
    </CopyToClipboard>
  )
}

export default CopyCommentButton
