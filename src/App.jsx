import { Routes, Route } from "react-router-dom";
import Header from "./layout/Header";
import Navbar from "./layout/Navbar";
import Wrapper from "./layout/Wrapper";
import Footer from "./layout/Footer";
import Home from "./components/pages/Home";
import Blog from "./components/pages/Blog";
import Mars from "./components/pages/Mars";
import Rovers from "./components/pages/Rovers";
import Satellites from "./components/pages/Satellites";
import Nasa from "./components/pages/Nasa";
import Techport from "./components/pages/Techport";
import About from "./components/pages/About";
import User from "./components/iterables/User";
import Alerts from "./layout/Alerts";


export default function App() {
  return (
    <>
      <Header /> 
      <Navbar />
      
      <Routes>        
        <Route path="/" exact element={<Wrapper><Home /></Wrapper>} />
        <Route path="/blog" exact element={<Wrapper><Blog /></Wrapper>} />
        <Route path="/mars" exact element={<Wrapper><Mars /></Wrapper>} />
        <Route path="/rovers" exact element={<Wrapper><Rovers /></Wrapper>} />
        <Route path="/satellites" exact element={<Wrapper><Satellites /></Wrapper>} />
        <Route path="/nasa" exact element={<Wrapper><Nasa /></Wrapper>} />
        <Route path="/techport" exact element={<Wrapper><Techport /></Wrapper>} />
        <Route path="/about" exact element={<Wrapper><About /></Wrapper>} />
        <Route path="/users/:id" exact element={<Wrapper><User /></Wrapper>} />   
      </Routes>

      <Alerts />
      <Footer />
    </>
  );
}
