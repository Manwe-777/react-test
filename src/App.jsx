/* eslint-disable react/style-prop-object */

import CardTile from "./components/CardTile";

function App() {
  return (
    <div className="app">
      <header className="wrapper">
        <CardTile cardId={7153} quantity={4} collection={4} />
        <CardTile cardId={77501} quantity={4} />
        <CardTile cardId={70732} quantity={2} max={4} />
        <CardTile cardId={66111} quantity={2} max={3} odds={27} />
        <CardTile cardId={75537} quantity={3} max={4} />
        <CardTile cardId={71256} quantity={3} max={4} />
        <CardTile cardId={80853} quantity={3} />
        <CardTile
          cardId={77517}
          quantity={2}
          max={4}
          odds={33}
          collection={4}
        />
        <CardTile cardId={72121} collection={3} />
        <CardTile cardId={75030} disabled collection={4} />
        <CardTile cardId={77} quantity={3} max={4} />
        <CardTile cardId={55} quantity={3} />
        <CardTile text="No cards yet, waiting for opponent to play" />
        <CardTile style="lobby" cardId={7153} quantity={4} collection={4} />
        <CardTile style="lobby" cardId={70205} quantity={2} collection={0} />
        <CardTile style="lobby" cardId={76651} quantity={1} collection={3} />
        <CardTile style="lobby" disabled cardId={77501} quantity={4} />
        <CardTile style="lobby" cardId={66111} odds={27} quantity={2} />
        <CardTile style="lobby" cardId={76476} max={3} quantity={1} />
        <CardTile style="lobby" cardId={80853} quantity={3} />
        <CardTile style="lobby" cardId={72121} quantity={2} disabled />
        <CardTile style="lobby" cardId={77} quantity={3} max={4} />
      </header>
    </div>
  );
}

export default App;
