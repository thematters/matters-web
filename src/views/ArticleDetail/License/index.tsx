import { TEST_ID } from '~/common/enums'
import { Translate } from '~/components'
import { ArticleLicenseType } from '~/gql/graphql'

import styles from './styles.module.css'

type LicenseProps = {
  license: ArticleLicenseType
}

const License: React.FC<LicenseProps> = ({ license }) => {
  const isCC0 = license === ArticleLicenseType.Cc_0
  const isARR = license === ArticleLicenseType.Arr
  const isCCBYNCND2 = license === ArticleLicenseType.CcByNcNd_2
  const isCCBYNCND4 = license === ArticleLicenseType.CcByNcNd_4

  return (
    <section className={styles.license} data-test-id={TEST_ID.ARTICLE_LICENSE}>
      {isCC0 && (
        <Translate
          zh_hant="NO RIGHTS RESERVED 授權聲明"
          zh_hans="NO RIGHTS RESERVED 授权声明"
          en="NO RIGHTS RESERVED"
        />
      )}

      {isARR && (
        <Translate
          zh_hant="ALL RIGHTS RESERVED 授權聲明"
          zh_hans="ALL RIGHTS RESERVED 授权声明"
          en="ALL RIGHTS RESERVED"
        />
      )}

      {isCCBYNCND2 && (
        <Translate
          zh_hant="CC BY-NC-ND 2.0 授權聲明"
          zh_hans="CC BY-NC-ND 2.0 授权声明"
          en="CC BY-NC-ND 2.0"
        />
      )}

      {isCCBYNCND4 && (
        <Translate
          zh_hant="CC BY-NC-ND 4.0 授權聲明"
          zh_hans="CC BY-NC-ND 4.0 授权声明"
          en="CC BY-NC-ND 4.0"
        />
      )}
    </section>
  )
}

export default License
