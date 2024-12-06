import styles from './styles.module.css'

interface Props {
  value: number | string
  currency: string
  subValue?: number | string
  subCurrency?: string
  subtitle?: React.ReactNode
  weight?: 'normal' | 'medium'
}

export const CurrencyFormatter: React.FC<Props> = ({
  value,
  currency,
  subValue,
  subCurrency,
  subtitle,
  weight = 'medium',
}) => {
  return (
    <span className={styles.currencyFormatter}>
      <span
        className={[styles.currency, styles[`currency-${weight}`]].join(' ')}
      >
        {currency}&nbsp;{value}
      </span>

      {subtitle && <span className={styles.subtitle}>{subtitle}</span>}

      {subCurrency && (
        <span className={styles.subCurrency}>
          ≈&nbsp;{subCurrency}&nbsp;{subValue}
        </span>
      )}
    </span>
  )
}
