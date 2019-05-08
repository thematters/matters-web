import { FC } from 'react'

import { Button } from '~/components/Button'
import WriteButton from '~/components/GlobalHeader/WriteButton'
import { Icon } from '~/components/Icon'
import { Translate } from '~/components/Language'
import { Modal } from '~/components/Modal'

import ICON_ASTRONAUT from '~/static/icons/astronaut.svg?sprite'

import styles from './styles.css'

const SelfActivationModal: FC<ModalInstanceProps> = ({ close }) => (
  <>
    <Modal.Content layout="full-width">
      <div className="modal-content">
        <Icon
          id={ICON_ASTRONAUT.id}
          viewBox={ICON_ASTRONAUT.viewBox}
          style={{ width: 80, height: 80 }}
        />
        <h2>
          <Translate zh_hans="欢迎成为创作者" zh_hant="歡迎成為創作者" />
        </h2>

        <span className="support-text">
          <Translate
            zh_hans="因为你发布的精彩评论，你的创作者资格已被激活!"
            zh_hant="因為你發佈的精彩評論，你的創作者資格已被激活！"
          />
          <span className="strong">10 MAT</span>
          <Translate
            zh_hans="奖励也已到位，期待你的第一篇创作。"
            zh_hant="獎勵也已到位，期待你的第一篇創作。"
          />
        </span>
        <WriteButton
          allowed={true}
          CustomButton={({ onClick }) => (
            <Button size="large" bgColor="green" onClick={onClick}>
              <Translate zh_hant="開始創作" zh_hans="开始创作" />
            </Button>
          )}
        />
      </div>
    </Modal.Content>
    <style jsx>{styles}</style>
  </>
)

export default SelfActivationModal
