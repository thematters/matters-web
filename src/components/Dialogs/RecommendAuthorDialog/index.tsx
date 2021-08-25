import { useState } from 'react'

import { Dialog, Tabs, Translate, useDialogSwitch } from '~/components'
import { useEventListener } from '~/components/Hook'

import { OPEN_RECOMMEND_AUTHOR_DIALOG } from '~/common/enums'

import Feed, { FeedType } from './Feed'
import styles from './styles.css'

interface Props {
  children?: ({ openDialog }: { openDialog: () => void }) => React.ReactNode
}

const BaseRecommendAuthorDialog = ({ children }: Props) => {
  const defaultType = 'trendy'

  const { show, openDialog, closeDialog } = useDialogSwitch(true)
  const [feed, setFeed] = useState<FeedType>(defaultType)

  const isActive = feed === 'active'
  const isAppreciated = feed === 'appreciated'
  const isTrendy = feed === 'trendy'

  useEventListener(OPEN_RECOMMEND_AUTHOR_DIALOG, openDialog)

  return (
    <>
      {children && children({ openDialog })}

      <Dialog size="sm" isOpen={show} onDismiss={closeDialog} fixedHeight>
        <Dialog.Header
          title={<Translate id="followAuthor" />}
          closeDialog={closeDialog}
          closeTextId="cancel"
        />

        <Dialog.Content hasGrow>
          <Dialog.Message align="left">
            <p className="message">
              <Translate
                zh_hant="追蹤至少"
                zh_hans="追踪至少"
                en="Follow at least"
              />
              <span> 5 </span>
              <Translate
                zh_hant="位感興趣的創作者，以開啟追蹤頁的動態時間線，並收到創作者發佈的作品和動態。"
                zh_hans="位感兴趣的创作者，以开启追踪页的动态时间线，并收到创作者发布的作品和动态。"
                en="creators to enable your personal feed and receive updates."
              />
            </p>
          </Dialog.Message>

          <Tabs>
            <Tabs.Tab onClick={() => setFeed('trendy')} selected={isTrendy}>
              <Translate zh_hant="最受關注" zh_hans="最受关注" />
            </Tabs.Tab>
            <Tabs.Tab
              onClick={() => setFeed('appreciated')}
              selected={isAppreciated}
            >
              <Translate zh_hant="最受喜愛" zh_hans="最受喜爱" />
            </Tabs.Tab>
            <Tabs.Tab onClick={() => setFeed('active')} selected={isActive}>
              <Translate zh_hant="熱愛交流" zh_hans="热爱交流" />
            </Tabs.Tab>
          </Tabs>

          <Feed type={feed} />
        </Dialog.Content>
      </Dialog>

      <style jsx>{styles}</style>
    </>
  )
}

export const RecommendAuthorDialog = (props: Props) => {
  const Children = ({ openDialog }: { openDialog: () => void }) => {
    useEventListener(OPEN_RECOMMEND_AUTHOR_DIALOG, openDialog)
    return <>{props.children && props.children({ openDialog })}</>
  }

  return (
    <Dialog.Lazy mounted={<BaseRecommendAuthorDialog {...props} />}>
      {({ openDialog }) => <Children openDialog={openDialog} />}
    </Dialog.Lazy>
  )
}
