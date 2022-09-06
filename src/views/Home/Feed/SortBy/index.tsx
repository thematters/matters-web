// import { useContext, useState } from 'react'
import VisuallyHidden from '@reach/visually-hidden'
import FocusLock from 'react-focus-lock'

import {
  // ConnectWalletButton,
  Dropdown,
  // Help,
  hidePopperOnClick,
  IconFilter32,
  IconPin16,
  IconSettings32,
  Menu,
  Tabs,
  TextIcon,
  Translate,
  // useResponsive,
  // ViewerContext,
} from '~/components'

import { Z_INDEX } from '~/common/enums'

import styles from './styles.css'

export type HomeFeedType = 'hottest' | 'newest' | 'icymi'

interface SortByProps {
  feedType: HomeFeedType
  setFeedType: (sortBy: HomeFeedType) => void
}

const SortBy: React.FC<SortByProps> = ({ feedType, setFeedType }) => {
  // const viewer = useContext(ViewerContext)
  // const isSmallUp = useResponsive('sm-up')

  // const isConnectedWallet = !!viewer.info.ethAddress

  return (
    <Tabs
      sticky
      // side={
      //   viewer.isAuthed && !isConnectedWallet && isSmallUp ? (
      //     <ConnectWalletButton />
      //   ) : (
      //     <Help hasTime />
      //   )
      // }
    >
      <div className="container">
        <section className="filters">
          <Dropdown
            content={
              <FocusLock>
                <section className="dropdown-menu">
                  <VisuallyHidden>
                    <button type="button">
                      <Translate id="close" />
                    </button>
                  </VisuallyHidden>
                  <Menu>
                    <Menu.Item onClick={() => setFeedType('hottest')}>
                      <Translate id="hottest" />
                    </Menu.Item>
                    <Menu.Item onClick={() => setFeedType('newest')}>
                      <Translate id="latest" />
                    </Menu.Item>
                    <Menu.Item onClick={() => setFeedType('icymi')}>
                      <Translate zh_hant="精華" zh_hans="精华" en="Featured" />
                    </Menu.Item>
                  </Menu>
                </section>
              </FocusLock>
            }
            placement="bottom-start"
            appendTo={typeof window !== 'undefined' ? document.body : undefined}
            offset={[0, 8]}
            zIndex={Z_INDEX.OVER_BOTTOM_BAR}
            onShown={hidePopperOnClick}
          >
            <button type="button" className="button">
              <TextIcon
                icon={<IconFilter32 size="lg" />}
                size="lg"
                spacing={0}
                color="black"
              >
                {feedType === 'hottest' && <Translate id="hottest" />}
                {feedType === 'newest' && <Translate id="latest" />}
                {feedType === 'icymi' && (
                  <Translate zh_hant="精華" zh_hans="精华" en="Featured" />
                )}
              </TextIcon>
            </button>
          </Dropdown>
        </section>
        <section className="tag-list">
          <ul>
            <li>
              <button type="button" className="button active">
                <TextIcon
                  icon={<IconPin16 size="sm" />}
                  size="sm"
                  spacing="xxtight"
                >
                  全部
                </TextIcon>
              </button>
            </li>
            <li>
              <button type="button" className="button">
                Web3
              </button>
            </li>
            <li>
              <button type="button" className="button">
                NFT
              </button>
            </li>
            <li>
              <button type="button" className="button">
                公共議題
              </button>
            </li>
            <li>
              <button type="button" className="button">
                社區
              </button>
            </li>
            <li>
              <button type="button" className="button">
                寫作
              </button>
            </li>
            <li>
              <button type="button" className="button">
                繪畫
              </button>
            </li>
            <li>
              <button type="button" className="button">
                區塊鏈
              </button>
            </li>
            <li>
              <button type="button" className="button">
                生成藝術
              </button>
            </li>
            <li>
              <button type="button" className="button setting">
                <TextIcon
                  icon={<IconSettings32 size="md" />}
                  size="md"
                  spacing={0}
                />
              </button>
            </li>
          </ul>
        </section>
      </div>
      <style jsx>{styles}</style>
    </Tabs>
  )
}

export default SortBy
