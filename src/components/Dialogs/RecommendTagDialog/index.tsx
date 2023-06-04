import { useState } from 'react'

import { OPEN_RECOMMEND_TAG_DIALOG } from '~/common/enums'
import { Dialog, Tabs, Translate, useDialogSwitch } from '~/components'
import { useEventListener } from '~/components/Hook'

import Feed, { FeedType } from './Feed'
import styles from './styles.module.css'

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

      <Dialog size="sm" isOpen={show} onDismiss={closeDialog}>
        <Dialog.Header
          title={<Translate zh_hant="追蹤標籤" zh_hans="追踪标签" />}
          closeDialog={closeDialog}
          closeTextId="cancel"
        />

        <Dialog.Content hasGrow>
          <Dialog.Message align="left">
            <p className={styles.message}>
              <Translate
                zh_hant="挑選至少"
                zh_hans="挑选至少"
                en="Follow at least"
              />
              <span> 5 </span>
              <Translate
                zh_hant="個標籤，追蹤後可以收到標籤內新作品的動態，以及標籤相關的推薦內容。"
                zh_hans="个标签，追踪后可以收到标签内新作品的动态，以及标签相关的推荐内容。"
                en="tags to receive updates and related contents."
              />
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
