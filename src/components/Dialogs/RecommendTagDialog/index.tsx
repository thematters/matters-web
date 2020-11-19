import { useState } from 'react'

import { Dialog, Tabs, Translate, useDialogSwitch } from '~/components'

import Feed, { FeedType } from './Feed'
import styles from './styles.css'

interface Props {
  children: ({ open }: { open: () => void }) => React.ReactNode
}

const BaseDialog = ({ children }: Props) => {
  const defaultType = 'trendy'

  const { show, open, close } = useDialogSwitch(true)
  const [feed, setFeed] = useState<FeedType>(defaultType)

  const isSelected = feed === 'selected'
  const isTrendy = feed === 'trendy'

  return (
    <>
      {children && children({ open })}

      <Dialog size="sm" isOpen={show} onDismiss={close}>
        <Dialog.Header
          title={<Translate zh_hant="追蹤標籤" zh_hans="追踪标签" />}
          close={close}
          closeTextId="cancel"
        />

        <Dialog.Content>
          <Dialog.Message align="left">
            <p className="message">
              <Translate
                zh_hant="「追蹤」你好奇的標籤，即可看到標籤內精選作品。日後你還可以主理標籤，打造個人專欄或營造小社群，先看看其他用戶怎麼玩吧！請追蹤至少"
                zh_hans="「追踪」你好奇的标签，即可看到标签内精选作品。日后你还可以主理标签，打造个人专栏或营造小社群，先看看其他用户怎么玩吧！请追踪至少"
              />
              <span> 5 </span>
              <Translate zh_hant="個標籤。" zh_hans="个标签。" />
            </p>
          </Dialog.Message>

          <Tabs>
            <Tabs.Tab onClick={() => setFeed('trendy')} selected={isTrendy}>
              <Translate zh_hant="熱門標籤" zh_hans="热门标签" />
            </Tabs.Tab>
            <Tabs.Tab onClick={() => setFeed('selected')} selected={isSelected}>
              <Translate zh_hant="編輯精選" zh_hans="编辑精选" />
            </Tabs.Tab>
          </Tabs>
        </Dialog.Content>

        <Feed type={feed} />
      </Dialog>
      <style jsx>{styles}</style>
    </>
  )
}

export const RecommendTagDialog = (props: Props) => (
  <Dialog.Lazy mounted={<BaseDialog {...props} />}>
    {({ open }) => <>{props.children({ open })}</>}
  </Dialog.Lazy>
)
