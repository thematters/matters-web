import {
  Button,
  CircleDigest,
  IconArrowRight16,
  Switch,
  Translate,
} from '~/components'

import SelectLicense from './SelectLicense'
import SupportSettingDialog, {
  SetSupportSettingProps,
} from './SetSupportSetting/index'
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

  iscnPublish?: boolean | null
  togglePublishISCN: (iscnPublish: boolean) => void
  iscnPublishSaving: boolean

  inSidebar?: boolean
}

const ToggleAccess: React.FC<ToggleAccessProps> = ({
  circle,
  accessType,
  license,

  editAccess,
  accessSaving,
  canToggleCircle,

  iscnPublish,
  togglePublishISCN,
  iscnPublishSaving,

  inSidebar,
}) => {
  const supportSettingProps: SetSupportSettingProps = {}
  return (
    <section className={inSidebar ? 'inSidebar' : ''}>
      {canToggleCircle && (
        <section className="circle">
          <section className="switch">
            <header>
              <h3>
                <Translate id="addToCircle" />
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
          <Translate id="license" />
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
      <section className="support-setting">
        <SupportSettingDialog {...supportSettingProps}>
          {({ openDialog }) => (
            <button type="button" onClick={openDialog}>
              <section className="support">
                <section className="left">
                  <h3>
                    <Translate
                      zh_hans="支持设置"
                      zh_hant="支持設置"
                      en="Support Setting"
                    />
                  </h3>
                  <p className="hint">
                    <Translate
                      zh_hans="可自定求支持文字，以及支持後回覆的內容"
                      zh_hant="可自定求支持文字，以及支持後回覆的內容"
                    />
                  </p>
                </section>
                <section className="right">
                  <Button onClick={openDialog} spacing={['xxtight', 'xtight']}>
                    <IconArrowRight16 color="grey" />
                  </Button>
                </section>
              </section>
            </button>
          )}
        </SupportSettingDialog>
      </section>

      <section className="iscn">
        <header>
          <h3 className="title">
            <Translate id="publishToISCN" />
          </h3>

          <Switch
            checked={!!iscnPublish}
            onChange={() => {
              togglePublishISCN(!iscnPublish)
            }}
            loading={iscnPublishSaving}
          />
        </header>

        <p className="hint">
          <Translate id="publishToISCNHint_1" />
          <a href="https://iscn.io/" target="_blank">
            ISCN
          </a>
          <Translate id="publishToISCNHint_2" />
        </p>
      </section>

      <style jsx>{styles}</style>
    </section>
  )
}

export default ToggleAccess
