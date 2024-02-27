import { render, screen } from '@testing-library/react'

import Button from 'components/Button'
import { TestApp } from 'utils/test'

describe('Button Component', () => {
  beforeEach(() => render(<Button label='test button' />, { wrapper: TestApp }))

  it('should render correctly', () => {
    expect.assertions(1)
    expect(screen).toMatchSnapshot()
  })

})
