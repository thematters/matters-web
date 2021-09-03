import { Button, IconAdd16, TextIcon, Translate } from '~/components'

type TopicHeadProps = {
  title: React.ReactNode | string
  onAdd: () => void
}

const TopicHead: React.FC<TopicHeadProps> = ({ title, onAdd }) => {
  return (
    <header>
      <section>
        <h2>{title}</h2>
      </section>

      <Button
        borderColor="black"
        spacing={['xxtight', 'tight']}
        onClick={onAdd}
      >
        <TextIcon icon={<IconAdd16 />} size="md-s" weight="md">
          <Translate id="add" />
        </TextIcon>
      </Button>
    </header>
  )
}

export default TopicHead
