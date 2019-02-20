// External modules
import classNames from 'classnames'
import { FC } from 'react'

// Internal modules
import { Icon, Title } from '~/components'
import ICON_CLOSE from '~/static/icons/close.svg?sprite'
import styles from './styles.css'

/**
 * This component is desgined for load contents of a modal. It provides a
 * modal box with default header.
 *
 * Usage:
 *
 * ```jsx
 *   <Modal.Container title={title} close={close}>
 *     <Form />
 *   </Modal.Container>
 * ```
 *
 */

interface Props {
  title: string
  children: any
  close: any
}

const Container: FC<Props> = ({ title, children, close }) => {
  const containerClass = classNames('container')

  const Header = () => (
    <>
      <div className="header">
        <Title type="modal">{title}</Title>
        <button onClick={close}>
          <Icon id={ICON_CLOSE.id} viewBox={ICON_CLOSE.viewBox} />
        </button>
      </div>
      <style jsx>{styles}</style>
    </>
  )

  return (
    <>
      <div className={containerClass}>
        <Header />
        <div className="content">{children}</div>
      </div>
      <style jsx>{styles}</style>
    </>
  )
}

export default Container
