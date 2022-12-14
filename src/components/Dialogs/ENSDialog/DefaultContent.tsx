// import { useEnsName, useEnsResolver, } from 'wagmi'

import { Button, Dialog, TextIcon, Translate } from '~/components'

import { EXTERNAL_LINKS } from '~/common/enums'

import styles from './styles.css'

interface DefaultContentProps {
  switchToWalletSelect: () => void
}
const DefaultContent = ({ switchToWalletSelect }: DefaultContentProps) => {
  return (
    <>
      <Dialog.Content>
        <section className="container">
          <section className="connect-wallet">
            <span className="ens-name">
              <Translate
                zh_hans="关聊 robertu.eth 到你的 IPNS 页面"
                zh_hant="關聯 robertu.eth 到你的 IPNS 頁面"
                en="關聯 robertu.eth 到你的 IPNS 頁面"
              />
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
                <Translate
                  zh_hans="关聊 ENS 名后，可以："
                  zh_hant="關聯 ENS 名後，可以："
                  en="關聯 ENS 名後，可以："
                />
              </p>
              <ul>
                <li>獲得個性化 IPNS 頁連結，如：ipfs.io/ipns/matty.eth</li>
                <li>直接使用 ENS 名在閱讀器（如 Planet）中訂閱文章</li>
              </ul>
            </section>
            <p className="reference">
              <Translate
                zh_hans="更多 ENS 资讯请参考"
                zh_hant="更多 ENS 資訊請參考"
                en={`更多 ENS 資訊請參考`}
              />
              &nbsp;
              <a href={EXTERNAL_LINKS.ENS_DOCS} target="_blank">
                <Translate
                  zh_hans="官方文档"
                  zh_hant="官方文檔"
                  en="Offcial Docs"
                />
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
