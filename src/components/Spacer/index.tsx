import styles from './styles.css'

interface SpacerProps {
  size?: 'loose' | 'xxxloose'
}

export const Spacer: React.FC<SpacerProps> = ({ size = 'loose' }) => (
  <div className={size} aria-hidden>
    <style jsx>{styles}</style>
  </div>
)
