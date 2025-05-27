import { useState } from 'react'
import { describe, expect, it, vi } from 'vitest'

import { fireEvent, render, screen } from '~/common/utils/test'
import { Form } from '~/components'

import { FormSelectOption, FormSelectProps } from '.'

const OPTIONS = [
  {
    name: 'Australia',
    value: 'Australia',
    selected: true,
  },
  {
    name: 'Austria',
    value: 'Austria',
    selected: false,
  },
  {
    name: 'Azerbaijan',
    value: 'Azerbaijan',
    selected: false,
  },
]

const CountrySelect = (props: Omit<FormSelectProps<string>, 'options'>) => {
  const [options, setOptions] = useState(OPTIONS)

  const onChange = (option: FormSelectOption<string>) => {
    setOptions([
      ...options.map((o) => ({ ...o, selected: option.name === o.name })),
    ])
    props.onChange(option)
  }

  return (
    <Form.Select<string> {...props} options={options} onChange={onChange} />
  )
}

describe('<Form.Select>', () => {
  it('should render a Select', async () => {
    const handleOnChange = vi.fn()
    const name = 'name-test'
    render(<CountrySelect name={name} onChange={handleOnChange} />)

    const $select = screen.getByRole('button')
    expect($select).toBeInTheDocument()

    // open dropdown
    expect(screen.queryAllByRole('option')).not.toHaveLength(OPTIONS.length)
    fireEvent.click($select)
    const $list = screen.getByRole('listbox')
    expect($list).toBeInTheDocument()
    expect($list).toHaveAttribute('aria-labelledby', `field-${name}`)

    // options
    const $options = screen.getAllByRole('option')
    expect($options).toHaveLength(OPTIONS.length)

    const $unselectedOptions = $options.filter(
      (o) => o.getAttribute('aria-selected') === 'false'
    )
    expect($unselectedOptions).toHaveLength(OPTIONS.length - 1)

    for (let i = 0; i < $unselectedOptions.length; i++) {
      const $option = $unselectedOptions[i]
      expect($option).toHaveAttribute('aria-selected', 'false')
    }

    // select another option
    expect(handleOnChange).not.toBeCalled()
    fireEvent.click($unselectedOptions[0])
    expect(handleOnChange).toBeCalled()

    const $selectedOption = screen.getByRole('option', {
      selected: true,
    })
    expect($selectedOption).toHaveAttribute('aria-selected', 'true')
    expect($selectedOption).toHaveTextContent(OPTIONS[1].name)
  })
})
