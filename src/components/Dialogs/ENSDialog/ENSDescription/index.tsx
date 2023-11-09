import { EXTERNAL_LINKS } from '~/common/enums'
import { Translate } from '~/components'

import styles from './styles.module.css'

const ENSDescription = () => {
  return (
    <>
      <hr className={styles.hr} />

      <section className={styles.description}>
        <p>
          <Translate id="linkEns" />
        </p>

        <ul>
          <li>
            <Translate id="linkEnsBenefit1" />
          </li>
          <li>
            <Translate id="linkEnsBenefit2" />
          </li>
        </ul>

        <p className={styles.reference}>
          <Translate id="moreEnsInfo" />
          &nbsp;
          <a href={EXTERNAL_LINKS.ENS_DOCS} target="_blank" rel="noreferrer">
            <Translate zh_hans="官方文档" zh_hant="官方文檔" en="docs" />
          </a>
          <Translate en="." zh_hans="" zh_hant="" />
        </p>
      </section>
    </>
  )
}

export default ENSDescription
