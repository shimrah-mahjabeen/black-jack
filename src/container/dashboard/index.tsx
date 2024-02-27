import React, { FC, useState, useEffect, Dispatch, SetStateAction } from 'react'

import { CardsContainer, ControlPanel } from 'components'
import { Card } from 'utils/types'
import { fetchNewDeck, fetchDealCards, fetchCard } from 'api/deck'
import './styles.css'

const Blackjack: FC = () => {
  const [deckId, setDeckId] = useState<string>('')
  const [playerCards, setPlayerCards] = useState<Card[]>([])
  const [houseCards, setHouseCards] = useState<Card[]>([])
  const [playerScore, setPlayerScore] = useState<number>(0)
  const [houseScore, setHouseScore] = useState<number>(0)
  const [gameResult, setGameResult] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    getNewDeck()
  }, [])

  useEffect(() => {
    checkResult()
  }, [playerScore])

  const checkResult = () => {
    if (playerScore > 21) setGameResult('You lose!')
    else if (playerScore === 21 && houseScore >= 21) setGameResult('You lose!')
    else if (playerScore === 21 && houseScore < 21) setGameResult('You win!')
  }

  const getNewDeck = async () => {
    try {
      const deckId = await fetchNewDeck()
      setDeckId(deckId)
    } catch (error) {
      console.error('Error fetching new deck:', error)
    }
  }

  const dealCards = async () => {
    try {
      setIsLoading(true)
      const { cards } = await fetchDealCards(deckId)

      setPlayerCards([cards[0], cards[1]])
      setHouseCards([cards[2], cards[3]])
      calculateScore([cards[0], cards[1]], setPlayerScore)
      calculateScore([cards[2], cards[3]], setHouseScore)
    } catch (error) {
      console.error('Error dealing cards:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const calculateScore = (cards: Card[], setScore: Dispatch<SetStateAction<number>>) => {
    let score = 0
    cards.forEach((card) => {
      if (card.value === 'ACE') {
        score += 11
      } else if (['JACK', 'QUEEN', 'KING'].includes(card.value)) {
        score += 10
      } else {
        score += parseInt(card.value)
      }
    })

    cards.forEach((card) => {
      if (card.value === 'ACE' && score > 21) score -= 10
    })

    setScore(score)
  }

  const hit = async () => {
    try {
      if (playerScore >= 21) return
      if (playerScore === 0) return await dealCards()

      setIsLoading(true)
      const data = await fetchCard(deckId)
      const newCard = data.cards[0]

      setPlayerCards([...playerCards, newCard])
      calculateScore([...playerCards, newCard], setPlayerScore)
    } catch (error) {
      console.error('Error hitting:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const stand = () => {
    if (playerScore > 21 || (houseScore <= 21 && houseScore > playerScore)) {
      setGameResult('You lose!')
    } else if (houseScore > 21 || playerScore > houseScore) {
      setGameResult('You win!')
    } else {
      setGameResult("You lose!")
    }
  }

  const resetGame = () => {
    setPlayerCards([])
    setHouseCards([])
    setPlayerScore(0)
    setHouseScore(0)
    setGameResult('')
    getNewDeck()
  }

  const controlButtons = [
    { label: 'Deal Cards', onClick: dealCards },
    { label: 'Hit', onClick: hit },
    { label: 'Stand', onClick: stand },
    { label: 'Reset Game', onClick: resetGame },
  ]

  return (
    <div className='dashboard'>
      <h1 className='dashboard-heading'>Black Jack</h1>
      {gameResult && (
        <div className='result-container'>
          <h3>{gameResult}</h3>
        </div>
      )}
      <div className='board'>
        <CardsContainer
          title='You'
          score={playerScore}
          playerCards={playerCards}
          isLoading={isLoading}
        />
        <div className='separator'></div>
        <CardsContainer
          title='House'
          score={houseScore}
          playerCards={houseCards}
          isLoading={isLoading}
        />
      </div>
      {deckId && <ControlPanel controlButtons={controlButtons} />}
    </div>
  )
}

export default Blackjack
