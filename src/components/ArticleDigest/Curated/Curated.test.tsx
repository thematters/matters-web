import mockRouter from 'next-router-mock'
import { describe, expect, it, vi } from 'vitest'

import { TEST_ID } from '~/common/enums'
import { fireEvent, render, screen } from '~/common/utils/test'
import { ArticleDigestCurated } from '~/components'
import { MOCK_ARTILCE } from '~/stories/mocks'

describe('ArticleDigest.Curated', () => {
  describe('Rendering', () => {
    it('should render all component parts correctly', () => {
      // Arrange
      render(
        <ArticleDigestCurated
          article={MOCK_ARTILCE}
          onClick={vi.fn()}
          onClickAuthor={vi.fn()}
        />
      )

      // Assert - Check if main elements are rendered
      const digest = screen.getByTestId(TEST_ID.DIGEST_ARTICLE_CURATED)
      expect(digest).toBeInTheDocument()

      const cover = screen.getByTestId(TEST_ID.DIGEST_ARTICLE_FEED_COVER)
      expect(cover).toBeInTheDocument()

      const title = screen.getByRole('heading', { name: MOCK_ARTILCE.title })
      expect(title).toBeInTheDocument()

      const author = screen.getByText(MOCK_ARTILCE.author.displayName)
      expect(author).toBeInTheDocument()
    })

    it('should display article content correctly', () => {
      // Arrange
      render(
        <ArticleDigestCurated
          article={MOCK_ARTILCE}
          onClick={vi.fn()}
          onClickAuthor={vi.fn()}
        />
      )

      // Assert - Check if content matches the provided article
      expect(
        screen.getByRole('heading', { name: MOCK_ARTILCE.title })
      ).toHaveTextContent(MOCK_ARTILCE.title)
      expect(
        screen.getByText(MOCK_ARTILCE.author.displayName)
      ).toHaveTextContent(MOCK_ARTILCE.author.displayName)
    })
  })

  describe('Interactions', () => {
    it('should handle click on the digest', () => {
      // Arrange
      const handleClickDigest = vi.fn()
      render(
        <ArticleDigestCurated
          article={MOCK_ARTILCE}
          onClick={handleClickDigest}
          onClickAuthor={vi.fn()}
        />
      )

      // Act
      const digest = screen.getByTestId(TEST_ID.DIGEST_ARTICLE_CURATED)
      fireEvent.click(digest)

      // Assert
      expect(mockRouter.asPath).toContain(MOCK_ARTILCE.shortHash)
      expect(handleClickDigest).toHaveBeenCalledTimes(1)
    })

    it('should handle click on the author', () => {
      // Arrange
      const handleClickAuthor = vi.fn()
      render(
        <ArticleDigestCurated
          article={MOCK_ARTILCE}
          onClick={vi.fn()}
          onClickAuthor={handleClickAuthor}
        />
      )

      // Act
      const author = screen.getByText(MOCK_ARTILCE.author.displayName)
      fireEvent.click(author)

      // Assert
      expect(handleClickAuthor).toHaveBeenCalledTimes(1)
    })
  })
})
