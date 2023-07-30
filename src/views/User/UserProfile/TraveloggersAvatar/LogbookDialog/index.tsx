import { useContext } from 'react'
import { FormattedMessage } from 'react-intl'

import {
  Dialog,
  Form,
  IconLogbook1,
  IconLogbook2,
  LanguageContext,
  TextIcon,
  Translate,
  useDialogSwitch,
} from '~/components'

import styles from './styles.module.css'

interface LogbookDialogProps {
  title: string | React.ReactNode
  address: string
  children: ({ openDialog }: { openDialog: () => void }) => React.ReactNode
}

const LogbookDialog: React.FC<LogbookDialogProps> = ({
  title,
  address,
  children,
}) => {
  const { lang } = useContext(LanguageContext)
  const { show, openDialog, closeDialog } = useDialogSwitch(false)

  const logbook1Url = `${process.env.NEXT_PUBLIC_TRAVELOGGERS_URL}${
    lang === 'en' ? '/' : '/zh/'
  }owner/${address}`
  const logbook2Url = `${process.env.NEXT_PUBLIC_LOGBOOKS_URL}/bookcase/?address=${address}`

  return (
    <>
      {children({ openDialog })}

      <Dialog isOpen={show} onDismiss={closeDialog}>
        <Dialog.Header
          title={title}
          closeDialog={closeDialog}
          closeText={<FormattedMessage defaultMessage="Close" />}
        />

        <Dialog.Message>
          <p>
            <Translate id="logbook2LaunchText" />
            &nbsp;
            <a
              className="u-link-green"
              href={process.env.NEXT_PUBLIC_LOGBOOKS_URL}
              target="_blank"
              rel="noreferrer"
            >
              <Translate en="link" zh_hant="鏈接" zh_hans="链接" />
            </a>
            .
          </p>
        </Dialog.Message>

        <section className={styles.options}>
          <Form.List>
            <Form.List.Item
              role="link"
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

            <Form.List.Item
              role="link"
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
        </section>

        <Dialog.Footer
          smUpBtns={
            <Dialog.TextButton
              text={<FormattedMessage defaultMessage="Close" />}
              color="greyDarker"
              onClick={closeDialog}
            />
          }
        />
      </Dialog>
    </>
  )
}

export default LogbookDialog
