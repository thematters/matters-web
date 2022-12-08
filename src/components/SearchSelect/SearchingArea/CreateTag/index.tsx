import { useContext } from 'react'

import {
  Card,
  IconAdd16,
  LanguageContext,
  TextIcon,
  Translate,
} from '~/components'

import { ADD_TOAST, TEST_ID } from '~/common/enums'
import { validateTagName } from '~/common/utils'

import styles from './styles.css'

import { DigestTag } from '~/components/Tag/__generated__/DigestTag'

interface CreateTagProps {
  tag: DigestTag
  onClick: (tag: DigestTag) => void
}

const CreateTag: React.FC<CreateTagProps> = ({ tag, onClick }) => {
  const { lang } = useContext(LanguageContext)

  const create = () => {
    const msg = validateTagName(tag.content, lang)
    if (msg) {
      window.dispatchEvent(
        new CustomEvent(ADD_TOAST, {
          detail: {
            color: 'red',
            content: msg,
          },
        })
      )
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
      <section className="add-tag">
        <TextIcon icon={<IconAdd16 />} color="green" size="md">
          <Translate id="create" />
        </TextIcon>

        <span className="content">&nbsp;{tag.content}</span>

        <style jsx> {styles}</style>
      </section>
    </Card>
  )
}

export default CreateTag
