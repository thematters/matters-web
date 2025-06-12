import { Editor, Node } from '@tiptap/core'

/**
 * A extension to handle custom shortcuts like "control + enter" to submit the form.
 */

type CustomShortcutsOptions = {
  onModEnter: ({ editor }: { editor: Editor }) => void
  onShiftEnter: ({ editor }: { editor: Editor }) => void
}

const pluginName = 'customShortcuts'

export const CustomShortcuts = Node.create<CustomShortcutsOptions>({
  name: pluginName,

  priority: 1000,

  addKeyboardShortcuts() {
    return {
      'Mod-Enter': ({ editor }) => {
        if (this.options.onModEnter) {
          this.options.onModEnter({ editor })
        }
        return true
      },
      'Shift-Enter': ({ editor }) => {
        if (this.options.onShiftEnter) {
          this.options.onShiftEnter({ editor })
        }
        return true
      },
    }
  },
})
