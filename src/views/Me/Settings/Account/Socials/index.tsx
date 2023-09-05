import { useContext } from 'react'
import { FormattedMessage } from 'react-intl'

import {
  Button,
  ButtonProps,
  IconClose20,
  IconFacebook22,
  IconGoogle22,
  IconX22,
  TableView,
  TextIcon,
  ViewerContext,
} from '~/components'
import { SocialAccountType } from '~/gql/graphql'

const Socials = () => {
  const viewer = useContext(ViewerContext)
  const googleId = viewer.info.socialAccounts.find(
    (s) => s.type === SocialAccountType.Google
  )?.email
  const facebookId = viewer.info.socialAccounts.find(
    (s) => s.type === SocialAccountType.Facebook
  )?.userName
  const twitterId = viewer.info.socialAccounts.find(
    (s) => s.type === SocialAccountType.Twitter
  )?.userName

  const buttonProps: ButtonProps = {
    size: [null, '1.5rem'],
    spacing: [0, 'tight'],
    textColor: 'green',
    borderColor: 'green',
    textActiveColor: 'greenDark',
    borderActiveColor: 'greenDark',
  }

  return (
    <>
      {/* Google */}
      <TableView.Cell
        title={
          <TextIcon icon={<IconGoogle22 size="mdM" />} spacing="tight">
            Google
          </TextIcon>
        }
        rightText={googleId}
        rightIcon={
          googleId ? <IconClose20 size="mdS" color="greyDarker" /> : undefined
        }
        onClick={
          googleId ? () => alert('Remove Google') : () => alert('Add Google')
        }
        right={
          googleId ? undefined : (
            <Button {...buttonProps}>
              <FormattedMessage defaultMessage="Connect" />
            </Button>
          )
        }
      />

      {/* Twitter */}
      <TableView.Cell
        title={
          <TextIcon icon={<IconX22 size="mdM" />} spacing="tight">
            Twitter
          </TextIcon>
        }
        rightText={twitterId ? `@${twitterId}` : undefined}
        rightIcon={
          twitterId ? <IconClose20 size="mdS" color="greyDarker" /> : undefined
        }
        onClick={
          twitterId ? () => alert('Remove Twitter') : () => alert('Add Twitter')
        }
        right={
          twitterId ? undefined : (
            <Button {...buttonProps}>
              <FormattedMessage defaultMessage="Connect" />
            </Button>
          )
        }
      />

      {/* Facebook */}
      <TableView.Cell
        title={
          <TextIcon icon={<IconFacebook22 size="mdM" />} spacing="tight">
            Facebook
          </TextIcon>
        }
        rightText={facebookId ? `@${facebookId}` : undefined}
        rightIcon={
          facebookId ? <IconClose20 size="mdS" color="greyDarker" /> : undefined
        }
        onClick={
          facebookId
            ? () => alert('Remove Facebook')
            : () => alert('Add Facebook')
        }
        right={
          facebookId ? undefined : (
            <Button {...buttonProps}>
              <FormattedMessage defaultMessage="Connect" />
            </Button>
          )
        }
      />
    </>
  )
}

export default Socials
