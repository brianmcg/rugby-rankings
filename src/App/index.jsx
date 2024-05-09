import { useRef } from 'react';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';

import './App.css'

// import SportsRugbyIcon from '@mui/icons-material/SportsRugby';

function App() {
  const mainRef = useRef(null);

  const onScroll = () => window.scrollTo({
    top: mainRef.current.offsetTop,
    behavior: 'smooth',
  });
        
  return (
    <>
      <Header onClickScroll={onScroll} />
      <main ref={mainRef}>
        <Main />
      </main>
      <Footer />
    </>
  )
}

export default App
