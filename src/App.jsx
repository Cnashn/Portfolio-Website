import { BrowserRouter } from "react-router-dom";
import {About, Contact, Experience, Hero, Navbar, Tech, Works} from './components';
import { LanguageProvider } from './context/LanguageContext';
import ScrollProgress from './components/ScrollProgress';
import CustomCursor from './components/CustomCursor';
import Terminal from './components/Terminal';



const App = () => {
  return (
   <BrowserRouter>
    <LanguageProvider>
      <CustomCursor />
      <ScrollProgress />
      <Terminal />
      <div className="relative z-0">
        <div>
          <Navbar />
          <Hero />
        </div>
        <About />
        <Experience />
        <Tech />
        <Works />
        <Contact />
      </div>
    </LanguageProvider>
   </BrowserRouter>

  )
}

export default App
