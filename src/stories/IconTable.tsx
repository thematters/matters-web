import React from 'react'

import { IconLogo, IconProps, Tooltip } from '~/components'

const icons = require.context('~/components/Icon', false, /\/Icon.+\.tsx$/)

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
          <IconLogo {...props} />
        </span>
      </Tooltip>

      {/* Other Icons */}
      <div className="container">
        {icons
          .keys()
          .filter((key) => !LOGO_REQUEST.test(key))
          .map((key) => {
            const module = icons(key)
            return (
              <>
                {Object.keys(module).map((exportedName) => (
                  <Tooltip key={exportedName} content={exportedName}>
                    <span>
                      {React.createElement(module[exportedName], props)}
                    </span>
                  </Tooltip>
                ))}
              </>
            )
          })}
      </div>
      <style jsx>{`
        .container {
          margin-top: 8px;
          display: grid;
          grid-gap: 12px;
          grid-template-columns: repeat(auto-fit, minmax(12px, 64px));
        }
      `}</style>
    </>
  )
}
