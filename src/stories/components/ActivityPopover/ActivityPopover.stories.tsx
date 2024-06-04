import { Meta, StoryFn } from '@storybook/react'
import React from 'react'
import { FormattedMessage } from 'react-intl'

import { ReactComponent as IconNavCreate } from '@/public/static/icons/24px/nav-create.svg'
import { Dropdown, Icon } from '~/components'
import Activity from '~/components/Layout/SideNav/Activity'
import NavListItem from '~/components/Layout/SideNav/NavListItem'

export default {
  title: 'Components/Layout/SideNav/Activity',
  component: Activity,
} satisfies Meta<typeof Activity>

const Template: StoryFn = () => {
  return (
    <Dropdown
      content={
        <section>
          <Activity />
        </section>
      }
      placement="right-start"
      offset={[-16, 16]}
    >
      {({ openDropdown, ref }) => (
        <NavListItem
          onClick={openDropdown}
          name={<FormattedMessage defaultMessage="My Page" id="enMIYK" />}
          icon={<Icon icon={IconNavCreate} size={32} />}
          activeIcon={<Icon icon={IconNavCreate} size={32} />}
          active={false}
          canScrollTop={false}
          aria-haspopup="menu"
          ref={ref}
        />
      )}
    </Dropdown>
  )
}

export const Popover = Template.bind({})
