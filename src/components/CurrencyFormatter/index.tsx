import styles from './styles.css'

interface Props {
  currency: number
  currencyCode: string
  subCurrency?: number
  subCurrencyCode?: string
}

export const CurrencyFormatter: React.FC<Props> = ({
  currency,
  currencyCode,
  subCurrency,
  subCurrencyCode,
}) => {
  return (
    <span className="currencyFormatter">
      <span className="currency">
        {currencyCode}&nbsp;{currency}
      </span>
      {subCurrency && (
        <span className="subCurrency">
          ≈&nbsp;{subCurrencyCode}&nbsp;{subCurrency}
        </span>
      )}
      <style jsx>{styles}</style>
    </span>
  )
}
