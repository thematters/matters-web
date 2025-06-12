import { NodeViewProps, NodeViewWrapper } from '@tiptap/react'
import { useEffect, useRef } from 'react'

import { KEYVALUE } from '~/common/enums'
import { isUrl } from '~/common/utils'

const Input: React.FC<NodeViewProps> = (props) => {
  const inputRef: React.RefObject<HTMLInputElement> = useRef(null)

  const { placeholder } = props.node.attrs

  const deleteInput = ({
    isRestoreParagraph,
  }: {
    isRestoreParagraph?: boolean
  }) => {
    try {
      props.deleteNode()
    } catch {
      // do nothing
    }

    // restore paragraph node
    if (isRestoreParagraph) {
      props.editor.commands.insertContentAt(props.editor.state.selection.to, [
        { type: 'paragraph' },
      ])
    }

    props.editor.commands.focus()
  }

  useEffect(() => {
    if (inputRef) {
      setTimeout(() => {
        inputRef.current?.focus()
      }, 0)
    }
  }, [])

  return (
    <NodeViewWrapper className="figure-embed-link-input">
      <input
        ref={inputRef}
        type="text"
        placeholder={placeholder}
        // FIXME: repetitive deleteInput with onEnter
        // onBlur={() => {
        // deleteInput({ isRestoreParagraph: true })
        // }}
        onKeyDown={(event) => {
          const url = (event.target as HTMLInputElement).value

          // presss escape to delete input node
          if (event.key.toLowerCase() === KEYVALUE.escape) {
            deleteInput({ isRestoreParagraph: true })
            return
          }

          // press backSpace to delete input node if it is empty
          if (event.key.toLowerCase() === KEYVALUE.backSpace && !url) {
            deleteInput({ isRestoreParagraph: true })
            return
          }

          // press enter to insert figureEmbed
          if (event.key.toLowerCase() === KEYVALUE.enter) {
            // delete input node
            deleteInput({ isRestoreParagraph: false })

            // try to insert figureEmbed if url is not empty
            if (url && isUrl(url)) {
              props.editor.commands.setFigureEmbed({
                src: url,
                position:
                  props.editor.storage.figureEmbedLinkInput.prevSelection.to -
                  1,
              })
            }

            return
          }
        }}
      />
    </NodeViewWrapper>
  )
}

export default Input
