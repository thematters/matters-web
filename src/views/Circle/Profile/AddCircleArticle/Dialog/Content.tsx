import { useState } from 'react'

import { Dialog, Switch, Translate } from '~/components'

import styles from './styles.css'

interface ContentProps {
  loading: boolean
  onConfirm: (paywalled: boolean) => void
  closeDialog: () => void
}

const Content: React.FC<ContentProps> = ({
  loading,
  onConfirm,
  closeDialog,
}) => {
  const [paywalled, setPaywalled] = useState(false)

  return (
    <>
      <Dialog.Header
        title="circleAddArticles"
        close={closeDialog}
        mode="inner"
      />

      <Dialog.Message align="left" type="info">
        <section className="switch">
          <p>
            <Translate zh_hant="上鎖" zh_hans="上锁" en="Paywalled" />
          </p>

          <Switch
            checked={paywalled}
            onChange={() => setPaywalled(!paywalled)}
          />
        </section>

        <ul>
          <li>
            <Translate
              zh_hant="上鎖作品 24 小時內限免，過後僅圍爐成員可閱讀"
              zh_hans="上锁作品 24 小时内限免，过后仅围炉成员可阅读"
              en="Paywalled article will be free to read for 24 hours, then circle members only."
            />
          </li>
          <li>
            <Translate
              zh_hant="作品上鎖後，不支持撤銷或移出圍爐"
              zh_hans="作品上锁后，不支持撤销或移出围炉"
              en="You can't undo changes on paywalled article"
            />
          </li>
        </ul>

        <style jsx>{styles}</style>
      </Dialog.Message>

      <Dialog.Footer>
        <Dialog.Footer.Button
          onClick={() => onConfirm(paywalled)}
          loading={loading}
        >
          <Translate
            zh_hant="確認添加"
            zh_hans="确认添加"
            en="Confirm to Add"
          />
        </Dialog.Footer.Button>

        <Dialog.Footer.Button
          bgColor="grey-lighter"
          textColor="black"
          onClick={closeDialog}
        >
          <Translate zh_hant="暫時不要" zh_hans="暂时不要" en="Not Now" />
        </Dialog.Footer.Button>
      </Dialog.Footer>
    </>
  )
}

export default Content
