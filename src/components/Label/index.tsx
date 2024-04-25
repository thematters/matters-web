import classNames from 'classnames'

import styles from './styles.module.css'

type LabelProps = {
  color: 'green' | 'gold'
}

export const Label: React.FC<React.PropsWithChildren<LabelProps>> = ({
  color,
  children,
}) => {
  const classes = classNames({
    [styles.label]: true,
    [styles[color]]: true,
  })
  return <span className={classes}>{children}</span>
}
