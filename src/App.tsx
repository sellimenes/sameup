import '@/i18n'

import { ThemeProvider } from './components/theme-provider'
import Header from './components/Header';
import Footer from './components/Footer';

import './App.css'
import ContentDetail from './components/ContentDetail';

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <Header />
      <main className='flex-1 container'>
       <ContentDetail />
      </main>
      <Footer />
    </ThemeProvider>
  )
}

export default App
