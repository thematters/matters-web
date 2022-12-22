import { useContext } from 'react'
import { chain, useAccount, useEnsName } from 'wagmi'

import { Dialog, Translate, ViewerContext } from '~/components'

import { EXTERNAL_LINKS } from '~/common/enums'

import styles from './styles.css'

interface DefaultContentProps {
  switchToWalletSelect: () => void
  switchToLinkENS: () => void
}
const DefaultContent = ({
  switchToWalletSelect,
  switchToLinkENS,
}: DefaultContentProps) => {
  const viewer = useContext(ViewerContext)

  const { address: connectedAddress } = useAccount()
  const address = viewer.info.ethAddress

  const isProd = process.env.NEXT_PUBLIC_RUNTIME_ENV === 'production'

  const { data: ensName } = useEnsName({
    address: address as `0x${string}`,
    chainId: isProd ? chain.mainnet.id : chain.goerli.id,
  })
  if (connectedAddress) {
    switchToLinkENS()
  }

  return (
    <>
      <Dialog.Content>
        <section className="container">
          <section className="connect-wallet">
            <span className="info">
              <Translate zh_hans={`关联`} zh_hant={`關聯`} en={`Link`} />
              <span className="ens">&nbsp;{ensName}&nbsp;</span>
              <Translate id="toYourIPNSPage" />
            </span>
            {!connectedAddress && (
              <span className="btn">
                <Dialog.Footer.Button
                  onClick={() => {
                    switchToWalletSelect()
                  }}
                >
                  <Translate
                    zh_hans="连接钱包"
                    zh_hant="連接錢包"
                    en="Connect Wallet"
                  />
                </Dialog.Footer.Button>
              </span>
            )}
          </section>
          <hr style={{ marginBottom: '1rem' }} />
          <section className="description">
            <section className="list">
              <p>
                <Translate id="linkEns" />
              </p>
              <ul>
                <li>
                  <Translate id="linkEnsBenefit1" />{' '}
                </li>
                <li>
                  <Translate id="linkEnsBenefit2" />
                </li>
              </ul>
            </section>
            <p className="reference">
              <Translate id="moreEnsInfo" />
              &nbsp;
              <a href={EXTERNAL_LINKS.ENS_DOCS} target="_blank">
                <Translate zh_hans="官方文档" zh_hant="官方文檔" en="docs" />
              </a>
            </p>
          </section>
          <style jsx>{styles}</style>
        </section>
      </Dialog.Content>
    </>
  )
}

export default DefaultContent
