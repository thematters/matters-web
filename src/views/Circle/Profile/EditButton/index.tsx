import { Button, TextIcon, Translate, useFeatures } from '~/components'

import { toPath } from '~/common/utils'

interface EditButtonProps {
  circle: { name: string }
}

const EditButton = ({ circle }: EditButtonProps) => {
  const features = useFeatures()

  if (!features.circle_management) {
    return null
  }

  return (
    <Button
      size={['6rem', '2rem']}
      textColor="green"
      textActiveColor="white"
      bgActiveColor="green"
      borderColor="green"
      {...toPath({ page: 'circleSettings', circle })}
    >
      <TextIcon weight="md" size="md-s">
        <Translate id="editCircle" />
      </TextIcon>
    </Button>
  )
}

export default EditButton
