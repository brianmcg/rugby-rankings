import { useState } from 'react';
import Rankings from '@components/Rankings';
import ResponsiveAppBar from '@components/ResponsiveAppBar';
import './App.css';

// import viteLogo from '/vite.svg'
// import reactLogo from './assets/react.svg'
// <img src={reactLogo} className="logo react" alt="React logo" />
// <img src={viteLogo} className="logo" alt="Vite logo" />

function App() {
  return (
    <>
      <header>
        <ResponsiveAppBar />
      </header>

      <main>
        <Rankings />
      </main>

      <footer>
        <p>Author: Brian McGrath</p>
      </footer>
    </>
  )
}

export default App
