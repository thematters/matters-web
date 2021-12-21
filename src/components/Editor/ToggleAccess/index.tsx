import { CircleDigest, Switch, Translate } from '~/components'

import SelectLicense from './SelectLicense'
import styles from './styles.css'

import {
  ArticleAccessType,
  ArticleLicenseType,
} from '@/__generated__/globalTypes'
import { DigestRichCirclePublic } from '~/components/CircleDigest/Rich/__generated__/DigestRichCirclePublic'

export type ToggleAccessProps = {
  circle?: DigestRichCirclePublic | null
  accessType: ArticleAccessType
  license: ArticleLicenseType

  editAccess: (
    addToCircle: boolean,
    paywalled: boolean,
    license: ArticleLicenseType
  ) => any

  accessSaving: boolean
  canToggleCircle: boolean

  inSidebar?: boolean
}

const ToggleAccess: React.FC<ToggleAccessProps> = ({
  circle,
  accessType,
  license,

  editAccess,
  accessSaving,
  canToggleCircle,

  inSidebar,
}) => {
  return (
    <section className={inSidebar ? 'inSidebar' : ''}>
      {canToggleCircle && (
        <section className="circle">
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
                onChange={() =>
                  editAccess(
                    !circle,
                    false,
                    circle && license === ArticleLicenseType.arr
                      ? ArticleLicenseType.cc_by_nc_nd_2
                      : license
                  )
                }
                disabled={!canToggleCircle}
                loading={accessSaving}
              />
            </header>
          </section>

          {circle && (
            <CircleDigest.Rich
              circle={circle}
              bgColor="grey-lighter"
              borderRadius="xtight"
              avatarSize="xl"
              textSize="md-s"
              hasOwner={false}
              hasDescription={false}
              disabled
            />
          )}
        </section>
      )}

      <section className="widget">
        <h3>
          <Translate zh_hant="版權聲明" zh_hans="版权声明" en="License" />
        </h3>

        <section className="license">
          <SelectLicense
            isInCircle={!!circle}
            license={license}
            onChange={(newLicense) =>
              editAccess(
                !!circle,
                !!circle && newLicense === ArticleLicenseType.arr,
                newLicense
              )
            }
          />
        </section>
      </section>

      <style jsx>{styles}</style>
    </section>
  )
}

export default ToggleAccess
