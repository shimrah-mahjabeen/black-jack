import { Suspense } from 'react'

import Blackjack from './container/dashboard'
import { LoadingIndicator } from './components'

const App = () => (
  <Suspense fallback={<LoadingIndicator />}>
    <Blackjack />
  </Suspense>
)

export default App
