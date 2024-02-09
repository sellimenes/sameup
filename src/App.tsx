import '@/i18n'

import { ThemeProvider } from './components/theme-provider'
import { ModeToggle } from './components/ModeToggle';
import Header from './components/Header';
import LanguageToggle from './components/LanguageToggle';

import './App.css'

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <Header />
      <p>test</p>
      <ModeToggle />
      <LanguageToggle />
    </ThemeProvider>
  )
}

export default App
