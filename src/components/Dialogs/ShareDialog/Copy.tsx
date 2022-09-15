import { useContext } from 'react'

import {
  CopyToClipboard,
  IconLink16,
  LanguageContext,
  TextIcon,
  Translate,
} from '~/components'

import { translate } from '~/common/utils'

import styles from './styles.css'

const Copy = ({ link }: { link: string }) => {
  const { lang } = useContext(LanguageContext)

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
            </div>
          </TextIcon>
        </button>
      </CopyToClipboard>
      <style jsx>{styles}</style>
    </section>
  )
}

export default Copy
