import gql from 'graphql-tag'
import { useContext } from 'react'

import { ADD_TOAST } from '~/common/enums'
import {
  DropdownDialog,
  Form,
  Menu,
  TextIcon,
  Translate,
  useMutation,
  ViewerContext,
} from '~/components'
import { QuoteCurrency, SetCurrencyMutation } from '~/gql/graphql'

const SET_CURRENCY = gql`
  mutation SetCurrency($input: SetCurrencyInput!) {
    setCurrency(input: $input) {
      id
      settings {
        currency
      }
    }
  }
`

const CurrencyConvertor = () => {
  const viewer = useContext(ViewerContext)
  const currency = viewer.settings.currency
  const [setCurrency] = useMutation<SetCurrencyMutation>(SET_CURRENCY)

  const updateCurrency = async (c: QuoteCurrency) => {
    if (!viewer.isAuthed) {
      return
    }

    try {
      await setCurrency({
        variables: { input: { currency: c } },
        optimisticResponse: {
          setCurrency: {
            id: viewer.id,
            settings: {
              currency,
              __typename: 'UserSettings',
            },
            __typename: 'User',
          },
        },
      })
    } catch (e) {
      window.dispatchEvent(
        new CustomEvent(ADD_TOAST, {
          detail: {
            color: 'red',
            content: <Translate id="failureChange" />,
          },
        })
      )
    }
  }

  const isUSDActive = currency === QuoteCurrency.Usd
  const isHKDActive = currency === QuoteCurrency.Hkd
  const isTWDActive = currency === QuoteCurrency.Twd

  const Content = ({ isInDropdown }: { isInDropdown?: boolean }) => (
    <Menu width={isInDropdown ? 'sm' : undefined}>
      <Menu.Item onClick={() => updateCurrency(QuoteCurrency.Usd)}>
        <TextIcon
          spacing="base"
          size="md"
          weight={isUSDActive ? 'bold' : 'normal'}
        >
          {QuoteCurrency.Usd}
        </TextIcon>
      </Menu.Item>
      <Menu.Item onClick={() => updateCurrency(QuoteCurrency.Hkd)}>
        <TextIcon
          spacing="base"
          size="md"
          weight={isHKDActive ? 'bold' : 'normal'}
        >
          {QuoteCurrency.Hkd}
        </TextIcon>
      </Menu.Item>
      <Menu.Item onClick={() => updateCurrency(QuoteCurrency.Twd)}>
        <TextIcon
          spacing="base"
          size="md"
          weight={isTWDActive ? 'bold' : 'normal'}
        >
          {QuoteCurrency.Twd}
        </TextIcon>
      </Menu.Item>
    </Menu>
  )

  const Title = () => {
    return <Translate zh_hant="匯率幣別" zh_hans="汇率币别" en="Currency" />
  }

  return (
    <DropdownDialog
      dropdown={{
        content: <Content isInDropdown />,
        placement: 'bottom-end',
      }}
      dialog={{
        content: <Content />,
        title: <Title />,
      }}
    >
      {({ openDialog, type, ref }) => (
        <Form.List.Item
          title={<Title />}
          onClick={openDialog}
          rightText={currency}
          ariaHasPopup={type}
          role="button"
          ref={ref}
        />
      )}
    </DropdownDialog>
  )
}

export default CurrencyConvertor
