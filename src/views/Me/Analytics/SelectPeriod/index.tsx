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
            defaultMessage="Last {days} days"
            description="src/views/Me/Analytics/SelectPeriod/index.tsx"
            values={{
              days: 7,
            }}
          />
        </>
      ),
      value: 7,
    },
    {
      label: (
        <>
          <FormattedMessage
            defaultMessage="Last {month} month"
            description="src/views/Me/Analytics/SelectPeriod/index.tsx"
            values={{
              month: 1,
            }}
          />
        </>
      ),
      value: 30,
    },
    {
      label: (
        <>
          <FormattedMessage
            defaultMessage="Last {months} months"
            description="src/views/Me/Analytics/SelectPeriod/index.tsx"
            values={{
              months: 3,
            }}
          />
        </>
      ),
      value: 90,
    },
    {
      label: (
        <>
          <FormattedMessage defaultMessage="All" description="" />
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
      <Menu width="sm">
        <Menu.Item onClick={() => onChange(options[0].value)}>
          <TextIcon
            spacing="base"
            size="sm"
            weight={isSevenDaysActive ? 'bold' : 'normal'}
          >
            {options[0].label}
          </TextIcon>
        </Menu.Item>
        <Menu.Item onClick={() => onChange(options[1].value)}>
          <TextIcon
            spacing="base"
            size="sm"
            weight={isOneMonthActive ? 'bold' : 'normal'}
          >
            {options[1].label}
          </TextIcon>
        </Menu.Item>
        <Menu.Item onClick={() => onChange(options[2].value)}>
          <TextIcon
            spacing="base"
            size="sm"
            weight={isThreeMonthsActive ? 'bold' : 'normal'}
          >
            {options[2].label}
          </TextIcon>
        </Menu.Item>
        <Menu.Item onClick={() => onChange(options[3].value)}>
          <TextIcon
            spacing="base"
            size="sm"
            weight={isAllActive ? 'bold' : 'normal'}
          >
            {options[3].label}
          </TextIcon>
        </Menu.Item>
      </Menu>
    )
  }
  return (
    <Dropdown
      appendTo="parent"
      content={<AnalyticsSelectContent dropdown />}
      zIndex={Z_INDEX.OVER_DIALOG}
    >
      {({ ref }) => (
        <Button
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
