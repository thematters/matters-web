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
                zh_hant="「追蹤」你感興趣的創作者。你將看到創作者發佈的作品、評論，以及他們支持的優質創作。開啟你的訂閱時間線，追蹤至少"
                zh_hans="「追踪」你感兴趣的创作者。你将看到创作者发布的作品、评论，以及他们支持的优质创作。开启你的订阅时间线，追踪至少"
              />
              <span> 5 </span>
              <Translate zh_hant="位創作者。" zh_hans="位创作者。" />
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
