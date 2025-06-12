import { describe, expect, it, vi } from 'vitest'

import { fireEvent, render, screen } from '~/common/utils/test'
import { TableView } from '~/components'

describe('<TableView>', () => {
  it('should render tableview and cells', () => {
    render(
      <TableView groupName="Group 1">
        <TableView.Cell title="Cell 1" />
        <TableView.Cell title="Cell 2" />
      </TableView>
    )

    expect(screen.getByRole('list')).toBeInTheDocument()
    expect(screen.getAllByRole('listitem')).toHaveLength(2)
  })

  it('should render tableview and cells with subtitle', () => {
    render(
      <TableView groupName="Group 1">
        <TableView.Cell title="Cell 1" subtitle="Subtitle 1" />
        <TableView.Cell title="Cell 2" subtitle="Subtitle 2" />
      </TableView>
    )

    expect(screen.getByRole('list')).toBeInTheDocument()
    expect(screen.getAllByRole('listitem')).toHaveLength(2)

    expect(screen.getByText('Cell 1')).toBeInTheDocument()
    expect(screen.getByText('Subtitle 1')).toBeInTheDocument()
    expect(screen.getByText('Cell 2')).toBeInTheDocument()
    expect(screen.getByText('Subtitle 2')).toBeInTheDocument()
  })

  it('should render tableview and cells with custom right node', () => {
    render(
      <TableView groupName="Group 1">
        <TableView.Cell title="Cell 1" right={<span>Right 1</span>} />
        <TableView.Cell title="Cell 2" right={<span>Right 2</span>} />
      </TableView>
    )

    expect(screen.getByRole('list')).toBeInTheDocument()
    expect(screen.getAllByRole('listitem')).toHaveLength(2)

    expect(screen.getByText('Cell 1')).toBeInTheDocument()
    expect(screen.getByText('Right 1')).toBeInTheDocument()
    expect(screen.getByText('Cell 2')).toBeInTheDocument()
    expect(screen.getByText('Right 2')).toBeInTheDocument()
  })

  it('should render tableview and cells with custom onClick', () => {
    const onClick = vi.fn()

    render(
      <TableView groupName="Group 1">
        <TableView.Cell title="Cell 1" onClick={onClick} />
        <TableView.Cell title="Cell 2" onClick={onClick} />
      </TableView>
    )

    expect(screen.getByRole('list')).toBeInTheDocument()
    expect(screen.getAllByRole('listitem')).toHaveLength(2)

    expect(screen.getByText('Cell 1')).toBeInTheDocument()
    expect(screen.getByText('Cell 2')).toBeInTheDocument()

    fireEvent.click(screen.getByText('Cell 1'))
    fireEvent.click(screen.getByText('Cell 2'))

    expect(onClick).toHaveBeenCalledTimes(2)
  })
})
