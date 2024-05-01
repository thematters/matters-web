import { useContext } from 'react'

import { ReactComponent as IconPlus } from '@/public/static/icons/24px/plus.svg'
import { TEST_ID } from '~/common/enums'
import { validateTagName } from '~/common/utils'
import {
  Card,
  Icon,
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
      spacing={[16, 16]}
      onClick={create}
      testId={TEST_ID.SEARCH_RESULTS_ITEM}
    >
      <section className={styles.addTag}>
        <TextIcon icon={<Icon icon={IconPlus} />} color="green" size={16}>
          <Translate id="create" />
        </TextIcon>

        <span className={styles.content}>&nbsp;{tag.content}</span>
      </section>
    </Card>
  )
}

export default CreateTag
