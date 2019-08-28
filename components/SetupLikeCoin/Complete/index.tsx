import { Translate } from '~/components/Language'
import { Modal } from '~/components/Modal'
import { Title } from '~/components/Title'

import { redirectToTarget } from '~/common/utils'
import ICON_AVATAR_GREEN from '~/static/images/illustration-avatar.svg?url'

import styles from './styles.css'

const Complete = () => {
  return (
    <>
      <Modal.Content>
        <section className="container">
          <img src={ICON_AVATAR_GREEN} />

          <div className="content">
            <Title is="h3" type="modal-headline">
              <Translate
                zh_hant="你的專屬 Liker ID 已就位！"
                zh_hans="你的专属 Liker ID 已就位！"
              />
            </Title>
          </div>
        </section>
      </Modal.Content>

      <footer>
        <Modal.FooterButton
          width="full"
          onClick={() => redirectToTarget({ defaultTarget: 'homepage' })}
        >
          <Translate zh_hant="進入社區" zh_hans="进入社区" />
        </Modal.FooterButton>
      </footer>

      <style jsx>{styles}</style>
    </>
  )
}

export default Complete
