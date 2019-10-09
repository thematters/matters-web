import classNames from 'classnames'
import React, { useState } from 'react'
import { Quill } from 'react-quill'

import { Icon } from '~/components/Icon'

import ICON_EDITOR_ADD from '~/static/icons/editor-add.svg?sprite'

import DividerButton from './DividerButton'
import EmbedCodeButton from './EmbedCodeButton'
import EmbedVideoButton from './EmbedVideoButton'
import styles from './styles.css'
import UploadAudioButton from './UploadAudioButton'
import UploadImageButton from './UploadImageButton'

interface SideToolbarProps {
  show: boolean
  top: number
  quill: Quill | null
  onSave: any
  upload: DraftAssetUpload
}

const SideToolbar = ({
  show,
  top,
  quill,
  onSave,
  upload
}: SideToolbarProps) => {
  const [expanded, setExpanded] = useState(false)
  const containerClasses = classNames({
    container: true,
    show,
    expanded
  })

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
        <UploadImageButton
          quill={quill}
          setExpanded={setExpanded}
          upload={upload}
        />
        <EmbedVideoButton quill={quill} setExpanded={setExpanded} />
        <EmbedCodeButton quill={quill} setExpanded={setExpanded} />
        <DividerButton
          quill={quill}
          onSave={onSave}
          setExpanded={setExpanded}
        />
        <UploadAudioButton
          quill={quill}
          setExpanded={setExpanded}
          upload={upload}
        />
      </div>
      <style jsx>{styles}</style>
    </aside>
  )
}

export default SideToolbar
