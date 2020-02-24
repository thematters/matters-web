import getConfig from 'next/config'

import { Dialog, Form, Translate } from '~/components'

import Hint from './Hint'
import Intro from './Intro'

interface SelectProps {
  startGenerate: () => void
  startBind: (windowRef: Window) => void
}

const {
  publicRuntimeConfig: { OAUTH_URL }
} = getConfig()

const Select: React.FC<SelectProps> = ({ startGenerate, startBind }) => {
  return (
    <Dialog.Content spacing={[0, 0]}>
      <Hint />

      <Form.List>
        <Form.List.Item
          title={<Translate zh_hant="生成 Liker ID" zh_hans="生成 Liker ID" />}
          subtitle={
            <Translate
              zh_hant="同意 Matters 帮我创建 Liker ID"
              zh_hans="同意 Matters 帮我创建 Liker ID"
            />
          }
          onClick={startGenerate}
        />
        <Form.List.Item
          title={<Translate zh_hant="綁定 Liker ID" zh_hans="綁定 Liker ID" />}
          subtitle={
            <Translate
              zh_hant="跳轉到 like.co 驗證已有 Liker ID"
              zh_hans="跳转到 like.co 验证已有 Liker ID"
            />
          }
          onClick={() => {
            const url = `${OAUTH_URL}/likecoin`
            const windowRef = window.open(url, '_blank')

            if (windowRef) {
              startBind(windowRef)
            }
          }}
        />
      </Form.List>

      <Intro />
    </Dialog.Content>
  )
}

export default Select
