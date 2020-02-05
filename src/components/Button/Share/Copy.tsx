import { Button, Icon, Translate } from '~/components'

import { ADD_TOAST } from '~/common/enums/events'
import { dom } from '~/common/utils'

import styles from './styles.css'

const Copy = ({ link }: { link: string }) => {
  const copy = () => {
    dom.copyToClipboard(decodeURI(link))
    window.dispatchEvent(
      new CustomEvent(ADD_TOAST, {
        detail: {
          color: 'green',
          content: <Translate zh_hant="複製成功" zh_hans="复制成功" />
        }
      })
    )
    const element = dom.$('#shareLinkInput')
    if (element) {
      element.select()
    }
  }

  return (
    <section className="copy">
      <Button aria-label="複製連結" onClick={copy}>
        <Icon.Link color="black" />
      </Button>

      <input
        id="shareLinkInput"
        type="text"
        value={decodeURI(link)}
        readOnly
        onClick={copy}
      />

      <style jsx>{styles}</style>
    </section>
  )
}

export default Copy
