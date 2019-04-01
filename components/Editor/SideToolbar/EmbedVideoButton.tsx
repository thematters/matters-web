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

const EmbedVideoButton = ({ quill, setExpanded }: Props) => {
  const { lang } = useContext(LanguageContext)

  const placeholder = translate({
    zh_hant: '貼上 YouTube、Vimeo 連結後，Enter 進行新增',
    zh_hans: '贴上 YouTube、Vimeo 链结後，Enter 进行新增',
    lang
  })

  const hint = translate({
    zh_hant: '新增影片',
    zh_hans: '新增影片',
    lang
  })

  const insertEmbedClipboard = () => {
    if (quill) {
      const data = { purpose: 'video', placeholder }
      const range = quill.getSelection(true)
      quill.insertEmbed(range.index, 'embedClipboard', data, 'user')
    }
    setExpanded(false)
  }

  return (
    <button type="button" onClick={insertEmbedClipboard} aria-label={hint}>
      <Icon
        id={ICON_EDITOR_VIDEO.id}
        viewBox={ICON_EDITOR_VIDEO.viewBox}
        size="large"
      />
    </button>
  )
}

export default EmbedVideoButton
