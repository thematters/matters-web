import { ReactRenderer } from '@tiptap/react'
import tippy from 'tippy.js'

import { UserDigestMiniUserFragment } from '~/gql/graphql'

import { MentionList } from './MentionList'

const MOCK_USER = {
  id: 'VXNlcjo4MQ',
  userName: 'hi176',
  displayName: 'Matty',
  liker: {
    civicLiker: false,
    __typename: 'Liker',
  },
  info: {
    badges: [],
    description:
      'Matters 社區官方帳號\nOfficial account of Matters Community\n\nFor English community: @Matterslab\nEverything related to Web3 / Matters Web3相關活動請見: @web3\nBuilding @thespace',
    profileCover:
      'https://assets.matters.news/profileCover/aa57a1ce-8926-4512-81d8-462f68fa3917.jpeg',
    ethAddress: '0x6323dd2037249a77aa196326f8b8b58939832407',
    ipnsKey: 'k51qzi5uqu5dj2va4ha12r6n9rsa4juckz05ut21q3k2xqi1t46d0umv8t0ltx',
    __typename: 'UserInfo',
    cryptoWallet: {
      id: 'Q3J5cHRvV2FsbGV0Ojgx',
      address: '0x6323dd2037249a77aa196326f8b8b58939832407',
      hasNFTs: false,
      __typename: 'CryptoWallet',
      nfts: [],
    },
  },
  status: {
    state: 'active',
    __typename: 'UserStatus',
  },
  avatar:
    'https://assets.matters.news/avatar/19b36f6e-6311-4cd6-b703-c143a4a49113.png',
  __typename: 'User',
}

export const mentionSuggestion = {
  items: ({ query }: { query: string }) => {
    return [MOCK_USER]
  },

  render: () => {
    let component: ReactRenderer
    let popup: any

    return {
      onStart: (props: any) => {
        component = new ReactRenderer(MentionList, {
          props: {
            users: props.items,
            onClick: (user: UserDigestMiniUserFragment) =>
              props.command({
                userName: user.userName,
                displayName: user.displayName,
              }),
          },
          editor: props.editor,
        })

        if (!props.clientRect) {
          return
        }

        popup = tippy('body', {
          getReferenceClientRect: props.clientRect,
          appendTo: () => document.body,
          content: component.element,
          showOnCreate: true,
          interactive: true,
          trigger: 'manual',
          placement: 'bottom-start',
        })
      },

      onUpdate(props: any) {
        component.updateProps(props)

        if (!props.clientRect) {
          return
        }

        popup[0].setProps({
          getReferenceClientRect: props.clientRect,
        })
      },

      onKeyDown(props: any) {
        if (props.event.key === 'Escape') {
          popup[0].hide()

          return true
        }

        // @ts-ignore
        return component.ref?.onKeyDown(props)
      },

      onExit() {
        popup[0].destroy()
        component.destroy()
      },
    }
  },
}
