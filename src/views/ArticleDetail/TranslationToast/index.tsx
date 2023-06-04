import { CONTENT_LANG_TEXT_MAP } from '~/common/enums'
import { toLocale } from '~/common/utils'
import { Translate } from '~/components'

import styles from './styles.module.css'

const Content = ({ language }: { language?: string | null }) => {
  if (language && toLocale(language) !== '') {
    const targetLang = {
      zh_hant: '',
      zh_hans: '',
      en: '',
    }
    Object.entries(CONTENT_LANG_TEXT_MAP.zh_hant).forEach(([k, v]) => {
      if (k === language) targetLang.zh_hant = v
    })
    Object.entries(CONTENT_LANG_TEXT_MAP.zh_hans).forEach(([k, v]) => {
      if (k === language) targetLang.zh_hans = v
    })
    Object.entries(CONTENT_LANG_TEXT_MAP.en).forEach(([k, v]) => {
      if (k === language) targetLang.en = v
    })
    return (
      <Translate
        zh_hans={`你正在浏览由 Google 翻译的${targetLang.zh_hans}版本，若要阅读原文版本，`}
        zh_hant={`你正在瀏覽由 Google 翻譯的${targetLang.zh_hant}版本，若要閱讀原文版本，`}
        en={`You’re viewing content translated into ${targetLang.en} by Google. To read original content, `}
      />
    )
  }
  return (
    <Translate
      zh_hans="你正在浏览由 Google 翻译的版本，若要阅读原文版本，"
      zh_hant="你正在瀏覽由 Google 翻譯的版本，若要閱讀原文版本，"
      en="You’re viewing content translated by Google. To read original content,&nbsp;"
    />
  )
}

const SwitchContent = ({
  onClick,
}: {
  onClick: (event?: React.MouseEvent<HTMLElement, MouseEvent>) => any
}) => (
  <span onClick={onClick} className={styles.switchButton}>
    <Translate
      zh_hans="点击这里切换。"
      zh_hant="點擊這裡切換。"
      en="click here to switch."
    />
  </span>
)

const TranslationToast = {
  Content,
  SwitchContent,
}

export default TranslationToast
