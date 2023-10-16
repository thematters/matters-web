import { Z_INDEX } from '~/common/enums'
import {
  Button,
  Dropdown,
  IconArrowDown16,
  Menu,
  TextIcon,
  Translate,
} from '~/components'

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

type CurrencySwitchContentProps = CurrencySwitchProps

const CurrencySwitchContent: React.FC<CurrencySwitchContentProps> = ({
  currency,
  setCurrency,
}) => {
  return (
    <Menu>
      <Menu.Item
        text={<Translate zh_hans="全部" zh_hant="全部" en="All" />}
        onClick={() => setCurrency(Currency.ALL)}
        weight={currency === Currency.ALL ? 'bold' : 'normal'}
      />

      <Menu.Item
        text={Currency.USDT}
        onClick={() => setCurrency(Currency.USDT)}
        weight={currency === Currency.USDT ? 'bold' : 'normal'}
      />

      <Menu.Item
        text={Currency.HKD}
        onClick={() => setCurrency(Currency.HKD)}
        weight={currency === Currency.HKD ? 'bold' : 'normal'}
      />

      <Menu.Item
        text={Currency.LIKE}
        onClick={() => setCurrency(Currency.LIKE)}
        weight={currency === Currency.LIKE ? 'bold' : 'normal'}
      />
    </Menu>
  )
}

export const CurrencySwitch: React.FC<CurrencySwitchProps> = ({
  currency,
  setCurrency,
}) => {
  return (
    <Dropdown
      content={
        <CurrencySwitchContent currency={currency} setCurrency={setCurrency} />
      }
      zIndex={Z_INDEX.OVER_DIALOG}
    >
      {({ openDropdown, ref }) => (
        <Button onClick={openDropdown} aria-haspopup="listbox" ref={ref}>
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
    </Dropdown>
  )
}
