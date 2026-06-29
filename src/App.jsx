import { BrowserRouter } from "react-router-dom";
import {About, Contact, Experience, Hero, Navbar, Tech, Works} from './components';
import { LanguageProvider } from './context/LanguageContext';
import ScrollProgress from './components/ScrollProgress';
import CustomCursor from './components/CustomCursor';



const App = () => {
  return (
   <BrowserRouter>
    <LanguageProvider>
      <CustomCursor />
      <ScrollProgress />
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
