import { useContext } from 'react'
import { Quill } from 'react-quill'

import { Icon } from '~/components/Icon'
import { LanguageContext } from '~/components/Language'

import { translate } from '~/common/utils'
import ICON_EDITOR_VIDEO from '~/static/icons/editor-video.svg?sprite'

interface Props {
  quill: Quill | null
  setExpanded: (expanded: boolean) => void
}

const VideoButton = ({ quill, setExpanded }: Props) => {
  const { lang } = useContext(LanguageContext)

  const placeholder = translate({
    zh_hant: '貼上影片鏈結，確認後 Enter 進行新增',
    zh_hans: '贴上影片链结，确认后 Enter 进行新增',
    lang
  })

  const hint = translate({
    zh_hant: '新增影片',
    zh_hans: '新增影片',
    lang
  })

  const insertIframePastebin = () => {
    if (quill) {
      const data = { purpose: 'video', placeholder }
      const range = quill.getSelection(true)
      quill.insertEmbed(range.index, 'iframePastebin', data, 'user')
      quill.setSelection(range.index + 1, 0, 'silent')
    }
    setExpanded(false)
  }

  return (
    <button
      className="video-button"
      type="button"
      onClick={insertIframePastebin}
      aria-label={hint}
    >
      <Icon
        id={ICON_EDITOR_VIDEO.id}
        viewBox={ICON_EDITOR_VIDEO.viewBox}
        size="large"
      />
    </button>
  )
}

export default VideoButton
