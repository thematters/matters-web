import { LoginButton, Translate } from '~/components'

import { ADD_TOAST } from '~/common/enums'

import AppreciateButton from './AppreciateButton'

const AnonymousButton = ({
  count,
  total,
}: {
  count?: number
  total: number
}) => (
  <AppreciateButton
    count={count}
    total={total}
    onClick={() => {
      window.dispatchEvent(
        new CustomEvent(ADD_TOAST, {
          detail: {
            color: 'green',
            content: (
              <Translate
                zh_hant="請登入／註冊為作者打賞，你的拍手將為作者帶來收入"
                zh_hans="请登入／注册为作者打赏，你的拍手将为作者带来收入"
              />
            ),
            customButton: <LoginButton isPlain />,
            buttonPlacement: 'center',
          },
        })
      )
    }}
  />
)

export default AnonymousButton
