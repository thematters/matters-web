import { useState } from 'react'

import { Dialog, Translate } from '~/components'

import { TEXT } from '~/common/enums'

import Copy from './Copy'
import Douban from './Douban'
import Email from './Email'
import Facebook from './Facebook'
import LINE from './LINE'
import styles from './styles.css'
import Telegram from './Telegram'
import Twitter from './Twitter'
import Weibo from './Weibo'
import WhatsApp from './WhatsApp'

interface ShareDialogProps {
  title: string
  link: string
  children: ({ open }: { open: () => void }) => React.ReactNode
}

export const ShareDialog = ({ title, link, children }: ShareDialogProps) => {
  const [showDialog, setShowDialog] = useState(false)
  const open = () => setShowDialog(true)
  const close = () => setShowDialog(false)

  return (
    <>
      {children({ open })}

      <Dialog size="sm" isOpen={showDialog} onDismiss={close}>
        <Dialog.Header
          title={
            <Translate
              zh_hant={TEXT.zh_hant.share}
              zh_hans={TEXT.zh_hans.share}
            />
          }
          close={close}
          headerHidden
        />

        <Dialog.Content spacing={[0, 0]}>
          <section className="socials-container">
            <section className="left">
              <LINE title={title} link={link} />
              <WhatsApp title={title} link={link} />
              <Telegram title={title} link={link} />
              <Douban title={title} link={link} />
            </section>

            <section className="right">
              <Twitter title={title} link={link} />
              <Facebook title={title} link={link} />
              <Weibo title={title} link={link} />
              <Email title={title} link={link} />
            </section>

            <style jsx>{styles}</style>
          </section>

          <Copy link={link} />
        </Dialog.Content>

        <Dialog.Footer>
          <Dialog.Footer.Button
            bgColor="grey-lighter"
            textColor="black"
            onClick={close}
          >
            <Translate
              zh_hant={TEXT.zh_hant.close}
              zh_hans={TEXT.zh_hans.close}
            />
          </Dialog.Footer.Button>
        </Dialog.Footer>
      </Dialog>
    </>
  )
}
