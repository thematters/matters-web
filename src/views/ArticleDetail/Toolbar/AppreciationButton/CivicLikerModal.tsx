import { Dialog, ModalInstance, Translate } from '~/components'

import { ANALYTICS_EVENTS, EXTERNAL_LINKS, TEXT } from '~/common/enums'
import { analytics } from '~/common/utils'

const CivicLikerModal: React.FC<ModalInstanceProps> = ({ close }) => {
  const closeModal = () => {
    analytics.trackEvent(ANALYTICS_EVENTS.CLOSE_CIVIC_LIKER_MODAL)
    close()
  }

  return (
    <>
      <Dialog.Content>
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
      </Dialog.Content>

      <Dialog.Footer>
        <Dialog.Button
          bgColor="grey-lighter"
          textColor="black"
          onClick={closeModal}
        >
          <Translate
            zh_hant={TEXT.zh_hant.understood}
            zh_hans={TEXT.zh_hans.understood}
          />
        </Dialog.Button>

        <Dialog.Button
          bgColor="grey-lighter"
          textColor="black"
          href={EXTERNAL_LINKS.CIVIC_LIKER_JOIN}
          target="_blank"
          onClick={closeModal}
        >
          <Translate zh_hant="立即登記" zh_hans="立即登记" />
        </Dialog.Button>
      </Dialog.Footer>
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
