import { FC } from 'react'

import { Icon } from '~/components/Icon'
import { Translate } from '~/components/Language'
import { Modal } from '~/components/Modal'

import { EXTERNAL_LINKS } from '~/common/enums'
import ICON_INFORMATION from '~/static/icons/information.svg?sprite'
import ICON_AVATAR_GREEN from '~/static/images/illustration-avatar.svg'

import styles from './styles.css'

/**
 * This component is for onboarding info modal.
 *
 * Usage:
 *
 * ```jsx
 *   <OnboardingInfoModal close={close} />
 * ```
 *
 */

const InfoIcon = () => (
  <Icon
    id={ICON_INFORMATION.id}
    viewBox={ICON_INFORMATION.viewBox}
    style={{ width: 12, height: 12 }}
  />
)

const OnboardingInfoModal: FC<ModalInstanceProps> = ({ close }) => {
  return (
    <>
      <Modal.Content spacing="none" layout="full-width">
        <div className="container">
          <div
            className="avatar"
            style={{ backgroundImage: `url(${ICON_AVATAR_GREEN})` }}
            aria-hidden="true"
          />
          <div className="desc">
            <div className="text">
              <Translate
                zh_hant="Matters 目前是一個邀請制社群，你可以透過以下兩種方法獲得創作者資格。"
                zh_hans="Matters 目前是一个邀请制社区，你可以通过以下两种方法获得创作者资格。"
              />
            </div>
            <div className="info-item">
              <div className="info-icon">
                <InfoIcon />
              </div>
              <Translate
                zh_hant="透過老用戶邀請（你可以加入"
                zh_hans="通过老用户邀请（你可以加入"
              />
              <a
                className="u-link-green link"
                href={EXTERNAL_LINKS.TELEGRAM}
                target="_blank"
              >
                <Translate
                  zh_hant="官方 Telegram 群組"
                  zh_hans="官方 Telegram 群組"
                />
              </a>
              <Translate zh_hant="尋找老用戶）。" zh_hans="寻找老用户）。" />
            </div>
            <div className="info-item">
              <div className="info-icon">
                <InfoIcon />
              </div>
              <div>
                <Translate zh_hant="關注" zh_hans="关注" />
                <a
                  className="u-link-green link"
                  href={EXTERNAL_LINKS.FACEBOOK}
                  target="_blank"
                >
                  <Translate zh_hant="Matters 臉書" zh_hans="Matters 脸书" />
                </a>
                <Translate zh_hant="和" zh_hans="和" />
                <a
                  className="u-link-green link"
                  href={EXTERNAL_LINKS.WEIBO}
                  target="_blank"
                >
                  <Translate
                    zh_hant="微博帳號 MattersLab"
                    zh_hans="微博账号 MattersLab"
                  />
                </a>
                <Translate
                  zh_hant="，即時了解激活權限新玩法。"
                  zh_hans="，即时了解激活权限新玩法。"
                />
              </div>
            </div>
          </div>
        </div>
      </Modal.Content>
      <style jsx>{styles}</style>
    </>
  )
}

export default OnboardingInfoModal
