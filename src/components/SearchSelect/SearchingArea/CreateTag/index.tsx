import { useContext } from 'react'

import { TEST_ID } from '~/common/enums'
import { validateTagName } from '~/common/utils'
import {
  Card,
  IconAdd16,
  LanguageContext,
  TextIcon,
  toast,
  Translate,
} from '~/components'
import { DigestTagFragment } from '~/gql/graphql'

import styles from './styles.module.css'

interface CreateTagProps {
  tag: DigestTagFragment
  onClick: (tag: DigestTagFragment) => void
}

const CreateTag: React.FC<CreateTagProps> = ({ tag, onClick }) => {
  const { lang } = useContext(LanguageContext)

  const create = () => {
    const msg = validateTagName(tag.content, lang)
    if (msg) {
      toast.error({
        message: msg,
      })
      return
    }

    onClick(tag)
  }

  return (
    <Card
      spacing={['base', 'base']}
      onClick={create}
      testId={TEST_ID.SEARCH_RESULTS_ITEM}
    >
      <section className={styles.addTag}>
        <TextIcon icon={<IconAdd16 />} color="green" size="md">
          <Translate id="create" />
        </TextIcon>

        <span className={styles.content}>&nbsp;{tag.content}</span>
      </section>
    </Card>
  )
}

export default CreateTag
