import AmountInput from './AmountInput'
import CheckBox from './CheckBox'
import DropdownInput from './DropdownInput'
import Field from './Field'
import Input from './Input'
import List from './List'
import PinInput from './PinInput'
import styles from './styles.css'
import Textarea from './Textarea'

type FormProps = {
  noBackground?: boolean
} & React.DetailedHTMLProps<
  React.FormHTMLAttributes<HTMLFormElement>,
  HTMLFormElement
>

export const Form: React.FC<FormProps> & {
  Input: typeof Input
  Textarea: typeof Textarea
  CheckBox: typeof CheckBox
  PinInput: typeof PinInput
  DropdownInput: typeof DropdownInput
  AmountInput: typeof AmountInput
  List: typeof List
  Field: typeof Field
} = ({ noBackground, children, ...formProps }) => (
  <form
    className={noBackground ? 'no-background' : ''}
    autoComplete="off"
    {...formProps}
  >
    {children}

    <style jsx>{styles}</style>
  </form>
)

Form.Input = Input
Form.Textarea = Textarea
Form.CheckBox = CheckBox
Form.PinInput = PinInput
Form.DropdownInput = DropdownInput
Form.AmountInput = AmountInput
Form.List = List
Form.Field = Field
