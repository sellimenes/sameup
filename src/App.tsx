import '@/i18n'

import { ThemeProvider } from './components/theme-provider'
import Header from './components/Header';
import Footer from './components/Footer';

import './App.css'

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <Header />
      <main className='flex-1'>
        <p>test</p>
      </main>
      <Footer />
    </ThemeProvider>
  )
}

export default App
