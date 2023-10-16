import { FormattedMessage } from 'react-intl'

import { ReactComponent as IconArrowDown } from '@/public/static/icons/8px/arrow-down.svg'
import { Z_INDEX } from '~/common/enums'
import { Button, Dropdown, Menu, TextIcon, withIcon } from '~/components'

type SelectProps = {
  period: number
  onChange: (period: number) => void
}

const SelectPeriod: React.FC<SelectProps> = ({ period, onChange }) => {
  const options = [
    {
      label: (
        <>
          <FormattedMessage
            defaultMessage="Last 7 days"
            description="src/views/Me/Analytics/SelectPeriod/index.tsx"
          />
        </>
      ),
      value: 7,
    },
    {
      label: (
        <>
          <FormattedMessage
            defaultMessage="Last 1 month"
            description="src/views/Me/Analytics/SelectPeriod/index.tsx"
          />
        </>
      ),
      value: 30,
    },
    {
      label: (
        <>
          <FormattedMessage
            defaultMessage="Last 3 months"
            description="src/views/Me/Analytics/SelectPeriod/index.tsx"
          />
        </>
      ),
      value: 90,
    },
    {
      label: (
        <>
          <FormattedMessage defaultMessage="All" />
        </>
      ),
      value: 0,
    },
  ]

  const AnalyticsSelectContent = ({ dropdown }: { dropdown?: boolean }) => {
    const isSevenDaysActive = period === options[0].value
    const isOneMonthActive = period === options[1].value
    const isThreeMonthsActive = period === options[2].value
    const isAllActive = period === options[3].value

    return (
      <Menu>
        <Menu.Item
          text={options[0].label}
          onClick={() => onChange(options[0].value)}
          weight={isSevenDaysActive ? 'bold' : 'normal'}
        />

        <Menu.Item
          text={options[1].label}
          onClick={() => onChange(options[1].value)}
          weight={isOneMonthActive ? 'bold' : 'normal'}
        />

        <Menu.Item
          text={options[2].label}
          onClick={() => onChange(options[2].value)}
          weight={isThreeMonthsActive ? 'bold' : 'normal'}
        />

        <Menu.Item
          text={options[3].label}
          onClick={() => onChange(options[3].value)}
          weight={isAllActive ? 'bold' : 'normal'}
        />
      </Menu>
    )
  }
  return (
    <Dropdown
      appendTo="parent"
      content={<AnalyticsSelectContent dropdown />}
      zIndex={Z_INDEX.OVER_DIALOG}
    >
      {({ openDropdown, ref }) => (
        <Button
          onClick={openDropdown}
          size={[null, '1.25rem']}
          spacing={[0, 'xtight']}
          bgColor={'white'}
          aria-haspopup="listbox"
          ref={ref}
        >
          <TextIcon
            icon={withIcon(IconArrowDown)({ size: 'xs' })}
            size={'sm'}
            color={'grey'}
            spacing="xxtight"
            textPlacement="left"
          >
            {options.filter((option) => option.value === period)[0].label}
          </TextIcon>
        </Button>
      )}
    </Dropdown>
  )
}

export default SelectPeriod
