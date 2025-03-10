import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from './layout/Header';
import Navbar from './layout/Navbar';
import Modal from './components/common/Modal';
import Wrapper from './layout/Wrapper';
import Footer from './layout/Footer';
import Home from './components/tabs/Home';
import Blog from './components/tabs/Blog';
import Mars from './components/tabs/Mars';
import Rovers from './components/tabs/Rovers';
import Satellites from './components/tabs/Satellites';
import Nasa from './components/tabs/Nasa';
import Techport from './components/tabs/Techport';
import About from './components/tabs/About';
import Contact from './components/tabs/Contact';

export default function App() {
  const [modalData, setModalData] = useState({ media_type: null, src: null, alt: null, caption: null });
  const [showModal, setShowModal] = useState(false);

  const closeModal = () => {
    setModalData({ media_type: null, src: null, alt: null, caption: null });
    setShowModal(false);
  }

  const openModal = (data) => {
    setModalData({ ...data })
    setShowModal(true);
  }

  return (
    <BrowserRouter>
      <Header /> 
      <Navbar />
      {showModal && <Modal { ...modalData } closeModal={closeModal} showModal={showModal} />}
      
      <Routes>        
        {/* <Route path="/login" exact component={Login} />
        <Route path="/register" exact component={Register} /> */}
        {/* <Route path="/blog/create" exact component={CreatePost} />
        <Route path="/blog/update/:id" exact component={UpdatePost} />
        <Route path="/user/:id" exact component={User} /> */}        

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

      <Footer />
    </BrowserRouter>
  );
}
