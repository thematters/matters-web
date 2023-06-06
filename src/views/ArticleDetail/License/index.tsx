import { ReactComponent as IconLicenseARR } from '@/public/static/icons/24px/license-arr.svg'
import { ReactComponent as IconLicenseBY } from '@/public/static/icons/24px/license-by.svg'
import { ReactComponent as IconLicenseCC } from '@/public/static/icons/24px/license-cc.svg'
import { ReactComponent as IconLicenseCC0 } from '@/public/static/icons/24px/license-cc-0.svg'
import { ReactComponent as IconLicenseNC } from '@/public/static/icons/24px/license-nc.svg'
import { ReactComponent as IconLicenseND } from '@/public/static/icons/24px/license-nd.svg'
import { TEST_ID } from '~/common/enums'
import { TextIcon, Translate, withIcon } from '~/components'
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
        <TextIcon
          icon={
            <span className={styles.icons}>
              {withIcon(IconLicenseCC0)({ size: 'md' })}
            </span>
          }
          color="gold"
          size="xs"
          weight="md"
          spacing="xtight"
        >
          <Translate
            zh_hant="NO RIGHTS RESERVED 版權聲明"
            zh_hans="NO RIGHTS RESERVED 版权声明"
            en="NO RIGHTS RESERVED"
          />
        </TextIcon>
      )}

      {isARR && (
        <TextIcon
          icon={
            <span className={styles.icons}>
              {withIcon(IconLicenseARR)({ size: 'md' })}
            </span>
          }
          color="gold"
          size="xs"
          weight="md"
          spacing="xtight"
        >
          <Translate
            zh_hant="ALL RIGHTS RESERVED 版權聲明"
            zh_hans="ALL RIGHTS RESERVED 版权声明"
            en="ALL RIGHTS RESERVED"
          />
        </TextIcon>
      )}

      {isCCBYNCND2 && (
        <TextIcon
          icon={
            <span className={styles.icons}>
              {withIcon(IconLicenseCC)({ size: 'md' })}
              {withIcon(IconLicenseBY)({ size: 'md' })}
              {withIcon(IconLicenseNC)({ size: 'md' })}
              {withIcon(IconLicenseND)({ size: 'md' })}
            </span>
          }
          color="gold"
          size="xs"
          weight="md"
          spacing="xtight"
        >
          <Translate
            zh_hant="CC BY-NC-ND 2.0 版權聲明"
            zh_hans="CC BY-NC-ND 2.0 版权声明"
            en="CC BY-NC-ND 2.0"
          />
        </TextIcon>
      )}

      {isCCBYNCND4 && (
        <TextIcon
          icon={
            <span className={styles.icons}>
              {withIcon(IconLicenseCC)({ size: 'md' })}
              {withIcon(IconLicenseBY)({ size: 'md' })}
              {withIcon(IconLicenseNC)({ size: 'md' })}
              {withIcon(IconLicenseND)({ size: 'md' })}
            </span>
          }
          color="gold"
          size="xs"
          weight="md"
          spacing="xtight"
        >
          <Translate
            zh_hant="CC BY-NC-ND 4.0 版權聲明"
            zh_hans="CC BY-NC-ND 4.0 版权声明"
            en="CC BY-NC-ND 4.0"
          />
        </TextIcon>
      )}
    </section>
  )
}

export default License
