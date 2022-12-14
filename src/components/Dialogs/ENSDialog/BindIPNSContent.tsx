import { Button, Dialog, TextIcon, Translate } from '~/components'

import styles from './styles.css'

interface BindIPNSContentProps {
  switchToWalletSelect: () => void
}
const BindIPNSContent = ({ switchToWalletSelect }: BindIPNSContentProps) => {
  return (
    <>
      <Dialog.Content>
        <section className="container">
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
                  zh_hans="关聊 ENS"
                  zh_hant="關聊 ENS"
                  en="Bind IPNS to ENS"
                />
              </TextIcon>
            </Button>
          </span>
        </section>
        <style jsx>{styles}</style>
      </Dialog.Content>
    </>
  )
}

export default BindIPNSContent
