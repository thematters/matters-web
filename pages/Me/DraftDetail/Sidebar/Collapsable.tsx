import _get from 'lodash/get'
import { FC, ReactNode, useState } from 'react'

import { Icon, TextIcon } from '~/components'

import COLLAPSE_BRANCH from '~/static/icons/collapse-branch.svg?sprite'

import styles from './styles.css'

const Collapsable: FC<{ title: ReactNode }> = ({ children, title }) => {
  const [collapsed, toggleCollapse] = useState(true)

  return (
    <>
      <div
        onClick={() => {
          toggleCollapse(!collapsed)
        }}
        className={`sidebar-title-${collapsed ? 'collapsed' : 'expanded'}`}
      >
        <TextIcon
          icon={
            <Icon
              id={COLLAPSE_BRANCH.id}
              viewBox={COLLAPSE_BRANCH.viewBox}
              style={{
                width: 14,
                height: 14,
                transform: `rotate(${collapsed ? 180 : 0}deg)`
              }}
            />
          }
          className={'sidebar-title'}
          textPlacement={'left'}
        >
          {title}
        </TextIcon>
      </div>
      {!collapsed && children}
      <hr />
      <style jsx>{styles}</style>
    </>
  )
}

export default Collapsable
