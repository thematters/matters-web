import { useRouter } from 'next/router'
import { useContext } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import {
  ADD_TOAST,
  OPEN_LIKE_COIN_DIALOG,
  OPEN_UNIVERSAL_AUTH_DIALOG,
  UNIVERSAL_AUTH_SOURCE,
} from '~/common/enums'
import { analytics, toPath } from '~/common/utils'
import {
  Button,
  IconPen16,
  IconSpinner16,
  LanguageContext,
  Media,
  TextIcon,
  useMutation,
} from '~/components'
import CREATE_DRAFT from '~/components/GQL/mutations/createDraft'
import { CreateDraftMutation } from '~/gql/graphql'

interface Props {
  allowed: boolean
  authed?: boolean
  forbidden?: boolean
}

const BaseWriteButton = ({
  onClick,
  loading,
}: {
  onClick: () => any
  loading?: boolean
}) => {
  const { lang } = useContext(LanguageContext)

  const intl = useIntl()

  const WriteIcon = loading ? (
    <IconSpinner16 size="sm" color="white" />
  ) : (
    <IconPen16 size="sm" color="white" />
  )

  return (
    <>
      <Media greaterThanOrEqual="lg">
        <Button
          size={['5rem', '2.25rem']}
          bgColor="gold"
          onClick={onClick}
          aria-label={
            intl.formatMessage({
              defaultMessage: 'Write',
              description: 'src/components/Buttons/Write/index.tsx'
            })}
        >
          <TextIcon icon={WriteIcon} weight="md" color="white">
            <FormattedMessage defaultMessage="Write" description="src/components/Buttons/Write/index.tsx" />
          </TextIcon>
        </Button>
      </Media>
      <Media lessThan="lg">
        <Button
          size={['2rem', '2rem']}
          bgColor="gold"
          onClick={onClick}
          aria-label={intl.formatMessage({
            defaultMessage: 'Write',
            description: 'src/components/Buttons/Write/index.tsx'
          })}
        >
          <TextIcon icon={WriteIcon} weight="md" color="white" />
        </Button>
      </Media>
    </>
  )
}

export const WriteButton = ({ allowed, authed, forbidden }: Props) => {
  const router = useRouter()

  const intl = useIntl()
  const [putDraft, { loading }] = useMutation<CreateDraftMutation>(
    CREATE_DRAFT,
    {
      variables: { title: intl.formatMessage({
        defaultMessage: 'Untitled',
        description: 'Untitled state'
      })},
    }
  )

  if (!allowed) {
    return (
      <BaseWriteButton
        onClick={() =>
          window.dispatchEvent(new CustomEvent(OPEN_LIKE_COIN_DIALOG, {}))
        }
      />
    )
  }

  return (
    <BaseWriteButton
      onClick={async () => {
        if (!authed) {
          window.dispatchEvent(
            new CustomEvent(OPEN_UNIVERSAL_AUTH_DIALOG, {
              detail: { source: UNIVERSAL_AUTH_SOURCE.create },
            })
          )
          return
        }

        if (forbidden) {
          window.dispatchEvent(
            new CustomEvent(ADD_TOAST, {
              detail: {
                color: 'red',
                content: <FormattedMessage
                  defaultMessage="You do not have permission to perform this operation" description="FORBIDDEN_BY_STATE"
                />
              },
            })
          )
          return
        }

        analytics.trackEvent('click_button', {
          type: 'write',
        })
        const result = await putDraft()
        const { slug, id } = result?.data?.putDraft || {}

        if (slug && id) {
          const path = toPath({ page: 'draftDetail', slug, id })
          router.push(path.href)
        }
      }}
      loading={loading}
    />
  )
}
