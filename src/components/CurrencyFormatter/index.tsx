import styles from './styles.css'

interface Props {
  value: number | string
  currency: string
  subValue?: number | string
  subCurrency?: string
}

export const CurrencyFormatter: React.FC<Props> = ({
  value,
  currency,
  subValue,
  subCurrency,
}) => {
  return (
    <span className="currencyFormatter">
      <span className="currency">
        {currency}&nbsp;{value}
      </span>
      {subCurrency && (
        <span className="subCurrency">
          ≈&nbsp;{subCurrency}&nbsp;{subValue}
        </span>
      )}
      <style jsx>{styles}</style>
    </span>
  )
}
