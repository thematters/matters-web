import { describe, expect, it } from 'vitest'

import { TEST_ID } from '~/common/enums'
import { render, screen } from '~/common/utils/test'
import { Avatar } from '~/components'

describe('<Avatar>', () => {
  it('should be able to render with civic liker ring', async () => {
    const user = {
      avatar: 'https://example.com/avatar.png',
      liker: {
        civicLiker: true,
      },
      info: {},
    }
    render(<Avatar user={user} />)

    const $ring = screen.getByTestId(TEST_ID.AVATAR_CIVIC_LIKER)
    expect($ring).toBeDefined()
  })

  it('should be able to render with architect ring', async () => {
    const user = {
      avatar: 'https://example.com/avatar.png',
      liker: {
        civicLiker: false,
      },
      info: {
        badges: [{ type: 'architect' as any }],
      },
    }
    render(<Avatar user={user} />)

    const $ring = screen.getByTestId(TEST_ID.AVATAR_ARCHITECT)
    expect($ring).toBeDefined()
  })

  it('should be able to render with civic architect ring', async () => {
    const user = {
      avatar: 'https://example.com/avatar.png',
      liker: {
        civicLiker: true,
      },
      info: {
        badges: [{ type: 'architect' as any }],
      },
    }
    render(<Avatar user={user} />)

    const $ring = screen.getByTestId(TEST_ID.AVATAR_CIVIC_ARCHITECT)
    expect($ring).toBeDefined()
  })

  it('should be able to render with logbook badge', async () => {
    const user = {
      avatar: 'https://example.com/avatar.png',
      liker: {
        civicLiker: true,
      },
      info: {
        cryptoWallet: {
          id: '0x123',
          address: '0x123',
          hasNFTs: true,
        },
        badges: [{ type: 'architect' as any }],
      },
    }
    render(<Avatar user={user} />)

    const $badge = screen.getByTestId(TEST_ID.AVATAR_LOGBOOK)
    expect($badge).toBeDefined()
  })

  // it('should allow to use fallback image', async () => {
  //   render(<Avatar />)

  //   const $avatar = screen.getByTestId(TEST_ID.AVATAR)
  //   expect($avatar).toBeDefined()

  //   const $img = $avatar.querySelector('img')

  //   expect($img).toHaveAttribute(
  //     'src',
  //     expect.stringMatching(/avatar-default\.svg/)
  //   )
  // })

  it('should allow to use custom image', async () => {
    // http url
    const src = 'https://example.com/avatar.png'
    const { unmount } = render(<Avatar src={src} />)
    let $avatar = screen.getByTestId(TEST_ID.AVATAR)
    let $img = $avatar.querySelector('img')
    expect($img).toHaveAttribute('src', src)
    unmount()

    // data url
    const dataSrc = 'data:image/png;base64,'
    render(<Avatar src={dataSrc} />)
    $avatar = screen.getByTestId(TEST_ID.AVATAR)
    $img = $avatar.querySelector('img')
    expect($img).toHaveAttribute('src', dataSrc)
  })

  it('should allow to disable responsive images', async () => {
    // disabled for fallback image
    const { unmount } = render(<Avatar />)
    let $avatar = screen.getByTestId(TEST_ID.AVATAR)
    let $img = $avatar.querySelector('img')
    let $responsiveImg = screen.queryByTestId(TEST_ID.RESPONSIVE_IMG)
    expect($img).toBeDefined()
    expect($responsiveImg).not.toBeInTheDocument()
    unmount()

    // disable in `inEditor`
    render(<Avatar src="https://example.com/avatar.png" inEditor />)
    $avatar = screen.getByTestId(TEST_ID.AVATAR)
    $img = $avatar.querySelector('img')
    $responsiveImg = screen.queryByTestId(TEST_ID.RESPONSIVE_IMG)
    expect($img).toBeDefined()
    expect($responsiveImg).not.toBeInTheDocument()
  })
})
