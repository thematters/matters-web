import classNames from 'classnames'

import styles from './styles.css'

type SpacingX = 0 | '0' | 'base' | 'xloose'
type SpacingY = 0 | '0' | 'base' | 'xloose'

interface DialogContentProps {
  spacing?: [SpacingX, SpacingY]
}

const DialogContent: React.FC<DialogContentProps> = ({
  spacing = ['base', 'base'],
  children
}) => {
  const contentClass = classNames({
    content: true,
    [`spacing-x-${spacing[0]}`]: !!spacing[0],
    [`spacing-y-${spacing[1]}`]: !!spacing[1]
  })

  return (
    <section className={contentClass}>
      {children}

      <style jsx>{styles}</style>
    </section>
  )
}

export default DialogContent
