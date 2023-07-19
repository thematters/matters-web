import jump from 'jump.js'

import { Translate, TranslateProps } from '~/components'

import styles from './styles.module.css'

type LayoutHeaderTitleProps = Partial<TranslateProps>

const LayoutHeaderTitle: React.FC<
  React.PropsWithChildren<LayoutHeaderTitleProps>
> = ({ children, ...props }) => (
  <h1 onClick={() => jump(document.body)} className={styles.title}>
    {children ? children : <Translate {...(props as TranslateProps)} />}
  </h1>
)

export default LayoutHeaderTitle
