import { render, screen } from '@testing-library/react'
import { IntlProvider } from 'react-intl'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import FederationSetting from './FederationSetting'

const useQuery = vi.fn()
const messages = {
  YC2b3b: 'Fediverse 聯邦發佈',
}

vi.mock('@apollo/client', () => ({
  useQuery: () => useQuery(),
}))

vi.mock('~/components', () => ({
  Switch: () => <input aria-label="Fediverse 聯邦發佈" type="checkbox" />,
  TableView: {
    Cell: ({ title }: { title: React.ReactNode }) => <div>{title}</div>,
  },
  toast: {
    error: vi.fn(),
    success: vi.fn(),
  },
  useMutation: () => [vi.fn(), { loading: false }],
}))

describe('<FederationSetting>', () => {
  beforeEach(() => {
    useQuery.mockReset()
  })

  it('does not render before viewer feature eligibility is confirmed', () => {
    useQuery.mockReturnValue({ data: undefined, loading: true })

    render(
      <IntlProvider locale="zh-Hant" messages={messages}>
        <FederationSetting />
      </IntlProvider>
    )

    expect(screen.queryByText('Fediverse 聯邦發佈')).not.toBeInTheDocument()
  })

  it('renders for fediverse beta users', () => {
    useQuery.mockReturnValue({
      data: {
        viewer: {
          id: '1',
          features: { fediverseBeta: true },
          federationSetting: { state: 'disabled' },
        },
      },
      loading: false,
    })

    render(
      <IntlProvider locale="zh-Hant" messages={messages}>
        <FederationSetting />
      </IntlProvider>
    )

    expect(screen.getByText('Fediverse 聯邦發佈')).toBeInTheDocument()
  })
})
