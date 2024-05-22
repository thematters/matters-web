import { FormattedMessage } from 'react-intl'

import styles from './styles.module.css'

const Intro = () => (
  <section className={styles.intro}>
    <h4>
      <FormattedMessage defaultMessage="What is Liker ID?" id="3YAasP" />
    </h4>

    <p>
      <FormattedMessage
        defaultMessage="Civic Liker is a movement to reward good content and encourage openness. Like = reward. Liker ID is your account to become a civic liker, you have to log into Liker ID in order to turn your “Like” to LikeCoin reward to the creators. Creators also need to register for a Liker ID to get the reward. Note: Matters ID and Liker ID are different and independent IDs. Learn more {link}"
        id="U5/rZd"
        values={{
          link: (
            <a
              className="u-link-green"
              href="https://docs.like.co/v/zh/user-guide/creator/matters"
              target="_blank"
              rel="noreferrer"
            >
              help.like.co
            </a>
          ),
        }}
      />
    </p>
  </section>
)

export default Intro
