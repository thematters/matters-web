import { Button } from '~/components'

export default (props: { [key: string]: any }) => (
  <Button
    is="button"
    size="large"
    bgColor="transparent"
    spacing="default"
    className="u-link-green"
    {...props}
  >
    登入
  </Button>
)
