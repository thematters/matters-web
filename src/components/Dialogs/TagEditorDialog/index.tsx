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
  children: ({ open }: { open: () => void }) => React.ReactNode
}

const BaseDialog = ({ children }: Props) => {
  const defaultStep = 'list'

  const { show, open: baseOpen, close } = useDialogSwitch(true)
  const [removeEditor, setRemoveEditor] = useState<TagEditor>()
  const { currStep, forward, reset } = useStep<Step>(defaultStep)

  const open = () => {
    if (currStep !== defaultStep) {
      reset(defaultStep)
    }
    setRemoveEditor(undefined)
    baseOpen()
  }

  const { getQuery } = useRoute()
  const id = getQuery('tagId')

  const isAdd = currStep === 'add'
  const isList = currStep === 'list'
  const isRemove = currStep === 'remove'

  return (
    <>
      {children({ open })}

      <Dialog size="sm" isOpen={show} onDismiss={close} fixedHeight>
        {isList && (
          <TagEditorList
            id={id}
            close={close}
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
            close={close}
            toListStep={() => forward('list')}
          />
        )}

        {isRemove && removeEditor && (
          <TagRemoveEditor id={id} editor={removeEditor} close={close} />
        )}
      </Dialog>
    </>
  )
}

export const TagEditorDialog = (props: Props) => (
  <Dialog.Lazy mounted={<BaseDialog {...props} />}>
    {({ open }) => <>{props.children({ open })}</>}
  </Dialog.Lazy>
)
