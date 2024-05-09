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
          zh_hant="CC0 公眾領域貢獻宣告"
          zh_hans="CC0 公众领域贡献宣告"
          en="CC0 License"
        />
      )}

      {isARR && (
        <Translate
          zh_hant="作者保留所有權利"
          zh_hans="作者保留所有權利"
          en="No Copyright"
        />
      )}

      {isCCBYNCND2 && (
        <Translate
          zh_hant="CC BY-NC-ND 2.0 授權"
          zh_hans="CC BY-NC-ND 2.0 授权"
          en="CC BY-NC-ND 2.0"
        />
      )}

      {isCCBYNCND4 && (
        <Translate
          zh_hant="CC BY-NC-ND 4.0 授權"
          zh_hans="CC BY-NC-ND 4.0 授权"
          en="CC BY-NC-ND 4.0"
        />
      )}
    </section>
  )
}

export default License
