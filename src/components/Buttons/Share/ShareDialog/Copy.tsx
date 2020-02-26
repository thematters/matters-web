import { useRef } from 'react'

import { Button, Icon, Translate } from '~/components'

import { KEYCODES } from '~/common/enums'
import { ADD_TOAST } from '~/common/enums/events'
import { dom } from '~/common/utils'

import styles from './styles.css'

const Copy = ({ link }: { link: string }) => {
  const inputRef: React.RefObject<any> | null = useRef(null)

  const copy = () => {
    dom.copyToClipboard(decodeURI(link))
    window.dispatchEvent(
      new CustomEvent(ADD_TOAST, {
        detail: {
          color: 'green',
          content: <Translate id="successCopy" />
        }
      })
    )
    if (inputRef.current) {
      inputRef.current.select()
    }
  }

  return (
    <section className="copy">
      <Button
        spacing={['xtight', 'xtight']}
        bgHoverColor="grey-lighter"
        aira-label="複製"
        onClick={copy}
      >
        <Icon.Link color="grey" />
      </Button>

      <input
        ref={inputRef}
        type="text"
        value={decodeURI(link)}
        readOnly
        onClick={copy}
        onKeyDown={event => {
          if (event.keyCode !== KEYCODES.enter) {
            return
          }
          copy()
        }}
      />

      <style jsx>{styles}</style>
    </section>
  )
}

export default Copy
