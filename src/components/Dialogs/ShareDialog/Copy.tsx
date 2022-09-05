import { useContext } from 'react'

import {
  CopyToClipboard,
  IconLink16,
  LanguageContext,
  TextIcon,
  Translate,
} from '~/components'

import { toLocale, translate } from '~/common/utils'

import styles from './styles.css'

const Copy = ({ link }: { link: string }) => {
  const { lang } = useContext(LanguageContext)
  const url = new URL(link)
  const pathnames = url.pathname.split('/')
  const showTranslation = toLocale(pathnames[1]) !== ''

  return (
    <section className="copy">
      <CopyToClipboard text={link}>
        <button aria-label={translate({ id: 'copy', lang })}>
          <TextIcon icon={<IconLink16 color="grey" />} spacing="base">
            <div className="text">
              <span>
                <Translate
                  zh_hant="複製鏈接"
                  zh_hans="复制链接"
                  en="Copy Link"
                />
              </span>
              {showTranslation && (
                <span className="share-translation">
                  <Translate
                    zh_hant="分享這篇文章的翻譯版本"
                    zh_hans="分享这篇文章的翻译版本"
                    en="Share this article in translated version"
                  />
                </span>
              )}
            </div>
          </TextIcon>
        </button>
      </CopyToClipboard>
      <style jsx>{styles}</style>
    </section>
  )
}

export default Copy
