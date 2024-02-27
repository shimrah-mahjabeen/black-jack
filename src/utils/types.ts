export interface buttonProps {
  label: string
  onClickHandler: () => void
}

export interface Card {
  code: string
  image: string
  value: string
  suit: string
}

export interface CardsContainerProps {
  title: string
  score: number
  isLoading: boolean
  playerCards: Card[]
}

export interface ControlPanelProps {
  controlButtons: { label: string; onClick: () => void }[]
}
