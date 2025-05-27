import { Meta, StoryFn } from '@storybook/react'
import React from 'react'
import { FormattedMessage } from 'react-intl'

import IconCircleTimes from '@/public/static/icons/24px/circle-times.svg'
import IconNavCreate from '@/public/static/icons/24px/nav-create.svg'
import {
  Dropdown,
  hidePopperOnClick,
  Icon,
  useDialogSwitch,
} from '~/components'
import MomentNavBanner from '~/components/Layout/NavBar/MomentNavBanner'
import NavPopover from '~/components/Layout/NavBar/NavPopover'
import Activity from '~/components/Layout/SideNav/Activity'
import NavListItem from '~/components/Layout/SideNav/NavListItem'

export default {
  title: 'Components/Layout/SideNav/Activity',
  component: Activity,
} satisfies Meta<typeof Activity>

export const ActivityPopover: StoryFn = () => (
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
        name={<FormattedMessage defaultMessage="Create" id="VzzYJk" />}
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

export const ActivityPopoverMobile: StoryFn = () => {
  const {
    show,
    openDialog: openDropdown,
    closeDialog: closeDropdown,
  } = useDialogSwitch(false)

  const toggle = () => (show ? closeDropdown() : openDropdown())
  return (
    <Dropdown
      arrow={true}
      onHidden={closeDropdown}
      onClickOutside={closeDropdown}
      visible={show}
      content={<NavPopover />}
      placement="top"
      onShown={hidePopperOnClick}
      offset={[0, 12]} // 16px - 4px (default tippy padding)
      theme="mobile"
    >
      {({ ref }) => (
        <NavListItem
          onClick={toggle}
          name={<FormattedMessage defaultMessage="Create" id="VzzYJk" />}
          icon={<Icon icon={IconNavCreate} size={32} />}
          activeIcon={<Icon icon={IconCircleTimes} size={32} />}
          active={show}
          canScrollTop={false}
          aria-haspopup="menu"
          ref={ref}
        />
      )}
    </Dropdown>
  )
}

// this is for marketing
export const ActivityBanner: StoryFn = () => {
  const {
    show,
    openDialog: openDropdown,
    closeDialog: closeDropdown,
  } = useDialogSwitch(false)
  const toggle = () => (show ? closeDropdown() : openDropdown())

  return (
    <Dropdown
      content={
        <section>
          <MomentNavBanner onClick={() => {}} />
        </section>
      }
      visible={show}
      placement="top"
      arrow={true}
      theme="banner"
    >
      {({ ref }) => (
        <NavListItem
          onClick={toggle}
          name={<FormattedMessage defaultMessage="Create" id="VzzYJk" />}
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
