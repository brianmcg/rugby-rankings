// import { Suspense, ConcurrentMode } from 'react';
// import { ErrorBoundary } from "react-error-boundary";
import Header from '@components/Header';
import Rankings from '@components/Rankings';
import Footer from '@components/Footer';
// import Loading from '@components/Loading';
// import ErrorMessage from '@components/ErrorMessage';


function App() {
  return (
    <>
      <Header />
      <main>
        {/*<ErrorBoundary fallback={<ErrorMessage message="Failed to fetch data!" />}>*/}
          {/*<Suspense fallback={<Loading />}>*/}
            <Rankings />
          {/*</Suspense>*/}
        {/*</ErrorBoundary>*/}
      </main>
      <Footer />
    </>
  )
}

export default App
