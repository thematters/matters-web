import { useContext } from 'react'

import {
  Button,
  IconPen,
  IconSpinner,
  LanguageContext,
  LikeCoinDialog,
  TextIcon,
  Translate,
} from '~/components'
import { useMutation } from '~/components/GQL'
import CREATE_DRAFT from '~/components/GQL/mutations/createDraft'

import { ADD_TOAST, TEXT } from '~/common/enums'
import {
  analytics,
  parseFormSubmitErrors,
  routerPush,
  toPath,
  translate,
} from '~/common/utils'

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
    <IconSpinner size="sm" color="white" />
  ) : (
    <IconPen size="sm" color="white" />
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
      <LikeCoinDialog>
        {({ open }) => <BaseWriteButton onClick={open} isLarge={isLarge} />}
      </LikeCoinDialog>
    )
  }

  return (
    <BaseWriteButton
      isLarge={isLarge}
      onClick={async () => {
        try {
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
        } catch (error) {
          const [messages, codes] = parseFormSubmitErrors(error, lang)

          if (!messages[codes[0]]) {
            return null
          }

          window.dispatchEvent(
            new CustomEvent(ADD_TOAST, {
              detail: {
                color: 'red',
                content: messages[codes[0]],
              },
            })
          )
        }
      }}
      loading={loading}
    />
  )
}
