import { FormattedMessage } from 'react-intl'

import { featureSupportedChains } from '~/common/utils'
import { Dialog } from '~/components'

import styles from './styles.module.css'

type CompleteProps = {
  closeDialog: () => void
  txHash: string
}

const Complete: React.FC<CompleteProps> = ({ txHash, closeDialog }) => {
  const targetNetwork = featureSupportedChains.ens[0]
  const { name: explorerName, url: explorerUrl } =
    targetNetwork.blockExplorers?.default!

  return (
    <>
      <Dialog.Content>
        <section className={styles.content}>
          <p>
            <FormattedMessage
              defaultMessage="Successfully linked. It would take couple hours to resolve. View transaction on {explorerName} ."
              id="OQ/lbb"
              values={{
                explorerName: (
                  <a
                    href={`${explorerUrl}/tx/${txHash}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {explorerName}
                  </a>
                ),
              }}
            />
          </p>
        </section>
      </Dialog.Content>

      <Dialog.Footer
        btns={
          <Dialog.RoundedButton
            text={
              <FormattedMessage defaultMessage="Back to profile" id="XQYDsg" />
            }
            onClick={closeDialog}
          />
        }
        smUpBtns={
          <Dialog.TextButton
            text={
              <FormattedMessage defaultMessage="Back to profile" id="XQYDsg" />
            }
            onClick={closeDialog}
          />
        }
      />
    </>
  )
}

export default Complete
