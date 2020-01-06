import { Icon, ModalInstance, TextIcon } from '~/components'
import { Translate } from '~/components/Language'
import { Modal } from '~/components/Modal'

import { ANALYTICS_EVENTS, EXTERNAL_LINKS, TEXT } from '~/common/enums'
import { analytics } from '~/common/utils'

const CivicLikerModal: React.FC<ModalInstanceProps> = ({ close }) => {
  const closeModal = () => {
    analytics.trackEvent(ANALYTICS_EVENTS.CLOSE_CIVIC_LIKER_MODAL)
    close()
  }

  return (
    <>
      <Modal.Content layout="full-width" spacing="small">
        <p>
          <Translate
            zh_hant="讚賞公民是一場回饋優秀內容的運動。每月只需付出一杯咖啡的價錢，就能成為讚賞公民，從此每個點讚，都會化成對創作者的實質支持。"
            zh_hans="赞赏公民是一场回馈优秀内容的运动。每月只需付出一杯咖啡的价钱，就能成为赞赏公民，从此每个点赞，都会化成对创作者的实质支持。"
          />
        </p>

        <br />

        <p>
          <Translate zh_hant="瞭解更多 " zh_hans="了解更多" />
          <a
            className="u-link-green"
            href={EXTERNAL_LINKS.CIVIC_LIKER_SUPPORT}
            target="_blank"
          >
            <Translate zh_hant="讚賞公民福利" zh_hans="赞赏公民福利" />
          </a>
        </p>
      </Modal.Content>

      <div className="buttons">
        <Modal.FooterButton bgColor="white" onClick={closeModal}>
          <Translate
            zh_hant={TEXT.zh_hant.understood}
            zh_hans={TEXT.zh_hans.understood}
          />
        </Modal.FooterButton>

        <Modal.FooterButton
          bgColor="white"
          is="anchor"
          href={EXTERNAL_LINKS.CIVIC_LIKER_JOIN}
          target="_blank"
          onClick={closeModal}
        >
          <TextIcon
            icon={<Icon.External size="md" />}
            spacing="xxxtight"
            color="green"
            textPlacement="left"
            size="md"
          >
            <Translate zh_hant="立即登記" zh_hans="立即登记" />
          </TextIcon>
        </Modal.FooterButton>
      </div>
    </>
  )
}

export default () => (
  <ModalInstance
    modalId="civicLikerModal"
    title="joinCivicLiker"
    defaultCloseable={false}
  >
    {(props: ModalInstanceProps) => <CivicLikerModal {...props} />}
  </ModalInstance>
)
