import React from "react";

import { ReactComponent as SymbolBackground } from "../assets/symbol_Background.svg";
import { ReactComponent as SymbolBackgroundBig } from "../assets/symbol_Background_Big.svg";

export default function GenericManaSymbol(props) {
  const { symbol, kind, styleOverride } = props;

  const background =
    kind === "large" ? (
      <SymbolBackgroundBig className="SymbolBackground" />
    ) : (
      <SymbolBackground className="SymbolBackground" />
    );

  return (
    <div className="GenericSymbol" style={styleOverride}>
      {background}
      <div className="SymbolText" style={{ userSelect: "none" }}>
        {symbol}
      </div>
    </div>
  );
}
