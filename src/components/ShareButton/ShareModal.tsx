import _get from 'lodash/get'

import { Icon } from '~/components/Icon'
import { Translate } from '~/components/Language'
import { Modal } from '~/components/Modal'
import { ModalInstance } from '~/components/ModalManager'

import { ADD_TOAST } from '~/common/enums/events'
import { dom } from '~/common/utils'
import ICON_SHARE_LINK from '~/static/icons/share-link.svg?sprite'

import Douban from './Douban'
import Email from './Email'
import Facebook from './Facebook'
import LINE from './LINE'
import styles from './styles.css'
import Telegram from './Telegram'
import Twitter from './Twitter'
import Weibo from './Weibo'
import WhatsApp from './WhatsApp'

const ShareModal = () => {
  const copy = () => {
    dom.copyToClipboard(decodeURI(window.location.href))
    window.dispatchEvent(
      new CustomEvent(ADD_TOAST, {
        detail: {
          color: 'green',
          content: <Translate zh_hant="複製成功" zh_hans="复制成功" />
        }
      })
    )
    const element = dom.$('#shareLinkInput')
    if (element) {
      element.select()
    }
  }

  return (
    <ModalInstance modalId="shareModal" layout="small">
      {(props: ModalInstanceProps) => (
        <Modal.Content spacing="none" layout="full-width">
          <>
            <div className="socials-container">
              <div className="left">
                <LINE />
                <WhatsApp />
                <Telegram />
                <Douban />
              </div>

              <div className="right">
                <Twitter />
                <Facebook />
                <Weibo />
                <Email />
              </div>
            </div>

            <div className="link-container">
              <button onClick={copy} type="button">
                <Icon
                  id={ICON_SHARE_LINK.id}
                  viewBox={ICON_SHARE_LINK.viewBox}
                  size="xsmall"
                />
              </button>

              <input
                id="shareLinkInput"
                type="text"
                value={decodeURI(window.location.href)}
                readOnly
                onClick={copy}
              />
            </div>

            <style jsx>{styles}</style>
          </>
        </Modal.Content>
      )}
    </ModalInstance>
  )
}

export default ShareModal
