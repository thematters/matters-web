import styles from './styles.module.css'

interface SpacerProps {
  size?:
    | 'xxtight'
    | 'xtight'
    | 'base'
    | 'baseLoose'
    | 'loose'
    | 'xloose'
    | 'xxloose'
    | 'xxxloose'
}

export const Spacer: React.FC<SpacerProps> = ({ size = 'loose' }) => (
  <div className={styles[size]} aria-hidden></div>
)
