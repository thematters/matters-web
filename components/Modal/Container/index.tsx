// External modules
import classNames from 'classnames'
import { FC, useContext, useState } from 'react'

import { LanguageContext } from '~/components'
import { useNativeEventListener } from '~/components/Hook'
import ModalHeader from '~/components/Modal/Header'

import { KEYCODES, TEXT } from '~/common/enums'
import { translate } from '~/common/utils'

import styles from './styles.css'

interface Props {
  children: any
  close: () => void
  defaultCloseable?: boolean
  title?: string
}

const Container: FC<Props> = ({
  children,
  close,
  defaultCloseable = true,
  title
}) => {
  const modalBaseClass = classNames(
    'l-col-4',
    'l-col-sm-6',
    'l-offset-sm-1',
    'l-col-md-4',
    'l-offset-md-2',
    'l-col-lg-6',
    'l-offset-lg-3'
  )

  const { lang } = useContext(LanguageContext)
  const [node, setNode] = useState<HTMLElement | null>(null)
  const [closeable, setCloseable] = useState(defaultCloseable)
  const [modalClass, setModalClass] = useState<string>(modalBaseClass)

  const interpret = (text: string) => {
    return translate({
      zh_hant: TEXT.zh_hant[text],
      zh_hans: TEXT.zh_hans[text],
      lang
    })
  }

  const handleOnEsc = (event: any) => {
    if (!closeable) {
      return undefined
    }
    if (event.keyCode !== KEYCODES.escape) {
      return undefined
    }
    close()
  }

  const handleOnOutsideClick = (event: any) => {
    if (!closeable) {
      return undefined
    }
    if (
      !node ||
      node.contains(event.target) ||
      (event.button && event.button !== 0)
    ) {
      return undefined
    }
    close()
  }

  useNativeEventListener('keydown', handleOnEsc)
  useNativeEventListener('click', handleOnOutsideClick)

  return (
    <div className="overlay center">
      <div style={{ width: '100%' }}>
        <div className="l-row">
          <div ref={setNode} className={modalClass}>
            <div className="container">
              {title && (
                <ModalHeader closeable={closeable} title={interpret(title)} />
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
