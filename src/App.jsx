import { Outlet } from "react-router-dom"; // Outlet importieren
import NavBar from "./components/NavBar.jsx";
import Footer from "./components/Footer.jsx"
import "./index.css"

function App() {
  return (
    <>
    <NavBar/>
      <main>
        <Outlet /> 
      </main>
    <Footer/>
    </>
  );
}

export default App;
