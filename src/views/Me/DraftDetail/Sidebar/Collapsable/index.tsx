import { ReactNode, useState } from 'react'

import { Icon, TextIcon } from '~/components'

import styles from './styles.css'

const Collapsable: React.FC<{
  title: ReactNode
  defaultCollapsed?: boolean
}> = ({ children, title, defaultCollapsed = true }) => {
  const [collapsed, toggleCollapse] = useState(defaultCollapsed)

  return (
    <section className={collapsed ? 'collapsed' : 'expanded'}>
      <div>
        <button
          type="button"
          onClick={() => {
            toggleCollapse(!collapsed)
          }}
        >
          <TextIcon
            icon={
              <Icon.Up
                style={{
                  transform: `rotate(${collapsed ? 180 : 0}deg)`
                }}
              />
            }
            size="md"
            weight="md"
            spacing="xtight"
            textPlacement="left"
          >
            {title}
          </TextIcon>
        </button>
      </div>

      {!collapsed && children}

      <style jsx>{styles}</style>
    </section>
  )
}

export default Collapsable
