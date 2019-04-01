import { useContext } from 'react'
import { Quill } from 'react-quill'

import { Icon } from '~/components/Icon'
import { LanguageContext } from '~/components/Language'

import { translate } from '~/common/utils'
import ICON_EDITOR_CODE from '~/static/icons/editor-code.svg?sprite'

interface Props {
  quill: Quill | null
  setExpanded: (expanded: boolean) => void
}

const PastebinButton = ({ quill, setExpanded }: Props) => {
  const { lang } = useContext(LanguageContext)

  const placeholder = translate({
    zh_hant: '貼上 JSFiddle 連結後，Enter 進行新增',
    zh_hans: '贴上 JSFiddle 链结後，Enter 进行新增',
    lang
  })

  const hint = translate({
    zh_hant: '新增程式碼連結',
    zh_hans: '新增代碼链结',
    lang
  })

  const insertIframeClipboard = () => {
    if (quill) {
      const data = { purpose: 'pastebin', placeholder }
      const range = quill.getSelection(true)
      quill.insertEmbed(range.index, 'iframeClipboard', data, 'user')
    }
    setExpanded(false)
  }

  return (
    <button
      className="pastebin-button"
      type="button"
      onClick={insertIframeClipboard}
      aria-label={hint}
    >
      <Icon
        id={ICON_EDITOR_CODE.id}
        viewBox={ICON_EDITOR_CODE.viewBox}
        size="large"
      />
    </button>
  )
}

export default PastebinButton
