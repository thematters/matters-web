import { useRef } from 'react'

import { Button, CopyToClipboard, Icon } from '~/components'

import styles from './styles.css'

const Copy = ({ link }: { link: string }) => {
  const inputRef: React.RefObject<any> | null = useRef(null)

  return (
    <section className="copy">
      <CopyToClipboard text={link}>
        <Button
          spacing={['xtight', 'xtight']}
          bgActiveColor="green-lighter"
          aira-label="複製"
        >
          <Icon.Link color="grey" />
        </Button>
      </CopyToClipboard>

      <CopyToClipboard text={link}>
        <input ref={inputRef} type="text" value={decodeURI(link)} readOnly />
      </CopyToClipboard>

      <style jsx>{styles}</style>
    </section>
  )
}

export default Copy
