import {
  Button,
  DropdownDialog,
  Menu,
  TextIcon,
  Translate,
  withIcon,
} from '~/components'

import { Z_INDEX } from '~/common/enums'

import { ReactComponent as IconArrowDown } from '@/public/static/icons/8px/arrow-down.svg'

type SelectProps = {
  period: number
  onChange: (period: number) => void
}

const SelectPeriod: React.FC<SelectProps> = ({ period, onChange }) => {
  const options = [
    {
      label: (
        <>
          <Translate id="lately" /> 7{' '}
          <Translate en="days" zh_hans="天" zh_hant="天" />
        </>
      ),
      value: 7,
    },
    {
      label: (
        <>
          <Translate id="lately" /> 1{' '}
          <Translate en="month" zh_hans="个月" zh_hant="個月" />
        </>
      ),
      value: 30,
    },
    {
      label: (
        <>
          <Translate id="lately" /> 3{' '}
          <Translate en="months" zh_hans="个月" zh_hant="個月" />
        </>
      ),
      value: 90,
    },
    {
      label: (
        <>
          <Translate id="all" />
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
    <DropdownDialog
      dropdown={{
        appendTo: 'parent',
        content: <AnalyticsSelectContent dropdown />,
        placement: 'bottom-end',
        zIndex: Z_INDEX.OVER_DIALOG,
      }}
      dialog={{
        content: <AnalyticsSelectContent />,
        title: '',
      }}
    >
      {({ openDialog, ref }) => (
        <Button
          size={[null, '1.25rem']}
          spacing={[0, 'xtight']}
          bgColor={'white'}
          onClick={openDialog}
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
    </DropdownDialog>
  )
}

export default SelectPeriod
