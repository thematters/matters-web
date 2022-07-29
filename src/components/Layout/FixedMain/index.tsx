import { useRoute } from '~/components'

import styles from './styles.css'

/**
 * <Layout.FixedMain> is a container component that has the fixed position and
 * width same as the middle column, used by <BottomBar>, <NavBar> and <Toast>.
 *
 */
const FixedMain: React.FC<React.PropsWithChildren<React.ReactNode>> = ({
  children,
}) => {
  const { isInPath } = useRoute()
  const isSingleColumnPage = isInPath('MIGRATION') || isInPath('ABOUT')

  if (isSingleColumnPage) {
    return (
      <div className="fixed-main single-col">
        <div className="l-container full">
          <div className="l-row">
            <div className="content">{children}</div>
          </div>
        </div>

        <style jsx>{styles}</style>
      </div>
    )
  }

  return (
    <div className="fixed-main">
      <div className="l-container full">
        <div className="l-row">
          <div className="l-col-three-mid content">{children}</div>
        </div>
      </div>

      <style jsx>{styles}</style>
    </div>
  )
}

export default FixedMain
