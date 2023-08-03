import gql from 'graphql-tag'
import { useContext } from 'react'

import {
  Dropdown,
  Form,
  Menu,
  toast,
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
      toast.error({
        message: <Translate id="failureChange" />,
      })
    }
  }

  const isUSDActive = currency === QuoteCurrency.Usd
  const isHKDActive = currency === QuoteCurrency.Hkd
  const isTWDActive = currency === QuoteCurrency.Twd

  const Content = () => (
    <Menu>
      <Menu.Item
        text={QuoteCurrency.Usd}
        onClick={() => updateCurrency(QuoteCurrency.Usd)}
        weight={isUSDActive ? 'bold' : 'normal'}
      />

      <Menu.Item
        text={QuoteCurrency.Hkd}
        onClick={() => updateCurrency(QuoteCurrency.Hkd)}
        weight={isHKDActive ? 'bold' : 'normal'}
      />

      <Menu.Item
        text={QuoteCurrency.Twd}
        onClick={() => updateCurrency(QuoteCurrency.Twd)}
        weight={isTWDActive ? 'bold' : 'normal'}
      />
    </Menu>
  )

  const Title = () => {
    return <Translate zh_hant="匯率幣別" zh_hans="汇率币别" en="Currency" />
  }

  return (
    <Dropdown content={<Content />}>
      {({ openDropdown, ref }) => (
        <Form.List.Item
          title={<Title />}
          onClick={openDropdown}
          rightText={currency}
          ariaHasPopup="listbox"
          role="button"
          ref={ref}
        />
      )}
    </Dropdown>
  )
}

export default CurrencyConvertor
