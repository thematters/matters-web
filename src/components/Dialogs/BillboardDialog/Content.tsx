import { FormattedMessage } from 'react-intl'

import { Dialog } from '~/components/Dialog'

interface Props {
  closeDialog: () => void
}

const isProd = process.env.NEXT_PUBLIC_RUNTIME_ENV === 'production'

const Content: React.FC<Props> = ({ closeDialog }) => {
  const billboardURL = isProd
    ? 'https://billboard.matters-lab.io'
    : 'https://billboard-develop.matters-lab.io'
  return (
    <>
      <Dialog.Header
        title={
          <FormattedMessage
            defaultMessage="What is Billboard?"
            id="CNrhz9"
            description="src/components/Dialogs/BillboardDialog/Content.tsx"
          />
        }
      />
      <Dialog.Content>
        <Dialog.Content.Message>
          <p>
            <FormattedMessage
              defaultMessage="Billboard is an open and rentable on-chain NFT advertising protocol. Once a rental is completed, the content can be displayed for 14 days. The rental fee is calculated based on the concept of the Harberger tax, and the generated rental income is distributed to the community creators through quadratic funding. Please check out our {announcements}."
              id="MP6xe/"
              description="src/components/Dialogs/BillboardDialog/Content.tsx"
              values={{
                announcements: (
                  <a className="u-link-green" href="" target="_blank">
                    <FormattedMessage
                      defaultMessage="announcements"
                      description="src/components/Dialogs/BillboardDialog/Content.tsx"
                      id="stTITI"
                    />
                  </a>
                ),
              }}
            />
          </p>
        </Dialog.Content.Message>
      </Dialog.Content>

      <Dialog.Footer
        btns={
          <>
            <Dialog.RoundedButton
              text={
                <FormattedMessage
                  defaultMessage="Learn more"
                  id="wdz6Pf"
                  description="src/components/Dialogs/BillboardDialog/Content.tsx"
                />
              }
              htmlHref={billboardURL}
              htmlTarget="_blank"
              onClick={closeDialog}
            />
            <Dialog.RoundedButton
              text={<FormattedMessage defaultMessage="Close" id="rbrahO" />}
              color="greyDarker"
              onClick={closeDialog}
            />
          </>
        }
        smUpBtns={
          <>
            <Dialog.TextButton
              text={<FormattedMessage defaultMessage="Close" id="rbrahO" />}
              color="greyDarker"
              onClick={closeDialog}
            />
            <Dialog.TextButton
              text={
                <FormattedMessage
                  defaultMessage="Learn more"
                  id="wdz6Pf"
                  description="src/components/Dialogs/BillboardDialog/Content.tsx"
                />
              }
              htmlHref={billboardURL}
              htmlTarget="_blank"
              onClick={closeDialog}
            />
          </>
        }
      />
    </>
  )
}

export default Content
