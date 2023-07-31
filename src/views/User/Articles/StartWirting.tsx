import { useRouter } from 'next/router'
import { useContext } from 'react'
import { FormattedMessage } from 'react-intl'

import { OPEN_LIKE_COIN_DIALOG } from '~/common/enums'
import { toPath } from '~/common/utils'
import { Button, useMutation, ViewerContext } from '~/components'
import CREATE_DRAFT from '~/components/GQL/mutations/createDraft'
import { CreateDraftMutation } from '~/gql/graphql'

import styles from './styles.module.css'

const StartWriting = () => {
  const viewer = useContext(ViewerContext)
  const router = useRouter()
  const [putDraft] = useMutation<CreateDraftMutation>(CREATE_DRAFT, {
    variables: { title: '' },
  })

  return (
    <section className={styles.startWriting}>
      <Button
        size={[null, '2rem']}
        spacing={[0, 'tight']}
        borderColor="green"
        borderActiveColor="greenDark"
        borderWidth="md"
        textColor="green"
        textActiveColor="greenDark"
        onClick={async () => {
          if (viewer.shouldSetupLikerID) {
            window.dispatchEvent(new CustomEvent(OPEN_LIKE_COIN_DIALOG, {}))
            return
          }

          const result = await putDraft()
          const { slug = '', id } = result?.data?.putDraft || {}

          if (id) {
            const path = toPath({ page: 'draftDetail', slug, id })
            router.push(path.href)
          }
        }}
      >
        <FormattedMessage
          defaultMessage="Start writing"
          description="src/views/User/Articles/UserArticles.tsx"
        />
      </Button>
    </section>
  )
}

export default StartWriting
