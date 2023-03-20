import { FormattedMessage } from 'react-intl'

import { EXTERNAL_LINKS } from '~/common/enums'
import { Button, IconExternalLink16, TextIcon } from '~/components'

const ViewSuperLikeButton = () => {
  return (
    <Button
      htmlHref={EXTERNAL_LINKS.SUPER_LIKE}
      htmlTarget="_blank"
      size={[null, '1.25rem']}
      spacing={[0, 0]}
    >
      <TextIcon
        icon={<IconExternalLink16 size="xs" color="green" />}
        weight="md"
        textPlacement="left"
      >
        <FormattedMessage defaultMessage="More info" description="" />
      </TextIcon>
    </Button>
  )
}

export default ViewSuperLikeButton
