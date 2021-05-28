import { DropdownDialog, Menu, Select, Translate } from '~/components'

import { Z_INDEX } from '~/common/enums'

import styles from './styles.css'

interface Props {
  period: number
  onClick: (period: number) => void
}

const options = [30, 90, 180, 360]

const SelectPeriodTitle = (
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
 *   <PeriodOptions period={period} onClick={onClick} />
 * ```
 */
const PeriodOptions = ({
  period,
  onClick,
  isInDropdown,
}: Props & { isInDropdown?: boolean }) => (
  <Menu width={isInDropdown ? 'md' : undefined}>
    {options.map((option) => (
      <Select.Option
        title={
          <>
            {option} <Translate id="days" />
          </>
        }
        selected={option === period}
        expanded
        onClick={() => onClick(option)}
        key={option}
      />
    ))}
  </Menu>
)

/**
 * This component is for rendering selected option of circle trial period.
 *
 * Usage:
 *
 * ```tsx
 *   <SelectPeriod period={period} onClick={onClick}/>
 * ```
 */
const SelectPeriod = ({ period, onClick }: Props) => (
  <section className="container">
    <h3 className="title">{SelectPeriodTitle}</h3>

    <Select>
      <DropdownDialog
        dropdown={{
          appendTo: 'parent',
          content: (
            <PeriodOptions period={period} onClick={onClick} isInDropdown />
          ),
          placement: 'bottom-end',
          zIndex: Z_INDEX.OVER_DIALOG,
        }}
        dialog={{
          content: <PeriodOptions period={period} onClick={onClick} />,
          title: SelectPeriodTitle,
        }}
      >
        {({ open, ref }) => (
          <Select.Option
            title={
              <>
                {period} <Translate id="days" />
              </>
            }
            selected
            onClick={open}
            ref={ref}
          />
        )}
      </DropdownDialog>
    </Select>

    <style jsx>{styles}</style>
  </section>
)

export default SelectPeriod
