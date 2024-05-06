import { useContext } from 'react'

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
            __html: ToS[lang],
          }}
        />
      )}

      <section
        dangerouslySetInnerHTML={{
          __html: ToS.en,
        }}
      />

      {lang?.startsWith('zh') && (
        <section
          dangerouslySetInnerHTML={{
            __html: Privacy[lang],
          }}
        />
      )}

      <section
        dangerouslySetInnerHTML={{
          __html: Privacy.en,
        }}
      />
    </section>
  )
}
