import { ReactNode, useState } from 'react'

import { Button, IconUp, TextIcon } from '~/components'

import styles from './styles.css'

const Collapsable: React.FC<{
  title: ReactNode
  defaultCollapsed?: boolean
}> = ({ children, title, defaultCollapsed = true }) => {
  const [collapsed, toggleCollapse] = useState(defaultCollapsed)

  return (
    <section className={collapsed ? 'collapsed' : 'expanded'}>
      <div>
        <Button
          onClick={() => {
            toggleCollapse(!collapsed)
          }}
        >
          <TextIcon
            icon={
              <IconUp
                style={{
                  transform: `rotate(${collapsed ? 180 : 0}deg)`,
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
        </Button>
      </div>

      {!collapsed && children}

      <style jsx>{styles}</style>
    </section>
  )
}

export default Collapsable
