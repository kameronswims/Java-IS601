import React, { useState, useEffect } from 'react';
import SnippetSelector from './SnippetSelector';

function App() {

  const initialGameState = { // setting the defaults for when the program is first opened
    victory: false,
    startTime: null, 
    endTime: null,
  }

  const [snippet, setSnippet] = useState(''); 
  const [userText, setUserText] = useState('');
  const [gameState, setGameState] = useState(initialGameState);
  const [hasError, setErrors] = useState(false);
  const [films, setFilms] = useState([]);

  useEffect(function () {
    if (gameState.victory) {
      document.title = "Victory";
    }
  }, [gameState])

  // function fetchDataPromise() {
  //    fetch(https://ghibliapi.herokuapp.com/films?limit=3')
  //      .then(function (response) {
  //        return response.json()
  //      })
  //      .then(function (films) {  
  //        setFilms(films);
  //      })
  //      .catch(function (error) {
  //        setErrors(error);
  //      })
  // }    

  useEffect(function () {
    async function fetchData() {
      try {
        const response = await fetch('https://ghibliapi.herokuapp.com/films?limit=3');
        const films = await response.json();
        setFilms(films);
      }
      catch (error) {
        setErrors(error)
      }
    }
    fetchData();
  }, [])

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
  
  function chooseSnippet(selectedSnippet) {
    setSnippet(selectedSnippet); 
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
      <SnippetSelector films={films} chooseSnippet={chooseSnippet} />
      <> {hasError ? 'An error has occured' : null} </>
    </div>
  ); 
} // in line 46 it is changing to whatever the user has input

export default App;
