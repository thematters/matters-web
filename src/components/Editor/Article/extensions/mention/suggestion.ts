import { ReactRenderer } from '@tiptap/react'
import type { SuggestionProps } from '@tiptap/suggestion'
import ApolloClient from 'apollo-client'
import type { GetReferenceClientRect, Instance } from 'tippy.js'
import tippy from 'tippy.js'

import { KEYVALUE } from '~/common/enums'
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
      variables: { search: `@${query}`, exclude: 'blocked' },
    })
    const mentionUsers = (data?.search.edges || []).map(
      ({ node }: any) => node
    ) as SearchUsersSearchEdgesNodeUser[]

    return mentionUsers
  },

  render: () => {
    let component: ReactRenderer
    let popup: Instance[]

    const destroy = () => {
      if (popup) {
        popup[0].destroy()
      }

      if (component) {
        component.destroy()
      }
    }

    return {
      onStart: (props: SuggestionProps) => {
        component = new ReactRenderer(MentionList, {
          props: {
            ...props,
            users: props.items,
            onClick: (user: UserDigestMiniUserFragment) => {
              props.command({
                id: user.id,
                userName: user.userName,
                displayName: user.displayName,
              })
              props.editor.commands.focus()
            },
            onHide: () => {
              popup[0]?.hide()
              props.editor.commands.focus()
            },
          },
          editor: props.editor,
        })

        if (!props.clientRect) {
          return
        }

        popup = tippy('body', {
          getReferenceClientRect: props.clientRect as GetReferenceClientRect,
          appendTo: () => document.body,
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
        const key = props.event.key.toLowerCase()

        if (popup && key === KEYVALUE.escape) {
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
