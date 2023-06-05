import styles from './styles.module.css'

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
    <span className={styles.currencyFormatter}>
      <span className={[styles.currency, 'currency'].join(' ')}>
        {currency}&nbsp;{value}
      </span>

      {subCurrency && (
        <span className={[styles.subCurrency, 'subCurrency'].join(' ')}>
          ≈&nbsp;{subCurrency}&nbsp;{subValue}
        </span>
      )}
    </span>
  )
}
