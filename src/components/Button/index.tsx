import { buttonProps } from 'utils/types'
import './styles.css'

const Button = ({ label, onClickHandler }: buttonProps) => (
  <button className={`button ${label === 'Reset Game' && 'resetButton'}`} onClick={onClickHandler}>
    {label}
  </button>
)

export default Button
