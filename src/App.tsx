import { useState } from 'react'
import { Desktop } from './components/desktop/Desktop'
import { SettingsProvider } from './context/SettingsContext'
import { BootSequence } from './components/boot/BootSequence'

function App() {
  const [isBooting, setIsBooting] = useState(() => {
    return !sessionStorage.getItem('staros_booted');
  });

  const handleBootComplete = () => {
    sessionStorage.setItem('staros_booted', 'true');
    setIsBooting(false);
  };

  return (
    <SettingsProvider>
      {isBooting ? (
        <BootSequence onComplete={handleBootComplete} />
      ) : (
        <Desktop />
      )}
    </SettingsProvider>
  )
}

export default App
