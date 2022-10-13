const digitalSets = {
  "Y22-MID": "ymid",
  "Y22-NEO": "yneo",
  "Y22-SNC": "ysnc",
  "Y23-DMU": "ydmu",
  HBG: "hbg",
};

const scryfallSetsMap = {
  DAR: "DOM",
  CONF: "CON",
  AHA1: "HA1",
  AHA2: "HA2",
  AHA3: "HA3",
  AHA4: "HA4",
  AHA5: "HA5",
  AHA6: "HA6",
  "Y22-MID": "YMID",
  "Y22-NEO": "YNEO",
  "Y22-SNC": "YSNC",
  "Y23-DMU": "YDMU",
};

export function getCardImage(card) {
  if (card && card.pretty_name && card.set) {
    const name = card.pretty_name
      .split(",")
      .join("")
      .replaceAll("'", "%27")
      .replaceAll("+", "%2B")
      .split(" ")
      .join("+");

    let setName = scryfallSetsMap[card.set] || card.set;
    if (card.digitalSet && digitalSets[card.digitalSet]) {
      setName = digitalSets[card.digitalSet];
    }
    setName = setName.toLowerCase();

    if (setName === "j21") {
      return `https://api.scryfall.com/cards/named?exact=${name}&set=${setName}&format=image`;
    }

    return `https://api.scryfall.com/cards/${setName}/${
      card && card.pretty_name && card.pretty_name.startsWith("A-") ? "A-" : ""
    }${card.collectorNumber}/?format=image`;
  }

  return "";
}
