import { useContext } from 'react'

import {
  Button,
  TagDialog,
  TextIcon,
  Translate,
  ViewerContext,
} from '~/components'

import { ADD_TOAST } from '~/common/enums'

const CreateButton = () => {
  const viewer = useContext(ViewerContext)

  if (!viewer.isAuthed) {
    return null
  }

  return (
    <TagDialog>
      {({ open }) => (
        <Button
          size={['6rem', '2rem']}
          bgActiveColor="grey-lighter"
          onClick={() => {
            if (viewer.isFrozen) {
              window.dispatchEvent(
                new CustomEvent(ADD_TOAST, {
                  detail: {
                    color: 'red',
                    content: <Translate id="FORBIDDEN_BY_STATE" />,
                  },
                })
              )
              return
            }

            open()
          }}
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
