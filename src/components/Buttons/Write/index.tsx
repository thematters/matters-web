import { useRouter } from 'next/router'
import { useContext } from 'react'

import {
  ADD_TOAST,
  OPEN_LIKE_COIN_DIALOG,
  OPEN_UNIVERSAL_AUTH_DIALOG,
  UNIVERSAL_AUTH_SOURCE,
} from '~/common/enums'
import { analytics, toPath, translate } from '~/common/utils'
import {
  Button,
  IconNavCreate32,
  IconSpinner16,
  LanguageContext,
  TextIcon,
  Translate,
  useMutation,
} from '~/components'
import CREATE_DRAFT from '~/components/GQL/mutations/createDraft'
import { CreateDraftMutation } from '~/gql/graphql'

interface Props {
  variant: 'navbar' | 'sidenav'
  allowed: boolean
  authed?: boolean
  forbidden?: boolean
}

const BaseWriteButton = ({
  variant,
  onClick,
  loading,
}: {
  variant: 'navbar' | 'sidenav'
  onClick: () => any
  loading?: boolean
}) => {
  const { lang } = useContext(LanguageContext)

  if (variant === 'navbar') {
    return (
      <Button
        bgActiveColor="grey-lighter"
        size={['2rem', '2rem']}
        onClick={onClick}
        aria-label={translate({ id: 'write', lang })}
      >
        <IconNavCreate32 size="lg" color="black" />
      </Button>
    )
  }

  return (
    <Button
      size={[null, '2.25rem']}
      spacing={[0, 'base']}
      bgColor="gold"
      onClick={onClick}
      aria-label={translate({ id: 'write', lang })}
    >
      <TextIcon
        icon={
          loading ? (
            <IconSpinner16 color="white" />
          ) : (
            <IconNavCreate32 color="white" />
          )
        }
        spacing="xtight"
        weight="md"
        color="white"
      >
        <Translate id="write" />
      </TextIcon>
    </Button>
  )
}

export const WriteButton = ({ variant, allowed, authed, forbidden }: Props) => {
  const router = useRouter()
  const { lang } = useContext(LanguageContext)
  const [putDraft, { loading }] = useMutation<CreateDraftMutation>(
    CREATE_DRAFT,
    {
      variables: { title: translate({ id: 'untitle', lang }) },
    }
  )

  if (!allowed) {
    return (
      <BaseWriteButton
        variant={variant}
        onClick={() =>
          window.dispatchEvent(new CustomEvent(OPEN_LIKE_COIN_DIALOG, {}))
        }
      />
    )
  }

  return (
    <BaseWriteButton
      variant={variant}
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
                content: <Translate id="FORBIDDEN_BY_STATE" />,
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
