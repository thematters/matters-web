import gql from 'graphql-tag'
import dynamic from 'next/dynamic'
import { useEffect } from 'react'

import {
  Dialog,
  Spinner,
  useDialogSwitch,
  // usePublicLazyQuery,
  usePublicQuery,
} from '~/components'

import { AuthorRssFeed } from './__generated__/AuthorRssFeed'
import { AuthorRssFeedPublic } from './__generated__/AuthorRssFeedPublic'

interface RssFeedDialogProps {
  user: AuthorRssFeed
  children: ({ openDialog }: { openDialog: () => void }) => React.ReactNode
}

const fragments = {
  user: gql`
    fragment AuthorRssFeed on User {
      id
      userName
      displayName
      info {
        description
        profileCover
        ethAddress
        ipnsKey
      }
    }
  `,
}

const AuthorRssFeedGQL = gql`
  query AuthorRssFeedPublic($userName: String!) {
    user(input: { userName: $userName }) {
      id
      ...AuthorRssFeed
    }
  }
  ${fragments.user}
`

const DynamicContent = dynamic(() => import('./Content'), { loading: Spinner })

const BaseRssFeedDialog = ({ user, children }: RssFeedDialogProps) => {
  const { show, openDialog, closeDialog } = useDialogSwitch(true)

  const { refetch } = usePublicQuery<AuthorRssFeedPublic>(AuthorRssFeedGQL, {
    variables: { userName: user.userName },
    skip: true, // skip first call
  })

  useEffect(() => {
    if (show) {
      refetch()
    }
  }, [show])

  return (
    <>
      {children({ openDialog })}

      <Dialog isOpen={show} onDismiss={closeDialog} fixedHeight>
        <Dialog.Header
          title="RSSEntrance"
          closeDialog={closeDialog}
          closeTextId="close"
        />

        <Dialog.Content hasGrow>
          <DynamicContent
            ipnsKey={user?.info.ipnsKey || ''}
            refetch={refetch}
          />
        </Dialog.Content>
      </Dialog>
    </>
  )
}

export const RssFeedDialog = (props: RssFeedDialogProps) => (
  <Dialog.Lazy mounted={<BaseRssFeedDialog {...props} />}>
    {({ openDialog }) => <>{props.children({ openDialog })}</>}
  </Dialog.Lazy>
)

RssFeedDialog.fragments = fragments
