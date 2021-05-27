import { useState } from 'react'

import { Dialog, Switch, Translate } from '~/components'

import styles from './styles.css'

import { ArticleLicenseType } from '@/__generated__/globalTypes'

interface ContentProps {
  loading: boolean
  onConfirm: (paywalled: boolean, license: ArticleLicenseType) => void
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
          <header>
            <h4>
              <Translate zh_hant="上鎖" zh_hans="上锁" en="Paywalled" />
            </h4>

            <Switch
              checked={paywalled}
              onChange={() => setPaywalled(!paywalled)}
            />
          </header>

          <p className="description">
            <Translate
              zh_hant="未訂閱者無法閱讀摘要外的正文"
              zh_hans="未订阅者无法阅读摘要外的正文"
              en="Member-only content"
            />
          </p>
        </section>

        <style jsx>{styles}</style>
      </Dialog.Message>

      <Dialog.Footer>
        <Dialog.Footer.Button
          onClick={() => onConfirm(paywalled, ArticleLicenseType.cc_by_nc_nd_2)}
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
