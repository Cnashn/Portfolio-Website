import { BrowserRouter } from "react-router-dom";
import {About, Contact, Experience, Hero, Navbar, Tech, Works} from './components';
import { LanguageProvider } from './context/LanguageContext';



const App = () => {
  return (
   <BrowserRouter>
    <LanguageProvider>
      <div className="relative z-0 bg-primary">
        <div className="bg-primary">
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
