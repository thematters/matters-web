import { useState } from 'react'
import { useMutation } from 'react-apollo'

import { BlockUser } from '~/components/GQL/fragments/__generated__/BlockUser'
import { BlockUser as BlockUserMutate } from '~/components/GQL/mutations/__generated__/BlockUser'
import BLOCK_USER from '~/components/GQL/mutations/blockUser'
import { Translate } from '~/components/Language'
import { Modal } from '~/components/Modal'
import ModalComplete from '~/components/Modal/Complete'

import { TEXT } from '~/common/enums'

/**
 * This component is a modal for changing user name.
 *
 * Usage:
 *
 * ```jsx
 *   <BlocKUserModal close={close} />
 * ```
 *
 */

interface Props {
  user: BlockUser
}

type Step = 'confirm' | 'complete'

const BlocKUserModal: React.FC<ModalInstanceProps & Props> = ({
  close,
  user
}) => {
  const [step, setStep] = useState<Step>('confirm')
  const [blockUser] = useMutation<BlockUserMutate>(BLOCK_USER, {
    variables: { id: user.id },
    optimisticResponse: {
      blockUser: {
        id: user.id,
        isBlocked: true,
        __typename: 'User'
      }
    }
  })

  const confirmCallback = () => setStep('complete')

  return (
    <>
      {step === 'confirm' && (
        <>
          <Modal.Content>
            <Translate
              zh_hant={`封鎖之後，${user.displayName} 將無法評論你的作品。`}
              zh_hans={`屏蔽之后，${user.displayName} 将无法评论你的作品。`}
            />
            <br />
            <Translate
              zh_hant="你可以在設置裏管理你的封鎖用戶列表。"
              zh_hans="你可以在设置里管理你的屏蔽用户列表。"
            />
          </Modal.Content>
          <div className="buttons">
            <Modal.FooterButton bgColor="white" onClick={close}>
              <Translate
                zh_hant={TEXT.zh_hant.cancel}
                zh_hans={TEXT.zh_hans.cancel}
              />
            </Modal.FooterButton>
            <Modal.FooterButton
              onClick={async (event: any) => {
                event.stopPropagation()
                await blockUser()
                confirmCallback()
              }}
            >
              <Translate
                zh_hant={TEXT.zh_hant.block}
                zh_hans={TEXT.zh_hans.block}
              />
            </Modal.FooterButton>
          </div>
        </>
      )}
      {step === 'complete' && (
        <ModalComplete
          message={
            <Translate
              zh_hant={TEXT.zh_hant.blockSuccess}
              zh_hans={TEXT.zh_hans.blockSuccess}
            />
          }
        />
      )}
    </>
  )
}

export default BlocKUserModal
