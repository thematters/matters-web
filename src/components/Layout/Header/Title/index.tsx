import jump from 'jump.js'

import { Title, Translate, TranslateProps } from '~/components'

const LayoutHeaderTitle: React.FC<React.PropsWithChildren<TranslateProps>> = ({
  children,
  ...props
}) => (
  <Title type="nav" is="h1" onClick={() => jump(document.body)}>
    {children ? children : <Translate {...props} />}
  </Title>
)

export default LayoutHeaderTitle
