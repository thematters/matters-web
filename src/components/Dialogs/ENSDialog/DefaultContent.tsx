import { useAccount, useEnsName } from 'wagmi'

import { Button, Dialog, TextIcon, Translate } from '~/components'

import { EXTERNAL_LINKS } from '~/common/enums'

import styles from './styles.css'

interface DefaultContentProps {
  switchToWalletSelect: () => void
}
const DefaultContent = ({ switchToWalletSelect }: DefaultContentProps) => {
  const { address } = useAccount()

  const { data: ensName } = useEnsName({
    address: address as `0x${string}`,
  })

  return (
    <>
      <Dialog.Content>
        <section className="container">
          <section className="connect-wallet">
            <span className="info">
              <Translate zh_hans={`关聊`} zh_hant={`關聯`} en={`Link`} />
              <span className="ens">&nbsp;{ensName}&nbsp;</span>
              <Translate id="toYourIPNSPage" />
            </span>
            <span className="btn">
              <Button
                size={['19.5rem', '3rem']}
                bgColor="green"
                borderWidth="sm"
                aria-haspopup="dialog"
                onClick={() => {
                  switchToWalletSelect()
                }}
              >
                <TextIcon size="md" weight="semibold" color="white">
                  <Translate
                    zh_hans="连接钱包"
                    zh_hant="連接錢包"
                    en="Connect Wallet"
                  />
                </TextIcon>
              </Button>
            </span>
          </section>
          <hr style={{ margin: '1rem 0' }} />
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
