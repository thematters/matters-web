import { Button, IconExternalLink, TextIcon, Translate } from '~/components'

import { EXTERNAL_LINKS } from '~/common/enums'

const ViewSuperLikeButton = () => {
  return (
    <Button
      htmlHref={EXTERNAL_LINKS.SUPER_LIKE}
      htmlTarget="_blank"
      size={[null, '1.25rem']}
      spacing={[0, 0]}
    >
      <TextIcon
        icon={<IconExternalLink size="xs" color="green" />}
        weight="md"
        textPlacement="left"
      >
        <Translate zh_hant="詳情" zh_hans="详情" />
      </TextIcon>
    </Button>
  )
}

export default ViewSuperLikeButton
