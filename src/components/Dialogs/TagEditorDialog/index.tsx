import { useState } from 'react'

import { Dialog, useDialogSwitch, useRoute, useStep } from '~/components'

import TagEditorList from './List'
import TagRemoveEditor from './Remove'
import TagSearchSelectEditor from './SearchSelect'

import { TagMaintainers_node_Tag_editors as TagEditor } from '~/components/GQL/queries/__generated__/TagMaintainers'

/**
 * TagEditorDialog is composed of three steps: list, add and remove.
 *
 * Usage:
 *
 * ```tsx
 * <TagEditorDialog>
 *   {({ open })=> (<Component />)}
 * </TagEditorDialog>
 * ```
 */
type Step = 'list' | 'add' | 'remove'

interface Props {
  children: ({ openDialog }: { openDialog: () => void }) => React.ReactNode
}

const BaseDialog = ({ children }: Props) => {
  const defaultStep = 'list'

  const { show, openDialog: baseOpenDialog, closeDialog } = useDialogSwitch(
    true
  )
  const [removeEditor, setRemoveEditor] = useState<TagEditor>()
  const { currStep, forward, reset } = useStep<Step>(defaultStep)

  const openDialog = () => {
    if (currStep !== defaultStep) {
      reset(defaultStep)
    }
    setRemoveEditor(undefined)
    baseOpenDialog()
  }

  const { getQuery } = useRoute()
  const id = getQuery('tagId')

  const isAdd = currStep === 'add'
  const isList = currStep === 'list'
  const isRemove = currStep === 'remove'

  return (
    <>
      {children({ openDialog })}

      <Dialog size="sm" isOpen={show} onDismiss={closeDialog} fixedHeight>
        {isList && (
          <TagEditorList
            id={id}
            closeDialog={closeDialog}
            toAddStep={() => forward('add')}
            toRemoveStep={(editor: TagEditor) => {
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
