import { TextIcon, Translate, withIcon } from '~/components'

import { ReactComponent as IconLicenseARR } from '@/public/static/icons/24px/license-arr.svg'
import { ReactComponent as IconLicenseBY } from '@/public/static/icons/24px/license-by.svg'
import { ReactComponent as IconLicenseCC0 } from '@/public/static/icons/24px/license-cc-0.svg'
import { ReactComponent as IconLicenseCC } from '@/public/static/icons/24px/license-cc.svg'
import { ReactComponent as IconLicenseNC } from '@/public/static/icons/24px/license-nc.svg'
import { ReactComponent as IconLicenseND } from '@/public/static/icons/24px/license-nd.svg'

import styles from './styles.css'

import { ArticleLicenseType } from '@/__generated__/globalTypes'

type LicenseProps = {
  license: ArticleLicenseType
}

const License: React.FC<LicenseProps> = ({ license }) => {
  const isCC0 = license === ArticleLicenseType.cc_0
  const isARR = license === ArticleLicenseType.arr
  const isCCBYNCND2 = license === ArticleLicenseType.cc_by_nc_nd_2

  return (
    <section className="license">
      {isCC0 && (
        <TextIcon
          icon={
            <span className="icons">
              {withIcon(IconLicenseCC0)({ size: 'md' })}
            </span>
          }
          color="gold"
          size="xs"
          weight="md"
          spacing="xtight"
        >
          <Translate zh_hant="NO RIGHTS RESERVED 版權聲明" zh_hans="" />
        </TextIcon>
      )}

      {isARR && (
        <TextIcon
          icon={
            <span className="icons">
              {withIcon(IconLicenseARR)({ size: 'md' })}
            </span>
          }
          color="gold"
          size="xs"
          weight="md"
          spacing="xtight"
        >
          <Translate zh_hant="ALL RIGHTS RESERVED 版權聲明" zh_hans="" />
        </TextIcon>
      )}

      {isCCBYNCND2 && (
        <TextIcon
          icon={
            <span className="icons">
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
          <Translate zh_hant="CC BY-NC-ND 2.0 版權聲明" zh_hans="" />
        </TextIcon>
      )}

      <style jsx>{styles}</style>
    </section>
  )
}

export default License
