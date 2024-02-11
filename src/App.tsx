import '@/i18n'

import { ThemeProvider } from './components/theme-provider'
import Header from './components/Header';
import Footer from './components/Footer';

import ContentDetail from './components/ContentDetail';
import MobileBottomNavbar from './components/MobileBottomNavbar';

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <Header />
      <main className='flex-1 w-full sm:container'>
       <ContentDetail />
      </main>
      <MobileBottomNavbar />
      <Footer />
    </ThemeProvider>
  )
}

export default App
