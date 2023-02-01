import { useContext } from 'react'

import {
  ConnectWalletButton,
  Help,
  Tabs,
  Translate,
  useResponsive,
  ViewerContext,
} from '~/components'

export type HomeFeedType = 'hottest' | 'newest' | 'icymi'

interface SortByProps {
  feedType: HomeFeedType
  setFeedType: (sortBy: HomeFeedType) => void
}

const SortBy: React.FC<SortByProps> = ({ feedType, setFeedType }) => {
  const viewer = useContext(ViewerContext)
  const isHottest = feedType === 'hottest'
  const isNewset = feedType === 'newest'
  const isICYMI = feedType === 'icymi'
  const isSmallUp = useResponsive('sm-up')

  const isConnectedWallet = !!viewer.info.ethAddress

  return (
    <Tabs
      sticky
      side={
        viewer.isAuthed && !isConnectedWallet && isSmallUp ? (
          <ConnectWalletButton />
        ) : (
          <Help hasTime />
        )
      }
    >
      <Tabs.Tab onClick={() => setFeedType('hottest')} selected={isHottest}>
        <Translate id="hottest" />
      </Tabs.Tab>

      <Tabs.Tab onClick={() => setFeedType('newest')} selected={isNewset}>
        <Translate id="latest" />
      </Tabs.Tab>

      <Tabs.Tab onClick={() => setFeedType('icymi')} selected={isICYMI}>
        <Translate zh_hant="精華" zh_hans="精华" en="Featured" />
      </Tabs.Tab>
    </Tabs>
  )
}

export default SortBy
