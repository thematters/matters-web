import jump from 'jump.js'

import { Title, Translate, TranslateProps } from '~/components'

type LayoutHeaderTitleProps = Partial<TranslateProps>

const LayoutHeaderTitle: React.FC<
  React.PropsWithChildren<LayoutHeaderTitleProps>
> = ({ children, ...props }) => (
  <Title type="nav" is="h1" onClick={() => jump(document.body)}>
    {children ? children : <Translate {...(props as TranslateProps)} />}
  </Title>
)

export default LayoutHeaderTitle
