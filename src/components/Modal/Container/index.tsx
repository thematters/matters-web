// External modules
import classNames from 'classnames'
import { useContext, useRef, useState } from 'react'

import { LanguageContext } from '~/components'
import { useNativeEventListener, useOutsideClick } from '~/components/Hook'
import { Modal } from '~/components/Modal'

import { KEYCODES, TEXT } from '~/common/enums'
import { translate } from '~/common/utils'

import styles from './styles.css'

export interface ContainerProps {
  children: (props: any) => React.ReactElement
  close: () => void
  defaultCloseable?: boolean
  prevModalId?: string
  title?: string
  layout?: 'default' | 'sm'
}

const Container: React.FC<ContainerProps> = ({
  children,
  close,
  defaultCloseable = true,
  prevModalId,
  title,
  layout = 'default'
}) => {
  const overlayClass = classNames(
    'overlay',
    'center',
    prevModalId ? '' : 'fadeIn'
  )

  const modalBaseClass = classNames({
    'l-col-4 l-col-sm-6 l-offset-sm-1 l-col-md-4 l-offset-md-2 l-col-lg-6 l-offset-lg-3':
      layout === 'default',
    'l-col-4 l-col-sm-4 l-offset-sm-2 l-col-lg-4 l-offset-lg-4': layout === 'sm'
  })

  const node = useRef(null)
  const { lang } = useContext(LanguageContext)
  const [closeable, setCloseable] = useState(defaultCloseable)
  const [modalClass, setModalClass] = useState<string>(modalBaseClass)

  const interpret = (text: string) => {
    return translate({
      // @ts-ignore
      zh_hant: TEXT.zh_hant[text],
      // @ts-ignore
      zh_hans: TEXT.zh_hans[text],
      lang
    })
  }

  const handleOnEsc = (event: any) => {
    if (!closeable) {
      return
    }
    if (event.keyCode !== KEYCODES.escape) {
      return
    }
    close()
  }

  const handleOnOutsideClick = () => {
    if (!closeable) {
      return
    }
    close()
  }

  useNativeEventListener('keydown', handleOnEsc)
  useOutsideClick(node, handleOnOutsideClick)

  return (
    <div className={overlayClass}>
      <div style={{ width: '100%' }}>
        <div className="l-row">
          <div ref={node} className={modalClass}>
            <div className="container">
              {title && (
                <Modal.Header
                  close={close}
                  closeable={closeable}
                  title={interpret(title)}
                />
              )}
              {children({
                close,
                interpret,
                closeable,
                setCloseable,
                setModalClass
              })}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{styles}</style>
    </div>
  )
}

export default Container
