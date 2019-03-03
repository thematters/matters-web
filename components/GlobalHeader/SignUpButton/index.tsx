import { Button } from '~/components/Button'
import { Translate } from '~/components/Language'
export default (props: { [key: string]: any }) => (
  <Button
    is="button"
    size="large"
    bgColor="green"
    style={{ width: 80 }}
    {...props}
  >
    <Translate zh_hant="註冊" zh_hans="注册" />
  </Button>
)
