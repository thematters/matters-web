import { Translate, TranslateProps } from '~/components'

import styles from './styles.css'

const Title: React.FC<TranslateProps> = props => (
  <h1>
    <Translate {...props} />
    <style jsx>{styles}</style>
  </h1>
)

export default Title
