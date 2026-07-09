import { BrowserRouter } from "react-router-dom";
import {About, Contact, Experience, Hero, Navbar, Tech, Works} from './components';
import { LanguageProvider } from './context/LanguageContext';
import ScrollProgress from './components/ScrollProgress';
import Terminal from './components/Terminal';
import { BackgroundLines } from './components/ui/background-lines';



const App = () => {
  return (
   <BrowserRouter>
    <LanguageProvider>
      <ScrollProgress />
      <Terminal />
      <div className="relative z-0">
        <div>
          <Navbar />
          <Hero />
        </div>
        <div className="relative">
          <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
            <div className="sticky top-0 h-screen overflow-hidden">
              <BackgroundLines className="h-full w-full" />
            </div>
          </div>
          <About />
          <Experience />
          <Tech />
          <Works />
          <Contact />
        </div>
      </div>
    </LanguageProvider>
   </BrowserRouter>

  )
}

export default App
