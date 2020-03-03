import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import AppreciationButton from '../AppreciationButton'
import Appreciators from './Appreciators'
import styles from './styles.css'

import { AppreciationsInfo } from './__generated__/AppreciationsInfo'

const APPRECIATIONS_INFO = gql`
  query AppreciationsInfo($mediaHash: String) {
    article(input: { mediaHash: $mediaHash }) {
      id
      ...AppreciationButtonArticle
      ...AppreciatorsArticle
    }
  }
  ${AppreciationButton.fragments.article}
  ${Appreciators.fragments.article}
`

const Appreciations = ({ mediaHash }: { mediaHash: string }) => {
  const { data, loading } = useQuery<AppreciationsInfo>(APPRECIATIONS_INFO, {
    variables: { mediaHash }
  })

  if (loading || !data || !data.article) {
    return null
  }

  const { article } = data

  return (
    <section className="container">
      <AppreciationButton article={article} />
      <Appreciators article={article} />

      <style jsx>{styles}</style>
    </section>
  )
}

export default Appreciations
