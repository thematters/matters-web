import getConfig from 'next/config'

import { Dialog, Form, Translate } from '~/components'

import Hint from './Hint'
import Intro from './Intro'
import styles from './styles.css'

interface SelectProps {
  startGenerate: () => void
  startBind: (windowRef: Window) => void
}

const {
  publicRuntimeConfig: { OAUTH_URL }
} = getConfig()

const Select: React.FC<SelectProps> = ({ startGenerate, startBind }) => {
  return (
    <Form>
      <Dialog.Content spacing={[0, 0]}>
        <Hint />

        <Form.ClickableArea
          title={<Translate zh_hant="生成 Liker ID" zh_hans="生成 Liker ID" />}
          subtitle={
            <Translate
              zh_hant="同意 Matters 帮我创建 Liker ID"
              zh_hans="同意 Matters 帮我创建 Liker ID"
            />
          }
          onClick={startGenerate}
        />

        <Form.ClickableArea
          title={<Translate zh_hant="綁定 Liker ID" zh_hans="綁定 Liker ID" />}
          subtitle={
            <Translate
              zh_hant="跳轉到 like.co 驗證已有 Liker ID"
              zh_hans="跳转到 like.co 验证已有 Liker ID"
            />
          }
          collapseTop
          onClick={() => {
            const url = `${OAUTH_URL}/likecoin`
            const windowRef = window.open(url, '_blank')

            if (windowRef) {
              startBind(windowRef)
            }
          }}
        />

        <Intro />
      </Dialog.Content>

      <style jsx>{styles}</style>
    </Form>
  )
}

export default Select
