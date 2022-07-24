import React, { useState } from 'react';

function App() {
  const buttonTextItems = [ // establishing 3 button items with text
    'Bears, beets, battlestar galactica',
    `What's Forrest Gump's password? 1Forrest1`, 
    'Where do programmers like to hang on? The Foo Bar'
  ];
  const initialGameState = { // setting the defaults for when the program is first opened
    victory: false,
    startTime: null, 
    endTime: null,
  }

  const [snippet, setSnippet] = useState(''); 
  const [userText, setUserText] = useState('');
  const [gameState, setGameState] = useState(initialGameState);

  function updateUserText(event) { // a function to take what the user put and replace it 
    const newUserText = event.target.value;
    setUserText(newUserText); 
    if(newUserText === snippet) {
      setGameState({
        ...gameState,
        victory: true,
        endTime: new Date(),
      })
    }
  }
  
  function chooseSnippet(index) {
    setSnippet(buttonTextItems[index]); 
    setGameState({
      ...initialGameState, 
      startTime: new Date().getTime(),
  })
}

  return (
    <div>
      <h2>TypeRace</h2>
      <hr /> 
      <h3>snippet</h3> 
      <div>{snippet}</div>
      <h4>{gameState.victory ? `Done! Woot! Time: ${gameState.endTime}ms` : null}</h4>
      <input value={userText} onChange={updateUserText} /> 
      <hr />
      {buttonTextItems.map((snippetText, index)=> 
      <button key={index} onClick={() => chooseSnippet(index)}>{snippetText}</button>)}
    </div>
  ); 
} // in line 46 it is changing to whatever the user has input

export default App;
