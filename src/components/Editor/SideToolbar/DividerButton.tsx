import { Quill } from 'react-quill'

import { Icon } from '~/components/Icon'

import ICON_EDITOR_LINEBREAK from '~/static/icons/editor-linebreak.svg?sprite'

interface DividerButtonProps {
  quill: Quill | null
  onSave: any
  setExpanded: (expanded: boolean) => void
}

const DividerButton = ({ quill, setExpanded }: DividerButtonProps) => {
  const insertDivider = () => {
    if (quill) {
      const range = quill.getSelection(true)
      quill.insertEmbed(range.index, 'divider', true, 'user')
      quill.setSelection(range.index + 1, 0, 'silent')
    }
    setExpanded(false)
  }

  return (
    <button
      className="divider-button"
      type="button"
      onClick={() => insertDivider()}
      aria-label="新增分割線"
    >
      <Icon
        id={ICON_EDITOR_LINEBREAK.id}
        viewBox={ICON_EDITOR_LINEBREAK.viewBox}
        size="large"
      />
    </button>
  )
}

export default DividerButton
