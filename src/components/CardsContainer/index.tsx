import backCard from 'assets/card_back.png'
import { CardsContainerProps } from 'utils/types'
import { LoadingIndicator } from 'components'
import './styles.css'

const CardsContainer = ({ title, score, isLoading = false, playerCards }: CardsContainerProps) => (
  <div className='cards-container'>
    <h2 className='cards-heading'>
      {title}: {score}
    </h2>
    <div className='cards'>
      {playerCards.length ? (
        playerCards.map((card, index) => (
          <>
            <img
              className='card-img'
              key={card.code}
              src={card.image}
              alt={`${card.value} of ${card.suit}`}
            />
            {index + 1 === playerCards.length && isLoading && title === 'You' && (
              <LoadingIndicator />
            )}
          </>
        ))
      ) : (
        <img className='card-img' src={backCard} />
      )}
      {playerCards.length === 0 && isLoading && <LoadingIndicator />}
    </div>
  </div>
)

export default CardsContainer
