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
  it('should render bookmark button', async () => {
    render(<DropdownActions article={MOCK_ARTILCE} hasBookmark inCard />)

    const $button = screen.getByLabelText('More Actions')
    expect($button).toBeInTheDocument()

    // open menu
    $button.click()
    const $menu = screen.getByRole('menu')
    expect($menu).toBeInTheDocument()

    const $bookmarkButton = screen.getByRole('menuitem', {
      name: /bookmark/i,
    })
    expect($bookmarkButton).toBeInTheDocument()
  })

  // hasEdit
  it('should render edit button', async () => {
    render(<DropdownActions article={MOCK_ARTILCE} hasEdit inCard />)

    const $button = screen.getByLabelText('More Actions')
    expect($button).toBeInTheDocument()

    // open menu
    $button.click()
    const $menu = screen.getByRole('menu')
    expect($menu).toBeInTheDocument()

    // edit button render as link
    const $editButton = screen.getByRole('link', {
      name: 'Edit',
    })
    expect($editButton).toBeInTheDocument()
  })

  // hasArchive
  it('should render archive button', async () => {
    render(<DropdownActions article={MOCK_ARTILCE} hasArchive />)

    const $button = screen.getByLabelText('More Actions')
    expect($button).toBeInTheDocument()

    // open menu
    $button.click()
    const $menu = screen.getByRole('menu')
    expect($menu).toBeInTheDocument()

    const $archiveButton = screen.getByRole('menuitem', {
      name: 'Archive',
    })
    expect($archiveButton).toBeInTheDocument()
  })

  // hasSetTagSelected
  // hasSetTagUnselected
  // hasRemoveTag
  it('should render tag buttons', async () => {
    render(
      <DropdownActions
        article={MOCK_ARTILCE}
        tagDetailId="1"
        hasSetTagSelected
        hasSetTagUnselected
        hasRemoveTag
      />
    )

    const $button = screen.getByLabelText('More Actions')
    expect($button).toBeInTheDocument()

    // open menu
    $button.click()
    const $menu = screen.getByRole('menu')
    expect($menu).toBeInTheDocument()

    // hasSetTagSelected
    const $setTagSelectedBtn = screen.getByRole('menuitem', {
      name: 'Add to Featured',
    })
    expect($setTagSelectedBtn).toBeInTheDocument()

    // hasUnsetTagSelected
    const $setTagUnselectedBtn = screen.getByRole('menuitem', {
      name: 'Unpin from Trending',
    })
    expect($setTagUnselectedBtn).toBeInTheDocument()

    // hasRemoveTag
    const $removeTagBtn = screen.getByRole('menuitem', {
      name: 'Remove Article',
    })
    expect($removeTagBtn).toBeInTheDocument()
  })

  // hasSetTopCollection
  // hasSetBottomCollection
  // hasAddCollection
  // hasRemoveCollection
  it('should render collection buttons', async () => {
    render(
      <DropdownActions
        article={MOCK_ARTILCE}
        collectionId="1"
        collectionArticleCount={1}
        hasSetTopCollection
        hasSetBottomCollection
        hasAddCollection
        hasRemoveCollection
        onSetTopCollection={() => {}}
        onSetBottomCollection={() => {}}
        onRemoveCollection={() => {}}
      />
    )

    const $button = screen.getByLabelText('More Actions')
    expect($button).toBeInTheDocument()

    // open menu
    $button.click()
    const $menu = screen.getByRole('menu')
    expect($menu).toBeInTheDocument()

    // hasSetTopCollection
    const $setTopCollectionBtn = screen.getByRole('menuitem', {
      name: 'Move to top',
    })
    expect($setTopCollectionBtn).toBeInTheDocument()

    // hasSetBottomCollection
    const $setBottomCollectionBtn = screen.getByRole('menuitem', {
      name: 'Move to bottom',
    })
    expect($setBottomCollectionBtn).toBeInTheDocument()

    // hasAddCollection
    const $addCollectionBtn = screen.getByRole('menuitem', {
      name: 'Add to collection',
    })
    expect($addCollectionBtn).toBeInTheDocument()

    // hasRemoveCollection
    const $removeCollectionBtn = screen.getByRole('menuitem', {
      name: 'Remove from collection',
    })
    expect($removeCollectionBtn).toBeInTheDocument()
  })
})
