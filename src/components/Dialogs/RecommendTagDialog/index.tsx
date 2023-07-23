import { useState } from 'react'
import { FormattedMessage } from 'react-intl'

import { OPEN_RECOMMEND_TAG_DIALOG } from '~/common/enums'
import { Dialog, SegmentedTabs, Translate, useDialogSwitch } from '~/components'
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

      <Dialog isOpen={show} onDismiss={closeDialog}>
        <Dialog.Header
          title={
            <Translate zh_hant="追蹤標籤" zh_hans="追踪标签" en="Follow Tags" />
          }
          closeDialog={closeDialog}
          closeText={<FormattedMessage defaultMessage="Close" />}
        />

        <Dialog.Content>
          <Dialog.Message align="left" smUpAlign="left">
            <p className={styles.message}>
              <Translate
                zh_hant="挑選至少"
                zh_hans="挑选至少"
                en="Follow at least"
              />
              <span className={styles.num}> 5 </span>
              <Translate
                zh_hant="個標籤，追蹤後可以收到標籤內新作品的動態，以及標籤相關的推薦內容。"
                zh_hans="个标签，追踪后可以收到标签内新作品的动态，以及标签相关的推荐内容。"
                en="tags to receive updates and related contents."
              />
            </p>
          </Dialog.Message>

          <section className={styles.tabs}>
            <SegmentedTabs>
              <SegmentedTabs.Tab
                onClick={() => setFeed('hottest')}
                selected={isHottest}
              >
                <Translate zh_hant="熱門標籤" zh_hans="热门标签" en="Hottest" />
              </SegmentedTabs.Tab>
              <SegmentedTabs.Tab
                onClick={() => setFeed('selected')}
                selected={isSelected}
              >
                <Translate
                  zh_hant="編輯精選"
                  zh_hans="编辑精选"
                  en="Featured"
                />
              </SegmentedTabs.Tab>
            </SegmentedTabs>
          </section>

          <Feed type={feed} />
        </Dialog.Content>

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
