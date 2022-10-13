export default function isCardInfinite(card) {
  return (
    card &&
    card.rarity === "Basic" &&
    (card.subType.includes("Plains") ||
      card.subType.includes("Island") ||
      card.subType.includes("Swamp") ||
      card.subType.includes("Mountain") ||
      card.subType.includes("Forest"))
  );
}
