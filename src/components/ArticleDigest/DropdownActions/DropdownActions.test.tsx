import { describe, expect, it } from 'vitest'

import { TEST_ID } from '~/common/enums'
import { cleanup, render, screen } from '~/common/utils/test'
import { ArticleState } from '~/gql/graphql'
import { MOCK_ARTILCE } from '~/stories/mocks'

import DropdownActions from './'

describe('<ArticleDigest/DropdownActions>', () => {
  // hasShare
  it('should render share button', async () => {
    render(<DropdownActions article={MOCK_ARTILCE} hasShare />)

    const $button = screen.getByLabelText('More Actions')
    expect($button).toBeInTheDocument()

    // open menu
    $button.click()
    const $menu = screen.getByRole('menu')
    expect($menu).toBeInTheDocument()

    const $shareButton = screen.getByRole('menuitem', { name: 'Share Article' })
    expect($shareButton).toBeInTheDocument()

    // open dialog
    $shareButton.click()
    const $shareDialog = screen.getByTestId(TEST_ID.DIALOG_SHARE)
    expect($shareDialog).toBeInTheDocument()
  })

  // hasAppreciators
  it('should render appreciators button', async () => {
    render(
      <DropdownActions
        article={{
          ...MOCK_ARTILCE,
          likesReceived: { ...MOCK_ARTILCE.likesReceived, totalCount: 1 },
        }}
        inCard={false}
      />
    )

    const $button = screen.getByLabelText('More Actions')
    expect($button).toBeInTheDocument()

    // open menu
    $button.click()
    const $menu = screen.getByRole('menu')
    expect($menu).toBeInTheDocument()

    const $appreciatorsButton = screen.getByRole('menuitem', {
      name: 'Likers',
    })
    expect($appreciatorsButton).toBeInTheDocument()

    // open dialog
    $appreciatorsButton.click()
    const $appreciatorsDialog = screen.getByTestId(TEST_ID.DIALOG_APPRECIATORS)
    expect($appreciatorsDialog).toBeInTheDocument()
  })

  it("shoudn't render appreciators button", async () => {
    render(<DropdownActions article={MOCK_ARTILCE} inCard />)
    const $button = screen.getByLabelText('More Actions')
    expect($button).toBeInTheDocument()
    $button.click()
    const $menu = screen.getByRole('menu')
    expect($menu).toBeInTheDocument()

    const $appreciatorsButton = screen.queryByRole('menuitem', {
      name: 'Likers',
    })
    expect($appreciatorsButton).not.toBeInTheDocument()
  })

  // hasDonators
  it('should render donators button', async () => {
    render(<DropdownActions article={MOCK_ARTILCE} />)

    const $button = screen.getByLabelText('More Actions')
    expect($button).toBeInTheDocument()

    // open menu
    $button.click()
    const $menu = screen.getByRole('menu')
    expect($menu).toBeInTheDocument()

    const $donatorsButton = screen.getByRole('menuitem', {
      name: 'Supporters',
    })
    expect($donatorsButton).toBeInTheDocument()

    // open dialog
    $donatorsButton.click()
    const $donatorsDialog = screen.getByTestId(TEST_ID.DIALOG_SUPPORTERS)
    expect($donatorsDialog).toBeInTheDocument()
  })

  // hasFingerprint
  it('should render fingerprint button', async () => {
    render(<DropdownActions article={MOCK_ARTILCE} hasFingerprint />)

    const $button = screen.getByLabelText('More Actions')
    expect($button).toBeInTheDocument()

    // open menu
    $button.click()
    const $menu = screen.getByRole('menu')
    expect($menu).toBeInTheDocument()

    const $fingerprintButton = screen.getByRole('menuitem', {
      name: 'IPFS',
    })
    expect($fingerprintButton).toBeInTheDocument()

    // open dialog
    $fingerprintButton.click()
    const $fingerprintDialog = screen.getByTestId(TEST_ID.DIALOG_FINGERPRINT)
    expect($fingerprintDialog).toBeInTheDocument()
  })

  // hasExtend
  it('should render extend button', async () => {
    render(<DropdownActions article={MOCK_ARTILCE} hasExtend />)

    const $button = screen.getByLabelText('More Actions')
    expect($button).toBeInTheDocument()

    // open menu
    $button.click()
    const $menu = screen.getByRole('menu')
    expect($menu).toBeInTheDocument()

    const $extendButton = screen.getByRole('menuitem', {
      name: 'Collect Article',
    })
    expect($extendButton).toBeInTheDocument()
  })

  // hasSticky
  it('should render sticky button', async () => {
    render(<DropdownActions article={MOCK_ARTILCE} inUserArticles />)

    const $button = screen.getByLabelText('More Actions')
    expect($button).toBeInTheDocument()

    // open menu
    $button.click()
    const $menu = screen.getByRole('menu')
    expect($menu).toBeInTheDocument()

    const $stickyButton = screen.getByRole('menuitem', {
      name: /pin to profile/i,
    })
    expect($stickyButton).toBeInTheDocument()
  })

  it("shoudn't render sticky button", async () => {
    // not inUserArticles
    render(<DropdownActions article={MOCK_ARTILCE} inUserArticles={false} />)
    const $button = screen.getByLabelText('More Actions')
    expect($button).toBeInTheDocument()
    $button.click()
    const $stickyButton = screen.queryByRole('menuitem', {
      name: /pin to profile/i,
    })
    expect($stickyButton).not.toBeInTheDocument()

    // not article author
    cleanup()
    render(
      <DropdownActions
        article={{
          ...MOCK_ARTILCE,
          author: {
            ...MOCK_ARTILCE.author,
            id: MOCK_ARTILCE.author.id + 'another',
          },
        }}
        inUserArticles
      />
    )

    const $button2 = screen.getByLabelText('More Actions')
    expect($button2).toBeInTheDocument()
    $button2.click()
    const $menu2 = screen.getByRole('menu')
    expect($menu2).toBeInTheDocument()
    const $stickyButton2 = screen.queryByRole('menuitem', {
      name: /pin to profile/i,
    })
    expect($stickyButton2).not.toBeInTheDocument()

    // inactive article
    cleanup()
    render(
      <DropdownActions
        article={{
          ...MOCK_ARTILCE,
          articleState: ArticleState.Archived,
        }}
        inUserArticles
      />
    )
    const $button3 = screen.getByLabelText('More Actions')
    expect($button3).toBeInTheDocument()
    $button3.click()
    const $stickyButton3 = screen.queryByRole('menuitem', {
      name: /pin to profile/i,
    })
    expect($stickyButton3).not.toBeInTheDocument()
  })

  // hasBookmark
  // hasArchive

  // hasSetTagSelected
  // hasSetTagUnselected
  // hasRemoveTag

  // hasSetTopCollection
  // hasSetBottomCollection
  // hasAddCollection
  // hasRemoveCollection
})
