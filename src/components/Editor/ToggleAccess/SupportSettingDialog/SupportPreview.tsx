import { useContext } from 'react'
import { FormattedMessage } from 'react-intl'

import { MAX_ARTICLE_SUPPORT_LENGTH } from '~/common/enums'
import { Avatar, Spacer, TextIcon, ViewerContext } from '~/components'
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
              <Spacer size="sp8" />
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
            <Avatar src={viewer?.avatar} size={48} />
            <p className={styles.tagline}>
              <TextIcon weight="medium">{viewer?.displayName}&nbsp;</TextIcon>
              <TextIcon color="greyDarker">
                <FormattedMessage defaultMessage="says: " id="M05PcB" />
              </TextIcon>
            </p>
            <Spacer size="sp8" />
          </>
        )}

        <p>{content.slice(0, MAX_ARTICLE_SUPPORT_LENGTH)}</p>
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
