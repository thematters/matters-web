import { useContext } from 'react'

import { LanguageContext } from '~/components/Language'

import termStyles from '~/common/styles/utils/content.article.css'
import Privacy from '~/common/texts/privacy'
import ToS from '~/common/texts/tos'
import { translate } from '~/common/utils'

export const Term = () => {
  const { lang } = useContext(LanguageContext)

  return (
    <>
      <section
        dangerouslySetInnerHTML={{
          __html: translate({
            ...ToS,
            lang
          })
        }}
        className="u-content"
      />

      <hr style={{ margin: '4rem 0 1rem' }} />
      <section
        dangerouslySetInnerHTML={{
          __html: translate({
            ...ToS,
            lang: 'en'
          })
        }}
        className="u-content"
      />

      <hr style={{ margin: '4rem 0 1rem' }} />
      <section
        dangerouslySetInnerHTML={{
          __html: translate({
            ...Privacy,
            lang
          })
        }}
        className="u-content"
      />

      <hr style={{ margin: '4rem 0 1rem' }} />
      <section
        dangerouslySetInnerHTML={{
          __html: translate({
            ...Privacy,
            lang: 'en'
          })
        }}
        className="u-content"
      />
      <style jsx>{termStyles}</style>
    </>
  )
}
