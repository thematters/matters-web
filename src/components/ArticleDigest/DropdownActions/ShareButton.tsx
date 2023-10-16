import { IconShare16, Menu, Translate } from '~/components'

interface ShareButtonProps {
  openDialog: () => void
}

const ShareButton = ({ openDialog }: ShareButtonProps) => {
  return (
    <Menu.Item
      text={<Translate id="shareArticle" />}
      icon={<IconShare16 size="mdS" />}
      onClick={openDialog}
      ariaHasPopup="dialog"
    />
  )
}

export default ShareButton
