import { useRouter } from 'next/router'
import { useContext } from 'react'

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

import { ADD_TOAST, OPEN_LIKE_COIN_DIALOG } from '~/common/enums'
import { analytics, toPath, translate } from '~/common/utils'

import { CreateDraft } from '~/components/GQL/mutations/__generated__/CreateDraft'

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
  const [putDraft, { loading }] = useMutation<CreateDraft>(CREATE_DRAFT, {
    variables: { title: translate({ id: 'untitle', lang }) },
  })

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
            new CustomEvent(ADD_TOAST, {
              detail: {
                color: 'green',
                content: (
                  <Translate
                    zh_hant="請登入／註冊開始創作"
                    zh_hans="请登入／注册开始创作"
                    en="Log in to start writing"
                  />
                ),
              },
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
