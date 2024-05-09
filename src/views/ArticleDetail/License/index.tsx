import { FormattedMessage } from 'react-intl'

import { TEST_ID } from '~/common/enums'
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
      {isCC0 && <FormattedMessage defaultMessage="CC0 License" id="rE7sE3" />}

      {isARR && <FormattedMessage defaultMessage="No Copyright" id="pKRF+E" />}

      {isCCBYNCND2 && (
        <FormattedMessage defaultMessage="CC BY-NC-ND 2.0" id="A0MNSc" />
      )}

      {isCCBYNCND4 && (
        <FormattedMessage defaultMessage="CC BY-NC-ND 4.0" id="TPEQMa" />
      )}
    </section>
  )
}

export default License
