import {
  Dialog,
  IconReadTimeTotal16,
  TextIcon,
  Translate,
  useDialogSwitch,
} from '~/components'

import styles from './styles.css'

export type HelpDetailProps = {
  hasCount?: boolean
  hasTime?: boolean
}

type Props = {
  children: ({ openDialog }: { openDialog: () => void }) => React.ReactNode
} & HelpDetailProps

const time = {
  zh_hant:
    '累計閱讀時數代表了你的作品被登入用戶閱讀的總時數，每次閱讀過程超過一定時間後才會計入。' +
    '此外，同一個用戶的多次閱讀也會進行累計。',
  zh_hans:
    '累计阅读时長代表了你的作品被登入用户阅读的总时数，每次阅读过程超过一定时间后才会计入。' +
    '此外，同一个用户的多次阅读也会进行累计。',
  en: 'Accumulated read time indicates the total time length that registered users read.',
}

const count = {
  zh_hant:
    '閱讀次數代表了你的作品被登入用戶閱讀的總次數，每次閱讀過程超過一定時間後才會計入。' +
    '此外，同一個用戶的多次閱讀也會進行累計。',
  zh_hans:
    '阅读次数代表了你的作品被登入用户阅读的总次数，每次阅读过程超过一定时间后才会计入' +
    '此外，同一个用户的多次阅读也会进行累计。',
  en: 'Read counts indicates how many registered users read.',
}

const ReadTime = () => (
  <>
    <h2 className="title">
      <TextIcon icon={<IconReadTimeTotal16 size="md" />} weight="md">
        <Translate id="readTime" />
      </TextIcon>
    </h2>
    <p className="description">
      <Translate zh_hant={time.zh_hant} zh_hans={time.zh_hans} en={time.en} />
    </p>
    <style jsx>{styles}</style>
  </>
)

const ReadCount = () => (
  <>
    <h2 className="title">
      <TextIcon icon={<IconReadTimeTotal16 size="md" />} weight="md">
        <Translate id="readCount" />
      </TextIcon>
    </h2>
    <p className="description">
      <Translate
        zh_hant={count.zh_hant}
        zh_hans={count.zh_hans}
        en={count.en}
      />
    </p>
    <style jsx>{styles}</style>
  </>
)

const BaseHelpDialog = ({ children, hasCount, hasTime }: Props) => {
  const { show, openDialog, closeDialog } = useDialogSwitch(true)

  return (
    <>
      {children({ openDialog })}

      <Dialog size="sm" isOpen={show} onDismiss={closeDialog}>
        <Dialog.Header
          title={<Translate id="help" />}
          closeDialog={closeDialog}
        />

        <Dialog.Message align="left">
          {hasTime && <ReadTime />}
          {hasCount && <ReadCount />}
        </Dialog.Message>

        <Dialog.Footer>
          <Dialog.Footer.Button
            textColor="white"
            bgColor="green"
            onClick={closeDialog}
          >
            <Translate id="understood" />
          </Dialog.Footer.Button>
        </Dialog.Footer>
      </Dialog>
    </>
  )
}

export const HelpDialog = (props: Props) => (
  <Dialog.Lazy mounted={<BaseHelpDialog {...props} />}>
    {({ openDialog }) => <>{props.children({ openDialog })}</>}
  </Dialog.Lazy>
)
