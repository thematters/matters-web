import { useRouter } from 'next/router'
import { useContext } from 'react'

import {
  OPEN_LIKE_COIN_DIALOG,
  OPEN_UNIVERSAL_AUTH_DIALOG,
  UNIVERSAL_AUTH_SOURCE,
} from '~/common/enums'
import { analytics, toPath, translate } from '~/common/utils'
import {
  Button,
  IconNavCreate32,
  LanguageContext,
  toast,
  Tooltip,
  Translate,
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
}: {
  onClick: () => any
  loading?: boolean
}) => {
  const { lang } = useContext(LanguageContext)

  return (
    <Tooltip
      content={translate({ id: 'write', lang })}
      placement="left"
      delay={[1000, null]}
    >
      <Button
        bgActiveColor="greyLighter"
        size={['2rem', '2rem']}
        onClick={onClick}
        aria-label={translate({ id: 'write', lang })}
      >
        <IconNavCreate32 size="lg" color="black" />
      </Button>
    </Tooltip>
  )
}

export const WriteButton = ({ allowed, authed, forbidden }: Props) => {
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
          toast.error({
            message: <Translate id="FORBIDDEN_BY_STATE" />,
          })

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
