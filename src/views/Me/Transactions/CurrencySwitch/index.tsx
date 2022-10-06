import { useContext } from 'react'

import { Z_INDEX } from '~/common/enums'

import {
  Button,
  DropdownDialog,
  IconArrowDown16,
  LanguageContext,
  Menu,
  TextIcon,
  Translate,
} from '@/src/components'

export enum Currency {
  ALL = 'ALL',
  HKD = 'HKD',
  LIKE = 'LIKE',
}

const CURRENT_TEXT_MAP = {
  zh_hant: {
    ALL: '全部',
    HKD: '港幣',
    LIKE: 'LIKE',
  },
  zh_hans: {
    ALL: '全部',
    HKD: '港币',
    LIKE: 'LIKE',
  },
  en: {
    ALL: 'ALL',
    HKD: 'HKD',
    LIKE: 'LIKE',
  },
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
  const { lang } = useContext(LanguageContext)
  return (
    <Menu width={isInDropdown ? 'sm' : undefined}>
      <Menu.Item onClick={() => setCurrency(Currency.ALL)}>
        <TextIcon
          spacing="base"
          size="md"
          weight={currency === Currency.ALL ? 'bold' : 'normal'}
        >
          {CURRENT_TEXT_MAP[lang][Currency.ALL]}
        </TextIcon>
      </Menu.Item>

      <Menu.Item onClick={() => setCurrency(Currency.HKD)}>
        <TextIcon
          spacing="base"
          size="md"
          weight={currency === Currency.HKD ? 'bold' : 'normal'}
        >
          {CURRENT_TEXT_MAP[lang][Currency.HKD]}
        </TextIcon>
      </Menu.Item>

      <Menu.Item onClick={() => setCurrency(Currency.LIKE)}>
        <TextIcon
          spacing="base"
          size="md"
          weight={currency === Currency.LIKE ? 'bold' : 'normal'}
        >
          LIKE
        </TextIcon>
      </Menu.Item>
    </Menu>
  )
}

export const CurrencySwitch: React.FC<CurrencySwitchProps> = ({
  currency,
  setCurrency,
}) => {
  const { lang } = useContext(LanguageContext)
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
            <Translate zh_hant="幣種：" zh_hans="币种：" en="Currency:&nbsp;" />
            {CURRENT_TEXT_MAP[lang][currency]}
          </TextIcon>
        </Button>
      )}
    </DropdownDialog>
  )
}
