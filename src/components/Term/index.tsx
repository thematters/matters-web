import { useContext } from 'react'

import { translate } from '~/common/utils'
import { LanguageContext } from '~/components'

import Privacy from './privacy'
import styles from './styles.module.css'
import ToS from './tos'

export const Term = () => {
  const { lang } = useContext(LanguageContext)

  return (
    <section className={styles.term}>
      {lang?.startsWith('zh') && (
        <section
          dangerouslySetInnerHTML={{
            __html: translate({
              ...ToS,
              lang,
            }),
          }}
        />
      )}

      <section
        dangerouslySetInnerHTML={{
          __html: translate({
            ...ToS,
            lang: 'en',
          }),
        }}
      />

      {lang?.startsWith('zh') && (
        <section
          dangerouslySetInnerHTML={{
            __html: translate({
              ...Privacy,
              lang,
            }),
          }}
        />
      )}

      <section
        dangerouslySetInnerHTML={{
          __html: translate({
            ...Privacy,
            lang: 'en',
          }),
        }}
      />
    </section>
  )
}
