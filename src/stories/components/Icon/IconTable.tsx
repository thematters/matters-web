import React from 'react'

import { ReactComponent as IconLogo } from '@/public/static/icons/logo.svg'
import { Icon, IconProps, Tooltip } from '~/components'

import styles from './styles.module.css'

const icons = require.context(
  '~/components/Icon',
  false,
  /\/Icon(?!.*\.test\.tsx$).+\.tsx$/
)

// Metters' Logo is not a square
const LOGO_REQUEST = /IconLogo/

/**
 * Hover a icon to display a module name and import it from '~/components'
 */
export default function IconTable(props: IconProps) {
  return (
    <>
      {/* Logo */}
      <Tooltip content={'IconLogo'}>
        <span>
          <Icon icon={IconLogo} {...props} />
        </span>
      </Tooltip>

      {/* Other Icons */}
      <div className={styles.container}>
        {icons
          .keys()
          .filter((key) => !LOGO_REQUEST.test(key))
          .map((key) => {
            const mod = icons(key)
            return (
              <>
                {Object.keys(mod).map((exportedName) => (
                  <Tooltip key={exportedName} content={exportedName}>
                    <span>{React.createElement(mod[exportedName], props)}</span>
                  </Tooltip>
                ))}
              </>
            )
          })}
      </div>
    </>
  )
}
