import { Modal } from '~/components/Modal'
import { ModalInstance } from '~/components/ModalManager'

import Copy from './Copy'
import Douban from './Douban'
import Email from './Email'
import Facebook from './Facebook'
import LINE from './LINE'
import styles from './styles.css'
import Telegram from './Telegram'
import Twitter from './Twitter'
import Weibo from './Weibo'
import WhatsApp from './WhatsApp'

const ShareModal = ({
  title,
  link,
  onClose
}: {
  title: string
  link: string
  onClose?: () => any
}) => {
  return (
    <ModalInstance modalId="shareModal" layout="sm" onClose={onClose}>
      {(props: ModalInstanceProps) => (
        <Modal.Content spacing="none" layout="full-width">
          <>
            <section className="socials-container">
              <section className="left">
                <LINE title={title} link={link} />
                <WhatsApp title={title} link={link} />
                <Telegram title={title} link={link} />
                <Douban title={title} link={link} />
              </section>

              <section className="right">
                <Twitter title={title} link={link} />
                <Facebook title={title} link={link} />
                <Weibo title={title} link={link} />
                <Email title={title} link={link} />
              </section>
            </section>

            <Copy link={link} />

            <style jsx>{styles}</style>
          </>
        </Modal.Content>
      )}
    </ModalInstance>
  )
}

export default ShareModal
