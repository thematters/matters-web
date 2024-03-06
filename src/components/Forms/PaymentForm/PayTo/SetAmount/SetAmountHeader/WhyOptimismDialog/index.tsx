import { useContext } from 'react'
import { FormattedMessage } from 'react-intl'

import { GUIDE_LINKS } from '~/common/enums'
import { Dialog, LanguageContext, useDialogSwitch } from '~/components'

interface WhyOptimismDialogProps {
  children: ({ openDialog }: { openDialog: () => void }) => React.ReactNode
}

const WhyOptimismDialog = ({ children }: WhyOptimismDialogProps) => {
  const { lang } = useContext(LanguageContext)

  const {
    show,
    openDialog,
    closeDialog: baseCloseDialog,
  } = useDialogSwitch(true)
  const closeDialog = () => {
    baseCloseDialog()
  }

  return (
    <>
      {children({ openDialog })}

      <Dialog isOpen={show} onDismiss={closeDialog}>
        <Dialog.Header
          title={
            <FormattedMessage defaultMessage="Why Optimism?" id="2D/X90" />
          }
          closeDialog={closeDialog}
          closeText={
            <FormattedMessage defaultMessage="Understood" id="GcvLBC" />
          }
        />

        <Dialog.Content>
          <Dialog.Content.Message align="left" smUpAlign="left">
            <ol>
              <li>
                <FormattedMessage
                  defaultMessage="Optimism is a Layer 2 scaling solution based on Ethereum that can provide faster and cheaper transactions, while ensuring security, making it easier for you to support creators."
                  id="4118K3"
                />
              </li>
              <li>
                <FormattedMessage
                  defaultMessage="Optimism is a standalone blockchain. If you have USDT on other chains, you need to transfer them to Optimism. See details in the {link}."
                  id="eKVBm/"
                  values={{
                    link: (
                      <a
                        className="u-link-green"
                        href={GUIDE_LINKS.payment[lang]}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <FormattedMessage
                          defaultMessage="guide"
                          description="src/components/Forms/PaymentForm/PayTo/SetAmount/SetAmountHeader/WhyOptimismDialog/index.tsx"
                          id="P+sWM0"
                        />
                      </a>
                    ),
                  }}
                />
              </li>
            </ol>
          </Dialog.Content.Message>
        </Dialog.Content>

        <Dialog.Footer
          smUpBtns={
            <Dialog.TextButton
              text={
                <FormattedMessage defaultMessage="Understood" id="GcvLBC" />
              }
              color="green"
              onClick={closeDialog}
            />
          }
        />
      </Dialog>
    </>
  )
}

const LazyWhyOptimismDialog = (props: WhyOptimismDialogProps) => (
  <Dialog.Lazy mounted={<WhyOptimismDialog {...props} />}>
    {({ openDialog }) => <>{props.children({ openDialog })}</>}
  </Dialog.Lazy>
)

export default LazyWhyOptimismDialog
