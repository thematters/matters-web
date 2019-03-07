import classNames from 'classnames'
import React, { useState } from 'react'
import { Quill } from 'react-quill'

import { Icon } from '~/components/Icon'

import ICON_EDITOR_ADD from '~/static/icons/editor-add.svg?sprite'
import ICON_EDITOR_IMAGE from '~/static/icons/editor-image.svg?sprite'
import ICON_EDITOR_LINEBREAK from '~/static/icons/editor-linebreak.svg?sprite'

import styles from './styles.css'

interface SideToolbarProps {
  show: boolean
  top: number
  quill: Quill | null
}

const SideToolbar = ({ show, top, quill }: SideToolbarProps) => {
  const [expanded, setExpanded] = useState(false)
  const containerClasses = classNames({
    container: true,
    show,
    expanded
  })

  const insertDivider = () => {
    if (quill) {
      const range = quill.getSelection(true)
      quill.insertEmbed(range.index, 'divider', true, 'user')
      quill.setSelection(range.index + 1, 0, 'silent')
    }
    setExpanded(false)
  }

  return (
    <aside className={containerClasses} style={{ top }}>
      <button
        className="toggle-button"
        type="button"
        onClick={() => setExpanded(!expanded)}
        aria-label={expanded ? '收起工具欄' : '展開工具欄'}
      >
        <Icon
          id={ICON_EDITOR_ADD.id}
          viewBox={ICON_EDITOR_ADD.viewBox}
          size="large"
        />
      </button>

      <div className="toolbar">
        <button
          className="image-button"
          type="button"
          onClick={() => setExpanded(!expanded)}
          aria-label={'新增圖片'}
        >
          <Icon
            id={ICON_EDITOR_IMAGE.id}
            viewBox={ICON_EDITOR_IMAGE.viewBox}
            size="large"
          />
        </button>
        <button
          className="hr-button"
          type="button"
          onClick={() => insertDivider()}
          aria-label={'新增分割線'}
        >
          <Icon
            id={ICON_EDITOR_LINEBREAK.id}
            viewBox={ICON_EDITOR_LINEBREAK.viewBox}
            size="large"
          />
        </button>
      </div>
      <style jsx>{styles}</style>
    </aside>
  )
}

export default SideToolbar
