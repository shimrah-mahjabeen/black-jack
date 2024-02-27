import { render, screen, waitFor } from '@testing-library/react'

import CardsContainer from 'components/CardsContainer'
import { TestApp } from 'utils/test'

describe('Cards Container Component', () => {
  beforeEach(() => render(<CardsContainer playerCards={[]} />, { wrapper: TestApp }))

  it('should render correctly', () => {
    expect.assertions(1)
    expect(screen).toMatchSnapshot()
  })

  it('should have heading', async () => {
    await waitFor(() => {
      expect(screen.getAllByRole('heading').length).toBe(1)
    })
  })
})
