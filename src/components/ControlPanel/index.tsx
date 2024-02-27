import { Button } from 'components'
import { ControlPanelProps } from 'utils/types'
import './styles.css'

const ControlPanel = ({ controlButtons }: ControlPanelProps) => (
  <div className='control-panel'>
    {controlButtons.map(({ label, onClick }) => (
      <Button key={label} label={label} onClickHandler={onClick} />
    ))}
  </div>
)

export default ControlPanel
