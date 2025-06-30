import _omit from 'lodash/omit'
import { forwardRef } from 'react'

import { Z_INDEX } from '~/common/enums'
import { Button, ButtonProps, TextIcon, Tooltip } from '~/components'

type NavButtonProps = {
  name: React.ReactNode
  icon: React.ReactNode
  activeIcon: React.ReactNode
  active: boolean
  canScrollTop?: boolean
  showTooltip?: boolean
} & ButtonProps

const NavButton = forwardRef<
  HTMLButtonElement | HTMLAnchorElement | HTMLSpanElement,
  NavButtonProps
>(
  (
    {
      name,
      icon,
      activeIcon,
      active,
      onClick,
      showTooltip = true,
      ...props
    }: NavButtonProps,
    ref
  ) => {
    if (!showTooltip) {
      return (
        <Button
          bgActiveColor="greyLighter"
          size={['2rem', '2rem']}
          ref={ref}
          {..._omit(props, ['canScrollTop'])}
          onClick={onClick}
        >
          <TextIcon
            icon={active ? activeIcon : icon}
            size={32}
            weight="semibold"
            spacing={12}
            color="black"
          />
        </Button>
      )
    }

    return (
      <Tooltip
        content={name}
        placement="left"
        delay={[1000, null]}
        zIndex={Z_INDEX.OVER_STICKY_TABS}
      >
        <Button
          bgActiveColor="greyLighter"
          size={['2rem', '2rem']}
          ref={ref}
          {...props}
          onClick={onClick}
        >
          <TextIcon
            icon={active ? activeIcon : icon}
            size={32}
            weight="semibold"
            spacing={12}
            color="black"
          />
        </Button>
      </Tooltip>
    )
  }
)

NavButton.displayName = 'NavButton'

export default NavButton
