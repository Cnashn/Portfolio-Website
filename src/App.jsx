import { BrowserRouter } from "react-router-dom";
import {About, Experience, Hero, Navbar, Tech, Works} from './components';



const App = () => {
  return (
   <BrowserRouter>
    <div className="relative z-0 bg-primary">
      <div className="bg-primary">
        <Navbar />
        <Hero />
      </div>
      <About />
      <Experience />
      <Tech />
      <Works />
      
    </div>
   </BrowserRouter>

  )
}

export default App
