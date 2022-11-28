import {
  Button,
  DropdownDialog,
  IconArrowDown16,
  Menu,
  TextIcon,
  Translate,
} from '~/components'

import { Z_INDEX } from '~/common/enums'

export enum Currency {
  ALL = 'ALL',
  USDT = 'USDT',
  HKD = 'HKD',
  LIKE = 'LIKE',
}

interface CurrencySwitchProps {
  currency: Currency
  setCurrency: (currency: Currency) => void
}

type CurrencySwitchContentProps = CurrencySwitchProps & {
  isInDropdown?: boolean
}

const CurrencySwitchContent: React.FC<CurrencySwitchContentProps> = ({
  currency,
  setCurrency,
  isInDropdown,
}) => {
  return (
    <Menu width={isInDropdown ? 'sm' : undefined}>
      <Menu.Item onClick={() => setCurrency(Currency.ALL)}>
        <TextIcon
          spacing="base"
          size="md"
          weight={currency === Currency.ALL ? 'bold' : 'normal'}
        >
          <Translate zh_hans="全部" zh_hant="全部" en="All" />
        </TextIcon>
      </Menu.Item>

      <Menu.Item onClick={() => setCurrency(Currency.USDT)}>
        <TextIcon
          spacing="base"
          size="md"
          weight={currency === Currency.USDT ? 'bold' : 'normal'}
        >
          {Currency.USDT}
        </TextIcon>
      </Menu.Item>

      <Menu.Item onClick={() => setCurrency(Currency.HKD)}>
        <TextIcon
          spacing="base"
          size="md"
          weight={currency === Currency.HKD ? 'bold' : 'normal'}
        >
          {Currency.HKD}
        </TextIcon>
      </Menu.Item>

      <Menu.Item onClick={() => setCurrency(Currency.LIKE)}>
        <TextIcon
          spacing="base"
          size="md"
          weight={currency === Currency.LIKE ? 'bold' : 'normal'}
        >
          {Currency.LIKE}
        </TextIcon>
      </Menu.Item>
    </Menu>
  )
}

export const CurrencySwitch: React.FC<CurrencySwitchProps> = ({
  currency,
  setCurrency,
}) => {
  return (
    <DropdownDialog
      dropdown={{
        content: (
          <CurrencySwitchContent
            isInDropdown
            currency={currency}
            setCurrency={setCurrency}
          />
        ),
        placement: 'bottom-end',
        zIndex: Z_INDEX.OVER_DIALOG,
      }}
      dialog={{
        content: (
          <CurrencySwitchContent
            currency={currency}
            setCurrency={setCurrency}
          />
        ),
        title: <Translate zh_hant="幣種" zh_hans="币种" en="Currency" />,
      }}
    >
      {({ openDialog, ref }) => (
        <Button onClick={openDialog} ref={ref}>
          <TextIcon
            icon={<IconArrowDown16 />}
            textPlacement="left"
            color="grey"
          >
            {currency === Currency.ALL ? (
              <Translate zh_hans="全部" zh_hant="全部" en="All" />
            ) : (
              currency
            )}
          </TextIcon>
        </Button>
      )}
    </DropdownDialog>
  )
}
