import gql from 'graphql-tag'
import { useContext } from 'react'
import { FormattedMessage } from 'react-intl'

import {
  Dropdown,
  Menu,
  TableView,
  toast,
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

const Currency = () => {
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
    } catch {
      toast.error({
        message: (
          <FormattedMessage
            defaultMessage="Failed to edit, please try again."
            id="USOHRK"
          />
        ),
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

  return (
    <Dropdown content={<Content />}>
      {({ openDropdown, ref }) => (
        <TableView.Cell
          title={
            <FormattedMessage
              defaultMessage="Currency"
              id="cQYXjl"
              description="src/views/Me/Settings/Misc/Currency/index.tsx"
            />
          }
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

export default Currency
