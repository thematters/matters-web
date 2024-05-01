import { useContext } from 'react'
import { FormattedMessage } from 'react-intl'

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
            <FormattedMessage
              defaultMessage="Like my work? Don't forget to support and clap, let me know that you are with me on the road of creation. Keep this enthusiasm together!"
              id="9EABqX"
            />
          ) : (
            <>
              <p className={styles.tagline}>
                <FormattedMessage
                  defaultMessage="🎉 Thank you for support!"
                  id="Myrqtn"
                />
              </p>
              <Spacer size="xtight" />
              <p>
                <FormattedMessage
                  defaultMessage="With your support, I will be able to accumulate more energy to create."
                  id="E+dEI9"
                />
              </p>
            </>
          ))}

        {content && tabType === 'reply' && (
          <>
            <Avatar src={viewer?.avatar} size="xl" />
            <p className={styles.tagline}>
              <TextIcon weight="md">{viewer?.displayName}&nbsp;</TextIcon>
              <TextIcon color="greyDarker">
                <FormattedMessage defaultMessage="says: " id="M05PcB" />
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
        {tabType === 'request' && (
          <DonationButton supported={false} width="100%" />
        )}
        {tabType === 'reply' && (
          <DonationButton supported={true} width="100%" />
        )}
      </section>
    </section>
  )
}

export default SupportPreview
