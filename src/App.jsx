import { Routes, Route, BrowserRouter } from "react-router-dom";
import { useState } from "react";
import Header from "./layout/Header";
import Navbar from "./layout/Navbar";
import Modal from "./components/common/Modal";
import Wrapper from "./layout/Wrapper";
import Footer from "./layout/Footer";
import Home from "./components/tabs/Home";
import Blog from "./components/tabs/Blog";
import Mars from "./components/tabs/Mars";
import Rovers from "./components/tabs/Rovers";
import Satellites from "./components/tabs/Satellites";
import Nasa from "./components/tabs/Nasa";
import Techport from "./components/tabs/Techport";
import About from "./components/tabs/About";
import Contact from "./components/iterables/Contact";
import Create from "./components/iterables/Create";
import Update from "./components/iterables/Update";
import User from "./components/iterables/User";
import Alerts from "./layout/Alerts";

export default function App() {
  const [modalData, setModalData] = useState({ type: null, src: null, alt: null, caption: null });
  const [showModal, setShowModal] = useState(false);

  const closeModal = () => {
    setModalData({ type: null, src: null, alt: null, caption: null });
    setShowModal(false);
  }

  const openModal = (data) => {
    setModalData({ ...data })
    setShowModal(true);
  }

  return (
    <BrowserRouter>
      <Header /> 
      <Navbar sendModalData={openModal} />
      {showModal && <Modal { ...modalData } closeModal={closeModal} showModal={showModal} />}
      
      <Routes>        
        <Route path="/blog/create" exact element={<Wrapper><Create /></Wrapper>} />
        <Route path="/blog/update/:id" exact element={<Wrapper><Update /></Wrapper>} />
        <Route path="/users/:id" exact element={<Wrapper><User /></Wrapper>} />     

        <Route path="/" exact element={<Wrapper><Home sendModalData={openModal} /></Wrapper>} />
        <Route path="/blog" exact element={<Wrapper><Blog /></Wrapper>} />
        <Route path="/mars" exact element={<Wrapper><Mars sendModalData={openModal} /></Wrapper>} />
        <Route path="/rovers" exact element={<Wrapper><Rovers sendModalData={openModal} /></Wrapper>} />
        <Route path="/satellites" exact element={<Wrapper><Satellites /></Wrapper>} />
        <Route path="/nasa" exact element={<Wrapper><Nasa sendModalData={openModal} /></Wrapper>} />
        <Route path="/techport" exact element={<Wrapper><Techport /></Wrapper>} />
        <Route path="/about" exact element={<Wrapper><About /></Wrapper>} />
        <Route path="/contact" exact element={<Wrapper><Contact /></Wrapper>} />
      </Routes>

      <Alerts />
      <Footer />
    </BrowserRouter>
  );
}
