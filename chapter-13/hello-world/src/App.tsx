import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

interface State {
  userName: string,
  imageUrl: string
}

function App() {

  const [state, setState] = useState<State>(
  {
    userName: "Robo", 
    imageUrl: "https://picsum.photos/600/150"
  });

  const myStyles = {margin:20}

  return (
    <div style={myStyles}>
      <h1>{state.userName}</h1>
      <img src={state.imageUrl} />
     </div>
  );
}

export default App;
