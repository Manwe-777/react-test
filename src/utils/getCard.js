import cardsJson from "../assets/cards.json";

export default function getCard(grpId) {
  return cardsJson.cards[grpId];
}
