import { useRef } from 'react'

import { Button, CopyToClipboard, IconLink } from '~/components'

import { TEXT } from '~/common/enums'

import styles from './styles.css'

const Copy = ({ link }: { link: string }) => {
  const inputRef: React.RefObject<any> | null = useRef(null)

  return (
    <section className="copy">
      <CopyToClipboard text={link}>
        <Button
          spacing={['xtight', 'xtight']}
          bgActiveColor="grey-lighter"
          aira-label={TEXT.zh_hant.copy}
        >
          <IconLink color="grey" />
        </Button>
      </CopyToClipboard>

      <CopyToClipboard text={decodeURI(link)}>
        <input ref={inputRef} type="text" value={decodeURI(link)} readOnly />
      </CopyToClipboard>

      <style jsx>{styles}</style>
    </section>
  )
}

export default Copy
