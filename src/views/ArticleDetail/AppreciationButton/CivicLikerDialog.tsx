import gql from 'graphql-tag'
import { FormattedMessage } from 'react-intl'

import { EXTERNAL_LINKS } from '~/common/enums'
import { Dialog, useDialogSwitch } from '~/components'
import { CivicLikerAppreciateButtonUserFragment } from '~/gql/graphql'

interface CivicLikerDialogProps {
  user: CivicLikerAppreciateButtonUserFragment
  onClose: () => void
  children: ({ openDialog }: { openDialog: () => void }) => React.ReactNode
}

const fragments = {
  user: gql`
    fragment CivicLikerAppreciateButtonUser on User {
      id
      liker {
        likerId
      }
    }
  `,
}

const CivicLikerDialog = ({
  user,
  onClose,
  children,
}: CivicLikerDialogProps) => {
  const {
    show,
    openDialog,
    closeDialog: baseCloseDialog,
  } = useDialogSwitch(true)
  const closeDialog = () => {
    baseCloseDialog()
    onClose()
  }

  return (
    <>
      {children({ openDialog })}

      <Dialog isOpen={show} onDismiss={closeDialog} size="sm">
        <Dialog.Header
          title="joinCivicLiker"
          closeDialog={closeDialog}
          closeTextId="close"
          mode="inner"
        />

        <Dialog.Message align="left" type="info">
          <p>
            <FormattedMessage
              defaultMessage="Civic Liker is a movement to reward good content and encourage openness. Be a Civil Liker to enjoy the following privileges:"
              description="src/views/ArticleDetail/AppreciationButton/CivicLikerDialog.tsx"
            />
          </p>

          <ul>
            <li>
              <FormattedMessage
                defaultMessage="Unlock "
                description="src/views/ArticleDetail/AppreciationButton/CivicLikerDialog.tsx"
              />
              <a
                className="u-link-green"
                href={EXTERNAL_LINKS.SUPER_LIKE}
                target="_blank"
                rel="noreferrer"
              >
                Super Like
              </a>
              <FormattedMessage
                defaultMessage="twice a day at noon and midnight during promotion period."
                description="src/views/ArticleDetail/AppreciationButton/CivicLikerDialog.tsx"
              />
            </li>
            <li>
              <FormattedMessage
                defaultMessage="Your claps weighs more on the distribution from Creators Fund"
                description="src/views/ArticleDetail/AppreciationButton/CivicLikerDialog.tsx"
              />
            </li>
            <li>
              <FormattedMessage
                defaultMessage="A light ring appears around your profile to show your splendor"
                description="src/views/ArticleDetail/AppreciationButton/CivicLikerDialog.tsx"
              />
            </li>
          </ul>

          <p>
            <FormattedMessage
              defaultMessage="Learn more about "
              description="src/views/ArticleDetail/AppreciationButton/CivicLikerDialog.tsx"
            />
            <a
              className="u-link-green"
              href={EXTERNAL_LINKS.CIVIC_LIKER_SUPPORT}
              target="_blank"
              rel="noreferrer"
            >
              <FormattedMessage
                defaultMessage="Civic Liker benefits"
                description="src/views/ArticleDetail/AppreciationButton/CivicLikerDialog.tsx"
              />
            </a>
          </p>
        </Dialog.Message>

        <Dialog.Footer>
          <Dialog.Footer.Button
            htmlHref={
              user.liker.likerId
                ? EXTERNAL_LINKS.CIVIC_LIKER(user.liker.likerId)
                : EXTERNAL_LINKS.CIVIC_LIKER_JOIN
            }
            htmlTarget="_blank"
            rel="noopener"
            onClick={closeDialog}
          >
            <FormattedMessage
              defaultMessage="Register now"
              description="src/views/ArticleDetail/AppreciationButton/CivicLikerDialog.tsx"
            />
          </Dialog.Footer.Button>

          <Dialog.Footer.Button
            bgColor="grey-lighter"
            textColor="black"
            onClick={closeDialog}
          >
            <FormattedMessage defaultMessage="I see" description="" />
          </Dialog.Footer.Button>
        </Dialog.Footer>
      </Dialog>
    </>
  )
}

const LazyCivicLikerDialog = (props: CivicLikerDialogProps) => (
  <Dialog.Lazy mounted={<CivicLikerDialog {...props} />}>
    {({ openDialog }) => <>{props.children({ openDialog })}</>}
  </Dialog.Lazy>
)

export default LazyCivicLikerDialog

LazyCivicLikerDialog.fragments = fragments
