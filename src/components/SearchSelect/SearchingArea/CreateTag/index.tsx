import { Card, IconAdd, TextIcon, Translate } from '~/components'

import styles from './styles.css'

import { DigestTag } from '~/components/Tag/__generated__/DigestTag'

interface CreateTagProps {
  tag: DigestTag
  onClick: (tag: DigestTag) => void
}

const CreateTag: React.FC<CreateTagProps> = ({ tag, onClick }) => {
  console.log({ tag })

  return (
    <Card spacing={['base', 'base']} onClick={() => onClick(tag)}>
      <section className="add-tag">
        <TextIcon icon={<IconAdd />} color="green" size="md">
          <Translate id="create" />
        </TextIcon>

        <span className="content">&nbsp;{tag.content}</span>

        <style jsx> {styles}</style>
      </section>
    </Card>
  )
}

export default CreateTag
