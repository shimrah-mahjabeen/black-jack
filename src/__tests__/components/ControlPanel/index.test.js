import { render, screen, act, waitFor } from '@testing-library/react'

import ControlPanel from 'components/ControlPanel'
import { TestApp } from 'utils/test'

const controlButtons = [
  { label: 'Deal Cards', onClick: () => null },
  { label: 'Hit', onClick: () => null },
  { label: 'Stand', onClick: () => null },
  { label: 'Reset Game', onClick: () => null },
]

describe('Control Panel Component', () => {
  beforeEach(() => act(() => render(<ControlPanel controlButtons={controlButtons} />, { wrapper: TestApp })))

  it('should render correctly', () => {
    expect.assertions(1)
    expect(screen).toMatchSnapshot()
  })

  it('should have 4 buttons', async () => {
    await waitFor(() => {
      expect(screen.getAllByRole('button').length).toBe(4)
    })
  })
})
