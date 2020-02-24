import classNames from 'classnames'

import { Dialog } from '~/components'

import styles from './styles.css'

interface DialogMessageProps {
  headline?: React.ReactNode | string
  description?: React.ReactNode | string
  textAlign?: 'left'
}

const DialogMessage: React.FC<DialogMessageProps> = ({
  headline,
  description,
  textAlign,

  children
}) => {
  const descriptionClass = classNames({
    description: true,
    [`${textAlign}`]: !!textAlign
  })

  return (
    <Dialog.Content spacing={['xloose', 'base']}>
      {headline && <h3 className="headline">{headline}</h3>}

      {description && (
        <section className={descriptionClass}>{description}</section>
      )}

      {children}

      <style jsx>{styles}</style>
    </Dialog.Content>
  )
}

export default DialogMessage
