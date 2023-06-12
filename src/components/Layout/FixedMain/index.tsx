import classNames from 'classnames'

import { useRoute } from '~/components'

import styles from './styles.module.css'

/**
 * <Layout.FixedMain> is a container component that has the fixed position and
 * width same as the middle column, used by <BottomBar>, <NavBar> and <Toast>.
 *
 */
type FixedMainProps = {
  children?: React.ReactNode
}

const FixedMain: React.FC<FixedMainProps> = ({ children }) => {
  const { isInPath } = useRoute()
  const isSingleColumnPage = isInPath('MIGRATION') || isInPath('ABOUT')

  const classes = classNames({
    [styles.fixedMain]: true,
    fixedMain: true, // global selector
    [styles.singleCol]: isSingleColumnPage,
  })

  if (isSingleColumnPage) {
    return (
      <div className={classes}>
        <div className="l-container full">
          <div className="l-row">
            <div className={styles.content}>{children}</div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={classes}>
      <div className="l-container full">
        <div className="l-row">
          <div className={`l-col-three-mid ${styles.content}`}>{children}</div>
        </div>
      </div>
    </div>
  )
}

export default FixedMain
