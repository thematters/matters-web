import gql from 'graphql-tag'

export default gql`
  query ExchangeRates($from: TransactionCurrency, $to: QuoteCurrency) {
    exchangeRates(input: { from: $from, to: $to }) {
      from
      to
      rate
      updatedAt
    }
  }
`
