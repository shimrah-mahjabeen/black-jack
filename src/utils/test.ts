import React, { ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

interface TestAppProps {
  children: ReactElement | null
}

export const TestApp: React.FC<TestAppProps> = ({ children }) => children

export const renderWithRouter = (
  ui: ReactElement
): { user: typeof userEvent } & ReturnType<typeof render> => {
  return {
    user: userEvent,
    ...render(ui, { wrapper: TestApp } as RenderOptions),
  }
}
