import AmountInput from './AmountInput'
import CheckBox from './CheckBox'
import ComposedAmountInput from './ComposedAmountInput'
import Field from './Field'
import IndexSquareCheckBox from './IndexSquareCheckBox'
import Input from './Input'
import PinInput from './PinInput'
import Select from './Select'
import SquareCheckBox from './SquareCheckBox'
import Textarea from './Textarea'

type FormProps = React.DetailedHTMLProps<
  React.FormHTMLAttributes<HTMLFormElement>,
  HTMLFormElement
>

export const Form: React.FC<FormProps> & {
  Input: typeof Input
  Textarea: typeof Textarea
  CheckBox: typeof CheckBox
  SquareCheckBox: typeof SquareCheckBox
  IndexSquareCheckBox: typeof IndexSquareCheckBox
  PinInput: typeof PinInput
  AmountInput: typeof AmountInput
  Field: typeof Field
  Select: typeof Select
  ComposedAmountInput: typeof ComposedAmountInput
} = ({ children, ...formProps }) => (
  <form method="POST" autoComplete="off" {...formProps}>
    {children}
  </form>
)

Form.Input = Input
Form.Textarea = Textarea
Form.CheckBox = CheckBox
Form.SquareCheckBox = SquareCheckBox
Form.IndexSquareCheckBox = IndexSquareCheckBox
Form.PinInput = PinInput
Form.AmountInput = AmountInput
Form.Field = Field
Form.Select = Select
Form.ComposedAmountInput = ComposedAmountInput
