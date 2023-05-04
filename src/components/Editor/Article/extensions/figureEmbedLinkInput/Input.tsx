import { NodeViewProps, NodeViewWrapper } from '@tiptap/react'
import { useEffect, useRef } from 'react'

import { KEYVALUE } from '~/common/enums'
import { isUrl } from '~/common/utils'

const Input: React.FC<NodeViewProps> = (props) => {
  const inputRef: React.RefObject<any> = useRef(null)

  const { placeholder } = props.node.attrs

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
          props.deleteNode()
        }}
        onKeyDown={(event) => {
          const url = (event.target as HTMLInputElement).value

          // presss escape to delete input node
          if (event.key === KEYVALUE.escape) {
            props.deleteNode()
            return
          }

          // press backSpace to delete input node if it is empty
          if (event.key === KEYVALUE.backSpace && !url) {
            props.deleteNode()
            return
          }

          // press enter to insert figureEmbed
          if (event.key === KEYVALUE.enter) {
            // delete input node
            props.deleteNode()

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
