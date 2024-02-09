import { ThemeProvider } from './components/theme-provider'
import { ModeToggle } from './components/ModeToggle';
import Header from './components/Header';

import './App.css'

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <Header />
      <p>test</p>
      <ModeToggle />
    </ThemeProvider>
  )
}

export default App
