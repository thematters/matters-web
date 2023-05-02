import { ReactRenderer } from '@tiptap/react'
import ApolloClient from 'apollo-client'
import tippy from 'tippy.js'

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

    return {
      onStart: (props: any) => {
        component = new ReactRenderer(MentionList, {
          props: {
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
          appendTo: () => document.body,
          content: component.element,
          showOnCreate: true,
          interactive: true,
          trigger: 'manual',
          placement: 'bottom-start',
          arrow: false,
        })
      },

      onUpdate(props: any) {
        component.updateProps({ users: props.items })

        if (!props.clientRect) {
          return
        }

        popup[0].setProps({
          getReferenceClientRect: props.clientRect,
        })
      },

      onKeyDown(props: any) {
        if (props.event.key === 'Escape' && popup) {
          popup[0].hide()
          return true
        }

        // @ts-ignore
        return component?.ref?.onKeyDown(props)
      },

      onExit() {
        if (popup) {
          popup[0].destroy()
        }

        if (component) {
          component.destroy()
        }
      },
    }
  },
})
