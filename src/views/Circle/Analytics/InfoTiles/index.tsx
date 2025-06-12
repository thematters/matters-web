import classNames from 'classnames'

import IconAnalyticsChangeArrow12 from '@/public/static/icons/analytics-change-arrow.svg'
import { numRound } from '~/common/utils'
import { Icon, TextIcon } from '~/components'

import styles from './styles.module.css'

type InfoTilesGroupProps = {
  primary?: boolean
}

type InfoTilesTileProps = {
  title: React.ReactNode
  value: string | React.ReactNode
  unit?: string | React.ReactNode
  indicatorColor?: string
  percentageChange?: number
}

const InfoTilesGroup: React.FC<
  React.PropsWithChildren<InfoTilesGroupProps>
> = ({ primary, children }) => {
  const groupClasses = classNames({
    [styles.group]: true,
    [styles.primary]: !!primary,
  })

  return <section className={groupClasses}>{children}</section>
}

const InfoTilesTile: React.FC<InfoTilesTileProps> = ({
  title,
  value,
  unit,
  indicatorColor,
  percentageChange,
}) => {
  const changeClasses = classNames({
    [styles.change]: true,
    [styles.positive]: percentageChange && percentageChange > 0,
    [styles.negative]: percentageChange && percentageChange < 0,
  })

  const change = Math.abs(percentageChange || 0)

  return (
    <section className={styles.tile}>
      <h3 className={styles.title}>
        {indicatorColor && (
          <span
            className={styles.indicator}
            style={{ color: indicatorColor }}
          />
        )}
        {title}
      </h3>

      <div className={styles.content}>
        <span className={styles.value}>{value}</span>

        {unit && <span className={styles.unit}>{unit}</span>}

        {change ? (
          <span className={changeClasses}>
            <TextIcon
              icon={<Icon icon={IconAnalyticsChangeArrow12} size={12} />}
              size={12}
              spacing={2}
            >
              {numRound(change)}%
            </TextIcon>
          </span>
        ) : null}
      </div>
    </section>
  )
}

const InfoTiles: React.FC<{ children?: React.ReactNode }> & {
  Group: typeof InfoTilesGroup
  Tile: typeof InfoTilesTile
} = ({ children }) => {
  return <section className={styles.container}>{children}</section>
}

InfoTiles.Group = InfoTilesGroup
InfoTiles.Tile = InfoTilesTile

export default InfoTiles
