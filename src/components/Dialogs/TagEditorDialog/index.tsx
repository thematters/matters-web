import { useState } from 'react'

import {
  Dialog,
  useDialogSwitch, // useRoute,
  useStep,
} from '~/components'
import { TagMaintainersQuery } from '~/gql/graphql'

import TagEditorList from './List'
import TagRemoveEditor from './Remove'
import TagSearchSelectEditor from './SearchSelect'

/**
 * TagEditorDialog is composed of three steps: list, add and remove.
 *
 * Usage:
 *
 * ```tsx
 * <TagEditorDialog>
 *   {({ openDialog })=> (<Component />)}
 * </TagEditorDialog>
 * ```
 */
type Step = 'list' | 'add' | 'remove'

type TagMaintainersNodeTagEditor = NonNullable<
  NonNullable<TagMaintainersQuery['node'] & { __typename: 'Tag' }>['editors']
>[0]

interface Props {
  id: string
  children: ({ openDialog }: { openDialog: () => void }) => React.ReactNode
}

const BaseDialog = ({ id, children }: Props) => {
  const defaultStep = 'list'

  const {
    show,
    openDialog: baseOpenDialog,
    closeDialog,
  } = useDialogSwitch(true)
  const [removeEditor, setRemoveEditor] =
    useState<TagMaintainersNodeTagEditor>()
  const { currStep, forward, reset } = useStep<Step>(defaultStep)

  const openDialog = () => {
    if (currStep !== defaultStep) {
      reset(defaultStep)
    }
    setRemoveEditor(undefined)
    baseOpenDialog()
  }

  const isAdd = currStep === 'add'
  const isList = currStep === 'list'
  const isRemove = currStep === 'remove'

  return (
    <>
      {children({ openDialog })}

      <Dialog isOpen={show} onDismiss={closeDialog}>
        {isList && (
          <TagEditorList
            id={id}
            closeDialog={closeDialog}
            toAddStep={() => forward('add')}
            toRemoveStep={(editor: TagMaintainersNodeTagEditor) => {
              setRemoveEditor(editor)
              forward('remove')
            }}
          />
        )}

        {isAdd && (
          <TagSearchSelectEditor
            id={id}
            closeDialog={closeDialog}
            toListStep={() => forward('list')}
          />
        )}

        {isRemove && removeEditor && (
          <TagRemoveEditor
            id={id}
            editor={removeEditor}
            closeDialog={closeDialog}
          />
        )}
      </Dialog>
    </>
  )
}

export const TagEditorDialog = (props: Props) => (
  <Dialog.Lazy mounted={<BaseDialog {...props} />}>
    {({ openDialog }) => <>{props.children({ openDialog })}</>}
  </Dialog.Lazy>
)
