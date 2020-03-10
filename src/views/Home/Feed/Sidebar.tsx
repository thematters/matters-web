import { Footer } from '~/components'

import Articles from './Articles'
import Tags from './Tags'
import Users from './Users'

export default () => (
  <>
    <Articles type="icymi" />
    <Tags />
    <Articles type="topics" />
    <Users />
    <Footer />
  </>
)
