import { Dialog, Translate } from '~/components'

import { redirectToTarget } from '~/common/utils'

const Complete: React.FC = () => {
  return (
    <>
      <Dialog.Message spacing="md">
        <p>
          <Translate
            zh_hant="你的專屬 Liker ID 已就位！"
            zh_hans="你的专属 Liker ID 已就位！"
          />
        </p>
      </Dialog.Message>

      <Dialog.Footer>
        <Dialog.Footer.Button
          onClick={() => {
            redirectToTarget({
              fallback: 'current',
            })
          }}
        >
          <Translate zh_hant="完成" zh_hans="完成" />
        </Dialog.Footer.Button>
      </Dialog.Footer>
    </>
  )
}

export default Complete
