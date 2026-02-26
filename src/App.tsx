import { HelmetProvider } from 'react-helmet-async';
import LandingPage from './LandingPage';

function App() {
  return (
    <HelmetProvider>
      <LandingPage />
    </HelmetProvider>
  )
}

export default App
