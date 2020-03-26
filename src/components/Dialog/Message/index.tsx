import classNames from 'classnames'

import { Dialog, Translate } from '~/components'

import { TextId } from '~/common/enums'

import styles from './styles.css'

interface DialogMessageProps {
  headline?: React.ReactElement | TextId
  description?: React.ReactElement | TextId
  textAlign?: 'left'
}

const DialogMessage: React.FC<DialogMessageProps> = ({
  headline,
  description,
  textAlign,

  children,
}) => {
  const descriptionClass = classNames({
    description: true,
    [`${textAlign}`]: !!textAlign,
  })

  return (
    <Dialog.Content spacing={['xloose', 'base']}>
      {headline && (
        <h3 className="headline">
          {typeof headline === 'string' ? (
            <Translate id={headline as TextId} />
          ) : (
            headline
          )}
        </h3>
      )}

      {description && (
        <section className={descriptionClass}>
          {typeof description === 'string' ? (
            <Translate id={description as TextId} />
          ) : (
            description
          )}
        </section>
      )}

      {children}

      <style jsx>{styles}</style>
    </Dialog.Content>
  )
}

export default DialogMessage
