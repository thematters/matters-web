import { useRouter } from 'next/router'

import { PATHS } from '~/common/enums'

import styles from './styles.css'

/**
 * <Layout.FixedMain> is a container component that has the fixed position and
 * width same as the middle column, used by <BottomBar>, <NavBar> and <Toast>.
 *
 */
const FixedMain: React.FC = ({ children }) => {
  const router = useRouter()
  const isSingleColumnPage =
    [PATHS.MIGRATION, PATHS.ABOUT].indexOf(router.pathname) >= 0

  if (isSingleColumnPage) {
    return (
      <div className="fixed-main">
        <div className="l-row full">
          <div className="inner l-col-4 l-col-sm-6 l-offset-sm-1 l-col-md-5 l-offset-md-2 l-col-lg-6 l-offset-lg-3">
            {children}
          </div>
        </div>
        <style jsx>{styles}</style>
      </div>
    )
  }

  return (
    <div className="fixed-main">
      <div className="l-row full">
        <div className="l-col-three-left" />
        <div className="l-col-three-mid inner">{children}</div>
      </div>
      <style jsx>{styles}</style>
    </div>
  )
}

export default FixedMain
