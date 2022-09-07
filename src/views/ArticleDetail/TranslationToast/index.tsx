import { Translate } from '@/src/components'

import styles from './styles.css'

const TranslationToast = ({
  onClick,
}: {
  onClick: (event?: React.MouseEvent<HTMLElement, MouseEvent>) => any
}) => {
  return (
    <p className="wrapper">
      <Translate
        zh_hans="你正在浏览由 Google 翻译的版本，若要阅读原文版本，"
        zh_hant="你正在瀏覽由 Google 翻譯的版本，若要閱讀原文版本，"
        en="You're viewing translated content by Google. To read original content,&nbsp;"
      />
      <span onClick={onClick} className="switchButton">
        <Translate
          zh_hans="点击这里切换。"
          zh_hant="點擊這裡切換。"
          en="click here to switch."
        />
      </span>
      <style jsx>{styles}</style>
    </p>
  )
}

export default TranslationToast
