import { useContext } from 'react'

import { Button, TextIcon, Translate, ViewerContext } from '~/components'

import { OPEN_LIKE_COIN_DIALOG } from '~/common/enums'

import { PublishDialog } from './PublishDialog'

const PublishButton = ({
  open,
  disabled,
}: {
  open: () => void
  disabled?: boolean
}) => (
  <Button
    size={['4rem', '2rem']}
    bgColor="green"
    onClick={open}
    disabled={disabled}
    aria-haspopup="true"
  >
    <TextIcon color="white" size="md" weight="md">
      <Translate id="publish" />
    </TextIcon>
  </Button>
)

const PublishButtonWithEffect = ({ disabled }: { disabled?: boolean }) => {
  const viewer = useContext(ViewerContext)

  if (!viewer.shouldSetupLikerID) {
    return (
      <PublishDialog>
        {({ open }) => <PublishButton open={open} disabled={disabled} />}
      </PublishDialog>
    )
  }

  return (
    <PublishButton
      open={() =>
        window.dispatchEvent(new CustomEvent(OPEN_LIKE_COIN_DIALOG, {}))
      }
      disabled={disabled}
    />
  )
}

export default PublishButtonWithEffect
