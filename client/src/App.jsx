/**********************************************/
/* Application composition and routing.       */
/* Connects Navbar, Routes/pages, and Footer. */
/**********************************************/

// Imports the React Router components needed to handle navigation and routing.
// BrowserRouter enables browser-based routing.
// Routes contains all available Route definitions.
// Route connects a URL path to a specific React component.
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Education from "./pages/Education";
import Services from "./pages/Services";
import Contact from "./pages/Contact";

function App() {
  return (
    // Enables React Router for all components contained inside it
    <BrowserRouter>  
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/education" element={<Education />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

// Exports so it can be imported and used by other files
export default App;