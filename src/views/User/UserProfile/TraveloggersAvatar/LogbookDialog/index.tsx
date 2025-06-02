import { useContext } from 'react'
import { FormattedMessage } from 'react-intl'

import IconBook from '@/public/static/icons/24px/book.svg'
import {
  Dialog,
  Icon,
  LanguageContext,
  TableView,
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
          closeText={<FormattedMessage defaultMessage="Close" id="rbrahO" />}
        />

        <Dialog.Content>
          <Dialog.Content.Message>
            <p>
              <FormattedMessage
                defaultMessage="Logbook 2.0 has just launched. If you are an owner of Traveloggers, and haven't claimed, you may claim one from the new Logbook page:"
                id="UUJzml"
              />
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
          </Dialog.Content.Message>
        </Dialog.Content>

        <section className={styles.options}>
          <TableView>
            <TableView.Cell
              role="link"
              htmlHref={logbook2Url}
              htmlTarget="_blank"
              title={
                <TextIcon
                  color="black"
                  icon={<Icon icon={IconBook} size={24} />}
                  size={16}
                  spacing={8}
                >
                  Logbook 2.0 Bookcase
                </TextIcon>
              }
            />

            <TableView.Cell
              role="link"
              htmlHref={logbook1Url}
              htmlTarget="_blank"
              title={
                <TextIcon
                  color="black"
                  icon={<Icon icon={IconBook} size={24} />}
                  size={16}
                  spacing={8}
                >
                  <Translate
                    zh_hant="Logbook 1.0 Bookcase"
                    zh_hans="Logbook 1.0 Bookcase"
                    en="Logbook 1.0 Bookcase"
                  />
                </TextIcon>
              }
            />
          </TableView>
        </section>

        <Dialog.Footer
          smUpBtns={
            <Dialog.TextButton
              text={<FormattedMessage defaultMessage="Close" id="rbrahO" />}
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
