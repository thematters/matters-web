import { IconShare16, Menu, TextIcon, Translate } from '~/components'

interface ShareButtonProps {
  openDialog: () => void
}

const ShareButton = ({ openDialog }: ShareButtonProps) => {
  return (
    <Menu.Item onClick={openDialog} ariaHasPopup="dialog">
      <TextIcon icon={<IconShare16 size="md" />} size="md" spacing="base">
        <Translate id="shareArticle" />
      </TextIcon>
    </Menu.Item>
  )
}

export default ShareButton
