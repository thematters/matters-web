import { Translate, TranslateProps } from '~/components'

import styles from './styles.css'

const Title: React.FC<TranslateProps> = ({ children, ...props }) => (
  <h1>
    {children ? children : <Translate {...props} />}

    <style jsx>{styles}</style>
  </h1>
)

export default Title
