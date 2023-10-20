import { describe, expect, it } from 'vitest'

import { TEST_ID } from '~/common/enums'
import { render, screen } from '~/common/utils/test'
import { ArticleDigestArchived } from '~/components'
import { MOCK_ARTILCE } from '~/stories/mocks'

describe('<ArticleDigest.Archived>', () => {
  it('should render the ArticleDigest.Archived', () => {
    render(<ArticleDigestArchived article={MOCK_ARTILCE} />)
    expect(
      screen.getByTestId(TEST_ID.DIGEST_ARTICLE_ARCHIVED)
    ).toBeInTheDocument()
  })
})
