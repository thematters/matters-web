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

import { ADD_TOAST, OPEN_LIKE_COIN_DIALOG, TEXT } from '~/common/enums'
import { analytics, routerPush, toPath, translate } from '~/common/utils'

import { CreateDraft } from '~/components/GQL/mutations/__generated__/CreateDraft'

interface Props {
  allowed: boolean
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
        aria-label={TEXT.zh_hant.write}
      >
        <TextIcon icon={WriteIcon} weight="md" color="white">
          {isLarge && <Translate id="write" />}
        </TextIcon>
      </Button>
    </>
  )
}

export const WriteButton = ({ allowed, isLarge, forbidden }: Props) => {
  const { lang } = useContext(LanguageContext)
  const [putDraft, { loading }] = useMutation<CreateDraft>(CREATE_DRAFT, {
    variables: {
      title: translate({ id: 'untitle', lang }),
    },
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
          routerPush(path.href)
        }
      }}
      loading={loading}
    />
  )
}
