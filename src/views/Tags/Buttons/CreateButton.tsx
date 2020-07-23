import { useContext } from 'react'

import { Button, TagDialog, TextIcon, Translate, ViewerContext } from '~/components'

const CreateButton = () => {
  const viewer = useContext(ViewerContext)

  if (!viewer.id) {
    return null
  }
  return (
    <TagDialog>
      {({ open }) => (
        <Button
          size={[null, '1.5rem']}
          spacing={[0, 'xtight']}
          bgActiveColor="grey-lighter"
          onClick={open}
        >
          <TextIcon color="green" size="md" weight="md">
            <Translate id="createTag" />
          </TextIcon>
        </Button>
      )}
    </TagDialog>
  )
}

export default CreateButton
