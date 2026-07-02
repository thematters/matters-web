import { describe, expect, it, vi } from 'vitest'

import { fireEvent, render, screen } from '~/common/utils/test'

import Complete from './Complete'
import { QuoteWallCampaign } from './gql'

// 三種語系用同名，讓斷言不依賴測試環境的預設語系
const campaign: QuoteWallCampaign = {
  id: 'camp-1',
  shortHash: 'abc123',
  nameZhHant: 'QuoteWallCampaignName',
  nameZhHans: 'QuoteWallCampaignName',
  nameEn: 'QuoteWallCampaignName',
}

describe('QuoteImageDialog <Complete>', () => {
  it('shows the campaign name and links to its event page', () => {
    render(<Complete campaign={campaign} closeDialog={vi.fn()} />)
    // 活動名稱出現在成功提示中
    expect(screen.getAllByText(/QuoteWallCampaignName/).length).toBeGreaterThan(
      0
    )
    // 「前往活動頁」連到 /e/{shortHash}
    const eventLinks = screen
      .getAllByRole('link')
      .filter((a) => a.getAttribute('href') === '/e/abc123')
    expect(eventLinks.length).toBeGreaterThan(0)
  })

  it('falls back to a generic message with no event link when there is no campaign', () => {
    const closeDialog = vi.fn()
    render(<Complete campaign={null} closeDialog={closeDialog} />)
    // 沒有活動就不顯示「前往活動頁」連結
    const eventLinks = screen
      .queryAllByRole('link')
      .filter((a) => a.getAttribute('href')?.startsWith('/e/'))
    expect(eventLinks).toHaveLength(0)
    // 「完成」可關閉對話框
    fireEvent.click(screen.getAllByText(/完成|Done/)[0])
    expect(closeDialog).toHaveBeenCalled()
  })
})
