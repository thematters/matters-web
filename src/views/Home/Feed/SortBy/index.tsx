import { useContext } from 'react'

import {
  ConnectWalletButton,
  Help,
  Media,
  Tabs,
  Translate,
  ViewerContext,
} from '~/components'

export type HomeFeedType = 'hottest' | 'newest' | 'icymi'

interface SortByProps {
  feedType: HomeFeedType
  setFeedType: (sortBy: HomeFeedType) => void
}

const TabSide = () => {
  const viewer = useContext(ViewerContext)
  const isConnectedWallet = !!viewer.info.ethAddress

  if (viewer.isAuthed && !isConnectedWallet) {
    return (
      <>
        <Media at="sm">
          <Help hasTime />
        </Media>
        <Media greaterThan="sm">
          <ConnectWalletButton />
        </Media>
      </>
    )
  }

  return <Help hasTime />
}

const SortBy: React.FC<SortByProps> = ({ feedType, setFeedType }) => {
  const isHottest = feedType === 'hottest'
  const isNewset = feedType === 'newest'
  const isICYMI = feedType === 'icymi'

  return (
    <Tabs sticky side={<TabSide />}>
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
