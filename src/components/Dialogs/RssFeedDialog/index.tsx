import gql from 'graphql-tag'
import dynamic from 'next/dynamic'
import { useEffect } from 'react'
import { FormattedMessage } from 'react-intl'

import {
  Dialog,
  SpinnerBlock,
  useDialogSwitch,
  // usePublicLazyQuery,
  usePublicQuery,
} from '~/components'
import { AuthorRssFeedFragment, AuthorRssFeedPublicQuery } from '~/gql/graphql'

export interface RssFeedDialogProps {
  user: AuthorRssFeedFragment
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
      articles(input: { first: 0 }) {
        totalCount
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

const DynamicContent = dynamic(() => import('./Content'), {
  loading: () => <SpinnerBlock />,
})

export type SearchSelectFormProps = {
  title: string | React.ReactNode
  headerLeftButton?: React.ReactNode
  closeDialog: () => void
}

const BaseRssFeedDialog = ({ user, children }: RssFeedDialogProps) => {
  const { show, openDialog, closeDialog } = useDialogSwitch(true)

  const { refetch } = usePublicQuery<AuthorRssFeedPublicQuery>(
    AuthorRssFeedGQL,
    {
      variables: { userName: user.userName },
      skip: true, // skip first call
    }
  )

  useEffect(() => {
    if (show) {
      refetch()
    }
  }, [show])

  return (
    <>
      {children({ openDialog })}

      <Dialog
        isOpen={show}
        onDismiss={closeDialog}
        smBgColor="greyLighter"
        smUpBgColor="greyLighter"
      >
        <Dialog.Header
          title={<FormattedMessage defaultMessage="Content Feed" id="Z+nZlT" />}
          closeDialog={closeDialog}
          closeText={<FormattedMessage defaultMessage="Close" id="rbrahO" />}
        />

        <DynamicContent
          user={user}
          refetch={refetch}
          closeDialog={closeDialog}
        />
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
