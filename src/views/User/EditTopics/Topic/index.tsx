import { EmptyTopic, Head, Layout } from '~/components'

const EditTopicsTopic = () => {
  // const { lang } = useContext(LanguageContext)

  return (
    <Layout.Main bgColor="grey-lighter">
      <Layout.Header
        left={<Layout.Header.BackButton />}
        right={
          <>
            <Layout.Header.Title id="topic" />
          </>
        }
      />

      <Head title={{ id: 'topic' }} />

      <EmptyTopic />
    </Layout.Main>
  )
}

export default EditTopicsTopic
