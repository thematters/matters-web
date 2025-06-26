import { ArticleDigestFeed, List } from '~/components'

import { ArticleDigestCurated } from '../../ArticleDigestCurated'
import styles from '../../styles.module.css'
import placeholderStyles from './styles.module.css'

const Placeholder = () => {
  return (
    <section>
      <section className={styles.header}>
        <h1>
          <div className={placeholderStyles.name} />
        </h1>
        <p className={styles.description}>
          <div className={placeholderStyles.description} />
        </p>
      </section>

      <section className={styles.cards}>
        <ArticleDigestCurated.Placeholder />
        <ArticleDigestCurated.Placeholder />
        <ArticleDigestCurated.Placeholder />
      </section>

      <List aria-busy="true" aria-live="polite">
        <List.Item>
          <ArticleDigestFeed.Placeholder />
        </List.Item>
        <List.Item>
          <ArticleDigestFeed.Placeholder />
        </List.Item>
        <List.Item>
          <ArticleDigestFeed.Placeholder />
        </List.Item>
      </List>
    </section>
  )
}

export default Placeholder
