import {
  DropdownDialog,
  Form,
  FreePeriod,
  Menu,
  TextIcon,
  Translate,
} from '~/components'

import { Z_INDEX } from '~/common/enums'

interface Props {
  period: number
  onClick: (period: number) => void
}

const options = [1, 3, 6, 12]

const PeriodOptionTitle = (
  <Translate
    zh_hant="免費資格時長"
    zh_hans="免费资格时长"
    en="Free trial period"
  />
)

/**
 * This sub component is for options of circle trial period.
 *
 * Usage:
 *
 * ```tsx
 *   <PeriodOptionContent period={period} onClick={onClick} />
 * ```
 */
const PeriodOptionContent = ({
  period,
  onClick,
  isInDropdown,
}: Props & { isInDropdown?: boolean }) => (
  <section id="period-option">
    <Menu width={isInDropdown ? 'md' : undefined}>
      {options.map((option) => (
        <Menu.Item key={option} onClick={() => onClick(option)}>
          <TextIcon
            spacing="base"
            size="md"
            weight={option === period ? 'bold' : 'normal'}
          >
            <FreePeriod period={option} />
          </TextIcon>
        </Menu.Item>
      ))}
    </Menu>
  </section>
)

/**
 * This component is for rendering options of circle trial period.
 *
 * Usage:
 *
 * ```tsx
 *   <PeriodOption period={period} onClick={onClick}/>
 * ```
 */
const PeriodOption = ({ period, onClick }: Props) => (
  <Form.List groupName={PeriodOptionTitle}>
    <DropdownDialog
      dropdown={{
        appendTo: 'parent',
        content: (
          <PeriodOptionContent period={period} onClick={onClick} isInDropdown />
        ),
        placement: 'bottom-end',
        zIndex: Z_INDEX.OVER_DIALOG,
      }}
      dialog={{
        content: <PeriodOptionContent period={period} onClick={onClick} />,
        title: PeriodOptionTitle,
      }}
    >
      {({ open, ref }) => (
        <Form.List.Item
          title={<FreePeriod period={period} />}
          onClick={open}
          ref={ref}
        />
      )}
    </DropdownDialog>
  </Form.List>
)

export default PeriodOption
