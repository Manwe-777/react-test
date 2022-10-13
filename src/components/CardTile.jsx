import React, { Fragment } from "react";

import manasymbols from "../assets/mana/mana";
import GenericManaSymbol from "./GenericManaSymbol";
import arcs from "../assets/card_arcs/arcs";

import { ReactComponent as Quantity } from "../assets/card/quantity.svg";
import { ReactComponent as Collection } from "../assets/card/collection.svg";
import { ReactComponent as Left } from "../assets/card/left.svg";
import { ReactComponent as Right } from "../assets/card/right.svg";
import { ReactComponent as Odds } from "../assets/card/odds.svg";

import getCard from "../utils/getCard";

import isCardInfinite from "../utils/isCardInfinite";
import colorArraryNumbertoString from "../utils/colorArrayNumberToString";

export default function Card(props) {
  const {
    text,
    style,
    cardId,
    quantity,
    max,
    odds,
    collection,
    styleOverride,
    disabled,
  } = props;

  let hovering = false;

  const card = getCard(cardId);

  const inLobby = style === "lobby";

  const QuantityComponent = inLobby ? Fragment : Quantity;
  const CollectionComponent = inLobby ? Fragment : Collection;
  const LeftComponent = inLobby ? Fragment : Left;
  const RightComponent = inLobby ? Fragment : Right;
  const OddsComponent = inLobby ? Fragment : Odds;

  let cardName;
  let mana = [];
  let ArcComponent = arcs.C;

  [cardName] = card.pretty_name.split("\\/\\/");

  if (!card.type.includes("Land")) {
    mana = [];

    const str = card.cost.map((element) =>
      element.length > 1 // is element not just a mana symbol or one digit generic
        ? // are the characters all numeric?
          !isNaN(element)
          ? element // just use this element event though it's two digits
          : // otherwise this is a hybrid symbol and we need to remove the parantheses and /
            element
              .substr(1, element.length - 2)
              .split("/")
              .join("")
        : // just use the element as is if it just a single digit or mana symbol
          element
    );

    str.forEach((element, index) => {
      const i = str.length - 1 - index;

      if (manasymbols[str[i]]) {
        const ManaSymbol = manasymbols[str[i]];
        mana.push(
          <ManaSymbol
            className="Symbol"
            key={i}
            style={{ margin: `0 2px`, height: `14px`, width: `14px` }}
          />
        );
      } else {
        mana.push(
          <GenericManaSymbol
            className="GenericSymbol"
            symbol={str[i]}
            key={i}
            styleOverride={{ margin: `0 2px`, height: `14px`, width: `14px` }}
          />
        );
      }
    });
  }

  const colors = colorArraryNumbertoString(card.colors).join("");

  try {
    if (colors.length > 2) {
      ArcComponent = arcs.GOLD;
    } else if (colors.length === 0) {
      ArcComponent = arcs.C;
    } else {
      ArcComponent = arcs[colors];
    }
  } catch (e) {
    ArcComponent = arcs.GOLD;
  }

  const hasInfinite = card && isCardInfinite(card) ? true : false;

  mana.reverse();

  const cardColor = hovering && !disabled && card ? "#33364D" : "#1F202E";
  const textColor = hovering && !disabled && card ? "#f9f0ea" : "";

  let isRebalanced = false;
  if (cardName && cardName.startsWith("A-")) {
    isRebalanced = true;
    cardName = cardName.slice(2);
  }

  const isMissingCopies =
    quantity &&
    collection !== undefined &&
    !hasInfinite &&
    collection < quantity;

  return (
    <>
      <div
        className={`card-element card-container-${style || "tracker"}`}
        key={`${cardId}-${cardId}-${style}-${quantity}-${max}-${odds}-${collection}`}
        style={{ ...styleOverride, opacity: disabled ? 0.6 : 1 }}
      >
        {quantity !== undefined ? (
          <div className="count">
            {!inLobby && <QuantityComponent fill="#1F202E" />}
            <div className="text">
              {max ? `${quantity}/${max}` : `${quantity}X`}
            </div>
          </div>
        ) : (
          <></>
        )}
        {odds !== undefined && !inLobby ? (
          <div className="odds">
            {<OddsComponent fill="#1F202E" />}
            <div className="text">{`${odds}%`}</div>
          </div>
        ) : (
          <></>
        )}
        <div className="arc">{text ? <></> : <ArcComponent />}</div>
        <div className="corner left">
          {!inLobby && <LeftComponent fill={cardColor} />}
        </div>
        <div
          className="center"
          style={{ backgroundColor: inLobby || cardColor }}
        >
          {isRebalanced && <div className="rebalanced-icon" />}
          <div
            className={cardName ? "name" : "text"}
            style={{ color: text ? "" : textColor }}
          >
            {cardName || text}
          </div>
          <div className="cost">{mana}</div>
        </div>
        <div className="corner right">
          {!inLobby && <RightComponent fill={cardColor} />}
        </div>
        {collection !== undefined ? (
          <div className={`collection ${isMissingCopies ? "missing" : ""}`}>
            {!inLobby && <CollectionComponent fill="#1F202E" />}
            <div
              className={`text ${
                collection === 4 || hasInfinite ? "gray" : ""
              }`}
            >
              {(hasInfinite || quantity || 0) - collection < 0
                ? 0
                : quantity - collection}
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
