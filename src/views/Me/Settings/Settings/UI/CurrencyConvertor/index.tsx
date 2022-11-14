import gql from 'graphql-tag'
import { useContext } from 'react'

import {
  DropdownDialog,
  Form,
  Menu,
  TextIcon,
  Translate,
  useMutation,
  ViewerContext,
} from '~/components'

import { ADD_TOAST } from '~/common/enums'

import { QuoteCurrency } from '@/__generated__/globalTypes'
import { SetCurrency } from './__generated__/SetCurrency'

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
  const [setCurrency] = useMutation<SetCurrency>(SET_CURRENCY)

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

  const isUSDActive = currency === QuoteCurrency.USD
  const isHKDActive = currency === QuoteCurrency.HKD
  const isTWDActive = currency === QuoteCurrency.TWD

  const Content = ({ isInDropdown }: { isInDropdown?: boolean }) => (
    <Menu width={isInDropdown ? 'sm' : undefined}>
      <Menu.Item onClick={() => updateCurrency(QuoteCurrency.USD)}>
        <TextIcon
          spacing="base"
          size="md"
          weight={isUSDActive ? 'bold' : 'normal'}
        >
          {QuoteCurrency.USD}
        </TextIcon>
      </Menu.Item>
      <Menu.Item onClick={() => updateCurrency(QuoteCurrency.HKD)}>
        <TextIcon
          spacing="base"
          size="md"
          weight={isHKDActive ? 'bold' : 'normal'}
        >
          {QuoteCurrency.HKD}
        </TextIcon>
      </Menu.Item>
      <Menu.Item onClick={() => updateCurrency(QuoteCurrency.TWD)}>
        <TextIcon
          spacing="base"
          size="md"
          weight={isTWDActive ? 'bold' : 'normal'}
        >
          {QuoteCurrency.TWD}
        </TextIcon>
      </Menu.Item>
    </Menu>
  )

  return (
    <DropdownDialog
      dropdown={{
        content: <Content isInDropdown />,
        placement: 'bottom-end',
      }}
      dialog={{
        content: <Content />,
        title: (
          <Translate zh_hant="修改幣種" zh_hans="修改币种" en="Currency" />
        ),
      }}
    >
      {({ openDialog, ref }) => (
        <Form.List.Item
          title={
            <Translate zh_hant="匯率幣別" zh_hans="汇率币别" en="Currency" />
          }
          onClick={openDialog}
          rightText={currency}
          ref={ref}
        />
      )}
    </DropdownDialog>
  )
}

export default CurrencyConvertor
