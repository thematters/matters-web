import { CircleDigest, Switch, Translate } from '~/components'

import LicenseOption from './LicenseOption'
import styles from './styles.css'

import {
  ArticleAccessType,
  ArticleLicenseType,
} from '@/__generated__/globalTypes'
import { DigestRichCirclePublic } from '~/components/CircleDigest/Rich/__generated__/DigestRichCirclePublic'

export type ToggleAccessProps = {
  circle?: DigestRichCirclePublic | null
  accessType?: ArticleAccessType | null
  license: ArticleLicenseType

  editAccess?: (
    addToCircle: boolean,
    paywalled: boolean,
    license: ArticleLicenseType
  ) => any
  accessSaving: boolean
}

const ToggleAccess: React.FC<ToggleAccessProps> = ({
  circle,
  accessType,
  license,

  editAccess,
  accessSaving,
}) => {
  return (
    <section className="container">
      <section className="switch">
        <header>
          <h3>
            <Translate
              zh_hant="加入圍爐"
              zh_hans="加入围炉"
              en="Add to Circle"
            />
          </h3>

          <Switch
            checked={!!circle}
            onChange={() => editAccess && editAccess(!circle, false, license)}
            disabled={!!editAccess}
            loading={accessSaving}
          />
        </header>
      </section>

      {circle && (
        <section className="widget">
          <section className="circle">
            <CircleDigest.Rich
              circle={circle}
              bgColor="none"
              avatarSize="xl"
              textSize="md-s"
              hasOwner={false}
              hasDescription={false}
              disabled
            />
          </section>
        </section>
      )}

      <LicenseOption
        isInCircle={!!circle}
        license={license}
        onSelect={(newLicense) =>
          editAccess &&
          editAccess(
            !!circle,
            newLicense === ArticleLicenseType.arr,
            newLicense
          )
        }
      />

      <style jsx>{styles}</style>
    </section>
  )
}

export default ToggleAccess
