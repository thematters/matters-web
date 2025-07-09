import mockRouter from 'next-router-mock'
import { describe, expect, it, vi } from 'vitest'

import { TEST_ID } from '~/common/enums'
import { fireEvent, render, screen } from '~/common/utils/test'
import { ArticleDigestFeed } from '~/components'
import { ArticleState } from '~/gql/graphql'
import { MOCK_ARTILCE } from '~/stories/mocks'

describe('ArticleDigest.Feed', () => {
  describe('Rendering', () => {
    it('should render all component parts correctly', () => {
      // Arrange
      render(<ArticleDigestFeed article={MOCK_ARTILCE} />)

      // Assert - Check if main elements are rendered
      const digest = screen.getByTestId(TEST_ID.DIGEST_ARTICLE_FEED)
      expect(digest).toBeInTheDocument()

      const title = screen.getByRole('heading', { name: MOCK_ARTILCE.title })
      expect(title).toBeInTheDocument()

      const summary = screen.getByText(MOCK_ARTILCE.summary)
      expect(summary).toBeInTheDocument()

      const author = screen.getByText(MOCK_ARTILCE.author.displayName)
      expect(author).toBeInTheDocument()

      // click title to navigate to article detail page
      const $title = screen.getByRole('heading', { name: MOCK_ARTILCE.title })
      expect($title).toBeInTheDocument()
      fireEvent.click($title)
      expect(mockRouter.asPath).toContain(MOCK_ARTILCE.shortHash)

      const cover = screen.getByTestId(TEST_ID.DIGEST_ARTICLE_FEED_COVER)
      expect(cover).toBeInTheDocument()
    })

    it('should display article content correctly', () => {
      // Arrange
      render(<ArticleDigestFeed article={MOCK_ARTILCE} />)

      // Assert - Check if content matches the provided article
      expect(
        screen.getByRole('heading', { name: MOCK_ARTILCE.title })
      ).toHaveTextContent(MOCK_ARTILCE.title)
      expect(screen.getByText(MOCK_ARTILCE.summary)).toHaveTextContent(
        MOCK_ARTILCE.summary
      )
      expect(
        screen.getByText(MOCK_ARTILCE.author.displayName)
      ).toHaveTextContent(MOCK_ARTILCE.author.displayName)
    })
  })

  describe('Component Variations', () => {
    it('should render without author when hasAuthor is false', () => {
      // Arrange
      render(<ArticleDigestFeed article={MOCK_ARTILCE} hasAuthor={false} />)

      // Assert
      const author = screen.queryByText(MOCK_ARTILCE.author.displayName)
      expect(author).not.toBeInTheDocument()
    })

    it('should render without header when hasHeader is false', () => {
      // Arrange
      render(<ArticleDigestFeed article={MOCK_ARTILCE} hasHeader={false} />)

      // Assert
      const author = screen.queryByText(MOCK_ARTILCE.author.displayName)
      expect(author).not.toBeInTheDocument()
    })

    it('should not render cover for banned articles', () => {
      // Arrange
      render(
        <ArticleDigestFeed
          article={{ ...MOCK_ARTILCE, articleState: ArticleState.Banned }}
        />
      )

      // Assert
      const cover = screen.queryByTestId(TEST_ID.DIGEST_ARTICLE_FEED_COVER)
      expect(cover).not.toBeInTheDocument()
    })
  })

  describe('Interactions', () => {
    it('should navigate to article detail when clicking the title', () => {
      // Arrange
      const handleClickDigest = vi.fn()
      render(
        <ArticleDigestFeed article={MOCK_ARTILCE} onClick={handleClickDigest} />
      )

      // Act
      const title = screen.getByRole('heading', { name: MOCK_ARTILCE.title })
      fireEvent.click(title)

      // Assert
      expect(mockRouter.asPath).toContain(MOCK_ARTILCE.shortHash)
      expect(handleClickDigest).toHaveBeenCalledTimes(1)
    })

    it('should navigate to article detail when clicking the summary', () => {
      // Arrange
      const handleClickDigest = vi.fn()
      render(
        <ArticleDigestFeed article={MOCK_ARTILCE} onClick={handleClickDigest} />
      )

      // Act
      const summary = screen.getByText(MOCK_ARTILCE.summary)
      fireEvent.click(summary)

      // Assert
      expect(mockRouter.asPath).toContain(MOCK_ARTILCE.shortHash)
      expect(handleClickDigest).toHaveBeenCalledTimes(1)
    })

    it('should navigate to article detail when clicking the cover', () => {
      // Arrange
      const handleClickDigest = vi.fn()
      render(
        <ArticleDigestFeed article={MOCK_ARTILCE} onClick={handleClickDigest} />
      )

      // Act
      const cover = screen.getByTestId(TEST_ID.DIGEST_ARTICLE_FEED_COVER)
      fireEvent.click(cover)

      // Assert
      expect(handleClickDigest).toHaveBeenCalledTimes(1)
    })
  })
})
