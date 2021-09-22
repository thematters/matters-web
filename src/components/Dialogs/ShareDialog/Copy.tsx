import { useContext, useRef } from 'react'

import {
  Button,
  CopyToClipboard,
  IconCopy16,
  LanguageContext,
} from '~/components'

import { translate } from '~/common/utils'

import styles from './styles.css'

const Copy = ({ link }: { link: string }) => {
  const { lang } = useContext(LanguageContext)

  const inputRef: React.RefObject<any> | null = useRef(null)

  return (
    <section className="copy">
      <CopyToClipboard text={link}>
        <Button
          spacing={['xtight', 'xtight']}
          bgActiveColor="grey-lighter"
          aria-label={translate({ id: 'copy', lang })}
        >
          <IconCopy16 color="grey" />
        </Button>
      </CopyToClipboard>

      <CopyToClipboard text={link}>
        <input ref={inputRef} type="text" value={link} readOnly />
      </CopyToClipboard>

      <style jsx>{styles}</style>
    </section>
  )
}

export default Copy
