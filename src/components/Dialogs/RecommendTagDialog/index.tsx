import { useState } from 'react'

import { Dialog, Tabs, Translate, useDialogSwitch } from '~/components'
import { useEventListener } from '~/components/Hook'

import { OPEN_RECOMMEND_TAG_DIALOG } from '~/common/enums'

import Feed, { FeedType } from './Feed'
import styles from './styles.css'

interface Props {
  children?: ({ openDialog }: { openDialog: () => void }) => React.ReactNode
}

const BaseRecommendTagDialog = ({ children }: Props) => {
  const defaultType = 'hottest'

  const { show, openDialog, closeDialog } = useDialogSwitch(true)
  const [feed, setFeed] = useState<FeedType>(defaultType)

  const isHottest = feed === 'hottest'
  const isSelected = feed === 'selected'

  useEventListener(OPEN_RECOMMEND_TAG_DIALOG, openDialog)

  return (
    <>
      {children && children({ openDialog })}

      <Dialog size="sm" isOpen={show} onDismiss={closeDialog} fixedHeight>
        <Dialog.Header
          title={<Translate zh_hant="追蹤標籤" zh_hans="追踪标签" />}
          closeDialog={closeDialog}
          closeTextId="cancel"
        />

        <Dialog.Content hasGrow>
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
            <Tabs.Tab onClick={() => setFeed('hottest')} selected={isHottest}>
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

export const RecommendTagDialog = (props: Props) => {
  const Children = ({ openDialog }: { openDialog: () => void }) => {
    useEventListener(OPEN_RECOMMEND_TAG_DIALOG, openDialog)
    return <>{props.children && props.children({ openDialog })}</>
  }

  return (
    <Dialog.Lazy mounted={<BaseRecommendTagDialog {...props} />}>
      {({ openDialog }) => <Children openDialog={openDialog} />}
    </Dialog.Lazy>
  )
}
