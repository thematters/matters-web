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
  IconPen16,
  IconSpinner16,
  LanguageContext,
  TextIcon,
  Translate,
  useMutation,
} from '~/components'
import CREATE_DRAFT from '~/components/GQL/mutations/createDraft'
import { CreateDraftMutation } from '~/gql/graphql'

interface Props {
  allowed: boolean
  authed?: boolean
  isLarge?: boolean
  forbidden?: boolean
}

const BaseWriteButton = ({
  onClick,
  loading,
  isLarge,
}: {
  onClick: () => any
  loading?: boolean
  isLarge?: boolean
}) => {
  const { lang } = useContext(LanguageContext)

  const WriteIcon = loading ? (
    <IconSpinner16 size="sm" color="white" />
  ) : (
    <IconPen16 size="sm" color="white" />
  )

  return (
    <>
      <Button
        size={isLarge ? ['5rem', '2.25rem'] : ['2rem', '2rem']}
        bgColor="gold"
        onClick={onClick}
        aria-label={translate({ id: 'write', lang })}
      >
        <TextIcon icon={WriteIcon} weight="md" color="white">
          {isLarge && <Translate id="write" />}
        </TextIcon>
      </Button>
    </>
  )
}

export const WriteButton = ({ allowed, authed, isLarge, forbidden }: Props) => {
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
        onClick={() =>
          window.dispatchEvent(new CustomEvent(OPEN_LIKE_COIN_DIALOG, {}))
        }
        isLarge={isLarge}
      />
    )
  }

  return (
    <BaseWriteButton
      isLarge={isLarge}
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
