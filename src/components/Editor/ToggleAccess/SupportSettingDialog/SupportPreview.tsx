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
    <section className={styles.donation}>
      <span className={styles.content}>
        {!content &&
          (tabType === 'request' ? (
            <Translate id="supportRequestDescription" />
          ) : (
            <section className={styles.previewResponse}>
              <p>
                <Translate
                  zh_hans="🎉感谢支持"
                  zh_hant="🎉 感謝支持！"
                  en="🎉Thanks for your support!"
                />
              </p>
              <Translate id="supportResponseDescription" />
            </section>
          ))}
        {content && tabType === 'reply' && (
          <section>
            <Avatar src={viewer?.avatar} size="xl" />
            <p>
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
          </section>
        )}
        {<Translate zh_hant={content} zh_hans={content} en={content} />}
      </span>
      <section className={styles.previewButton}>
        {tabType === 'request' && <DonationButton supported={false} />}
        {tabType === 'reply' && <DonationButton supported={true} />}
      </section>
    </section>
  )
}

export default SupportPreview
