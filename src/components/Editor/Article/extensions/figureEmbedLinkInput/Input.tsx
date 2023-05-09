import { NodeViewProps, NodeViewWrapper } from '@tiptap/react'
import { useEffect, useRef } from 'react'

import { KEYVALUE } from '~/common/enums'
import { isUrl } from '~/common/utils'

const Input: React.FC<NodeViewProps> = (props) => {
  const inputRef: React.RefObject<any> = useRef(null)

  const { placeholder } = props.node.attrs

  const deleteInput = () => {
    try {
      props.deleteNode()
    } catch (e) {}

    props.editor.commands.focus()
  }

  useEffect(() => {
    if (inputRef) {
      setTimeout(() => {
        inputRef.current.focus()
      }, 0)
    }
  }, [])

  return (
    <NodeViewWrapper className="figure-embed-link-input">
      <input
        ref={inputRef}
        type="text"
        placeholder={placeholder}
        onBlur={() => {
          deleteInput()
        }}
        onKeyDown={(event) => {
          const url = (event.target as HTMLInputElement).value

          // presss escape to delete input node
          if (event.key.toLowerCase() === KEYVALUE.escape) {
            deleteInput()
            return
          }

          // press backSpace to delete input node if it is empty
          if (event.key.toLowerCase() === KEYVALUE.backSpace && !url) {
            deleteInput()
            return
          }

          // press enter to insert figureEmbed
          if (event.key.toLowerCase() === KEYVALUE.enter) {
            // delete input node
            deleteInput()

            // try to insert figureEmbed if url is not empty
            if (url && isUrl(url)) {
              props.editor.commands.setFigureEmbed({ src: url })
            }

            return
          }
        }}
      />
    </NodeViewWrapper>
  )
}

export default Input
