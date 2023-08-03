import { useContext } from 'react'

import {
  Avatar,
  Spacer,
  TextIcon,
  Translate,
  ViewerContext,
} from '~/components'
import DonationButton from '~/components/Buttons/DonationButton'

import styles from './styles.module.css'

const SupportPreview = ({
  content,
  tabType,
}: {
  content: string
  tabType: string
}) => {
  const viewer = useContext(ViewerContext)
  return (
    <section className={styles.preview}>
      <section className={styles.content}>
        {!content &&
          (tabType === 'request' ? (
            <Translate id="supportRequestDescription" />
          ) : (
            <>
              <p className={styles.tagline}>
                <Translate
                  zh_hans="🎉感谢支持"
                  zh_hant="🎉 感謝支持！"
                  en="🎉Thanks for your support!"
                />
              </p>
              <p>
                <Translate id="supportResponseDescription" />
              </p>
            </>
          ))}

        {content && tabType === 'reply' && (
          <>
            <Avatar src={viewer?.avatar} size="xl" />
            <p className={styles.tagline}>
              <TextIcon weight="md">{viewer?.displayName}</TextIcon>
              <TextIcon color="greyDarker">
                <Translate
                  zh_hant="&nbsp;想對你說："
                  zh_hans="&nbsp;想对你說："
                  en="&nbsp;wants to tell you: "
                />
              </TextIcon>
            </p>
            <Spacer size="xtight" />
          </>
        )}

        <p>
          <Translate zh_hant={content} zh_hans={content} en={content} />
        </p>
      </section>

      <section className={styles.button}>
        {tabType === 'request' && <DonationButton supported={false} />}
        {tabType === 'reply' && <DonationButton supported={true} />}
      </section>
    </section>
  )
}

export default SupportPreview
