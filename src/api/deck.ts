import instance from './index'

export const fetchNewDeck = async () => {
  const response = await instance.get('/new/shuffle/?deck_count=1')
  return response.data.deck_id
}

export const fetchDealCards = async (deckId: string) => {
  const { data } = await instance.get(`/${deckId}/draw/?count=4`)
  return data
}

export const fetchCard = async (deckId: string) => {
  const { data } = await instance.get(`/${deckId}/draw/?count=1`)
  return data
}
