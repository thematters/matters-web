// import { AlchemyProvider } from '@ethersproject/providers'
import { useContext, useEffect, useState } from 'react'

import {
  Dialog,
  Form,
  IconLogbook1,
  IconLogbook2,
  LanguageContext,
  Spacer,
  TextIcon,
  Translate,
  useDialogSwitch,
} from '~/components'

interface LogbookDialogProps {
  // user: UserProfileUserPublic_user
  title: string | React.ReactNode
  address: string
  children: ({ openDialog }: { openDialog: () => void }) => React.ReactNode
}

// const isProd = process.env.NEXT_PUBLIC_RUNTIME_ENV === 'production'

export const LogbookDialog: React.FC<LogbookDialogProps> = ({
  title,
  address,
  children,
}) => {
  const { lang } = useContext(LanguageContext)
  const { show, openDialog, closeDialog } = useDialogSwitch(false)

  // const address = user.info.cryptoWallet?.address
  const logbook1Url = `${process.env.NEXT_PUBLIC_TRAVELOGGERS_URL}${
    lang === 'en' ? '/' : '/zh/'
  }owner/${address}`
  const logbook2Url = `${process.env.NEXT_PUBLIC_LOGBOOKS_URL}/bookcase/?address=${address}`
  const [
    hasClaimedLogbook2,
    // setClaimed
  ] = useState(false)

  /* const provider = new AlchemyProvider(
    isProd ? 'mainnet' : 'rinkeby',
    process.env.NEXT_PUBLIC_ALCHEMY_KEY
  ) */

  useEffect(() => {
    // TODO: check if the address has claimed Logbook 2.0
    // setTimeout(() => setClaimed(true), 15e3)
  }, [address])

  return (
    <>
      {children({ openDialog })}
      <Dialog isOpen={show} onDismiss={closeDialog} fixedHeight>
        <Dialog.Header
          title={title}
          closeDialog={closeDialog}
          closeTextId="close"
        />
        <Dialog.Content spacing={['xloose', 'base']}>
          {!hasClaimedLogbook2 && (
            <p>
              <Translate id="logbook2LaunchText" />
              &nbsp;
              <a
                className="u-link-green"
                href={process.env.NEXT_PUBLIC_LOGBOOKS_URL}
                target="_blank"
              >
                <Translate en="link" zh_hant="鏈接" zh_hans="链接" />
              </a>
              .
            </p>
          )}
          <style jsx>{`
            p {
              margin-bottom: var(--spacing-loose);
              text-align: center;
              color: var(--color-grey-darker);
            }
          `}</style>
          <Form.List>
            <Form.List.Item
              htmlHref={logbook2Url}
              htmlTarget="_blank"
              title={
                <TextIcon
                  color="black"
                  icon={<IconLogbook2 size="md" />}
                  size="md"
                  spacing="xtight"
                >
                  <Translate
                    zh_hant="Logbook 2.0 Bookcase"
                    zh_hans="Logbook 2.0 Bookcase"
                    en="Logbook 2.0 Bookcase"
                  />
                </TextIcon>
              }
            />
          </Form.List>
          <Spacer />
          <Form.List>
            <Form.List.Item
              htmlHref={logbook1Url}
              htmlTarget="_blank"
              title={
                <TextIcon
                  color="black"
                  icon={<IconLogbook1 size="md" />}
                  size="md"
                  spacing="xtight"
                >
                  <Translate
                    zh_hant="Logbook 1.0 Bookcase"
                    zh_hans="Logbook 1.0 Bookcase"
                    en="Logbook 1.0 Bookcase"
                  />
                </TextIcon>
              }
            />
          </Form.List>
        </Dialog.Content>
      </Dialog>
    </>
  )
}
