import { featureSupportedChains } from '~/common/utils'
import { Dialog, Translate } from '~/components'

import styles from './styles.module.css'

type CompleteProps = {
  txHash: string
}

const Complete: React.FC<CompleteProps> = ({ txHash }) => {
  const targetNetwork = featureSupportedChains.ens[0]
  const { name: explorerName, url: explorerUrl } =
    targetNetwork.blockExplorers?.default!

  return (
    <>
      <Dialog.Content>
        <section className={styles.content}>
          <p>
            <Translate
              zh_hans="已成功关联，稍后完成。在&nbsp;"
              zh_hant="已成功關聯，稍後完成。在&nbsp;"
              en="Successfully linked. It would take couple hours to resolve. View transaction on&nbsp;"
            />
            <a
              href={`${explorerUrl}/tx/${txHash}`}
              target="_blank"
              rel="noreferrer"
            >
              {explorerName}
            </a>
            <Translate
              zh_hans="&nbsp;查看记录"
              zh_hant="&nbsp;查看紀錄"
              en="."
            />
          </p>
        </section>
      </Dialog.Content>

      <Dialog.Footer
        btns={
          <Dialog.RoundedButton
            text={
              <Translate
                zh_hans="回到个人页"
                zh_hant="回到個人頁"
                en="Back to Profile"
              />
            }
            onClick={() => {
              window.location.reload()
            }}
          />
        }
        smUpBtns={
          <Dialog.TextButton
            text={
              <Translate
                zh_hans="回到个人页"
                zh_hant="回到個人頁"
                en="Back to Profile"
              />
            }
            onClick={() => {
              window.location.reload()
            }}
          />
        }
      />
    </>
  )
}

export default Complete
