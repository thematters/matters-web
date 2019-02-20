// External modules
import { useEffect, useState } from 'react'

// Internal modules
import { useEventListener } from '~/components/Hook'
import styles from './styles.css'

/**
 * This component is for hosting modal instances and manging their extra
 * shared state. We use react-portal to inject modal into this component.
 *
 * Usage:
 *
 * ```jsx
 *   <Modal.Anchor />
 * ```
 *
 */

const Anchor = () => {
  const open = () => {
    // TODO: Add some safety check or manaing shared state.
  }

  const close = () => {
    // TODO: Add some safety check or manaing shared state.
  }

  useEventListener('openModal', open)

  useEventListener('closeModal', close)

  return (
    <>
      <div id="modal-anchor" className="container" />
      <style jsx>{styles}</style>
    </>
  )
}

export default Anchor
