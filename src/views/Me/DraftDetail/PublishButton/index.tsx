import { useContext } from 'react'

import {
  Button,
  LikeCoinDialog,
  TextIcon,
  Translate,
  ViewerContext,
} from '~/components'

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
    <LikeCoinDialog>
      {({ open }) => <PublishButton open={open} disabled={disabled} />}
    </LikeCoinDialog>
  )
}

export default PublishButtonWithEffect
