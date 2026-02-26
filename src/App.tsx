import { HelmetProvider } from '@slorber/react-helmet-async';
import LandingPage from './LandingPage';

function App() {
  return (
    <HelmetProvider>
      <LandingPage />
    </HelmetProvider>
  )
}

export default App
