import { UserDigestRichPlaceholder } from '~/components/UserDigest/Rich/placeholder'

import styles from './styles.module.css'

export const AuthorsPlaceholder = () => {
  return (
    <section className={styles.placeholder}>
      <UserDigestRichPlaceholder />
      <UserDigestRichPlaceholder />
      <UserDigestRichPlaceholder />
      <UserDigestRichPlaceholder />
      <UserDigestRichPlaceholder />
    </section>
  )
}
