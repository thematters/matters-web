import { ReactRenderer } from '@tiptap/react'
import ApolloClient from 'apollo-client'
import tippy from 'tippy.js'

import { KEYVALUE } from '@/src/common/enums'
import SEARCH_USERS from '~/components/GQL/queries/searchUsers'
import { SearchUsersQuery, UserDigestMiniUserFragment } from '~/gql/graphql'

import { MentionList } from './MentionList'

type MakeMentionSuggestionProps = {
  client: ApolloClient<{}>
}

type SearchUsersSearchEdgesNodeUser = NonNullable<
  NonNullable<SearchUsersQuery['search']['edges']>[0]['node'] & {
    __typename: 'User'
  }
>

export const makeMentionSuggestion = ({
  client,
}: MakeMentionSuggestionProps) => ({
  items: async ({ query }: { query: string }) => {
    const { data } = await client.query({
      query: SEARCH_USERS,
      variables: { search: query, exclude: 'blocked' },
    })
    const mentionUsers = (data?.search.edges || []).map(
      ({ node }: any) => node
    ) as SearchUsersSearchEdgesNodeUser[]

    return mentionUsers
  },

  render: () => {
    let component: ReactRenderer
    let popup: any

    const destroy = () => {
      if (popup) {
        popup[0].destroy()
      }

      if (component) {
        component.destroy()
      }
    }

    return {
      onStart: (props: any) => {
        component = new ReactRenderer(MentionList, {
          props: {
            ...props,
            users: props.items,
            onClick: (user: UserDigestMiniUserFragment) =>
              props.command({
                id: user.id,
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
          appendTo: () => document.querySelector('#editor') || document.body,
          content: component.element,
          showOnCreate: true,
          interactive: true,
          trigger: 'manual',
          placement: 'bottom-start',
          arrow: false,
          hideOnClick: false,
          onHidden: () => {
            destroy()
          },
        })
      },

      onUpdate(props: any) {
        component.updateProps({ ...props, users: props.items })

        if (!props.clientRect) {
          return
        }

        if (popup) {
          popup[0].setProps({
            getReferenceClientRect: props.clientRect,
          })
        }
      },

      onKeyDown(props: any) {
        if (popup && props.event.key.toLowerCase() === KEYVALUE.escape) {
          popup[0].hide()
          return true
        }

        // @ts-ignore
        return component?.ref?.onKeyDown(props)
      },

      onExit() {
        destroy()
      },
    }
  },
})
