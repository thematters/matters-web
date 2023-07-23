import { useState } from 'react'
import { FormattedMessage } from 'react-intl'

import { OPEN_RECOMMEND_AUTHOR_DIALOG } from '~/common/enums'
import { Dialog, SegmentedTabs, Translate, useDialogSwitch } from '~/components'
import { useEventListener } from '~/components/Hook'

import Feed, { FeedType } from './Feed'
import styles from './styles.module.css'

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

      <Dialog isOpen={show} onDismiss={closeDialog}>
        <Dialog.Header
          title={<Translate id="followAuthor" />}
          closeDialog={closeDialog}
          closeText={<FormattedMessage defaultMessage="Close" />}
        />

        <Dialog.Content>
          <Dialog.Message align="left" smUpAlign="left">
            <p className={styles.message}>
              <Translate
                zh_hant="追蹤至少"
                zh_hans="追踪至少"
                en="Follow at least"
              />
              <span className={styles.num}> 5 </span>
              <Translate
                zh_hant="位感興趣的創作者，以開啟個性化的訂閱時間線，並收到創作者最新發佈的作品和動態。"
                zh_hans="位感兴趣的创作者，以开启个性化的订阅时间线，并收到创作者最新发布的作品和动态。"
                en="users to enable personal feed and receive updates."
              />
            </p>
          </Dialog.Message>

          <section className={styles.tabs}>
            <SegmentedTabs>
              <SegmentedTabs.Tab
                onClick={() => setFeed('trendy')}
                selected={isTrendy}
              >
                <Translate zh_hant="最受關注" zh_hans="最受关注" en="Trendy" />
              </SegmentedTabs.Tab>
              <SegmentedTabs.Tab
                onClick={() => setFeed('appreciated')}
                selected={isAppreciated}
              >
                <Translate
                  zh_hant="最受喜愛"
                  zh_hans="最受喜爱"
                  en="Appreciated"
                />
              </SegmentedTabs.Tab>
              <SegmentedTabs.Tab
                onClick={() => setFeed('active')}
                selected={isActive}
              >
                <Translate zh_hant="熱愛交流" zh_hans="热爱交流" en="Active" />
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
