import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Header from './layout/Header';
import Navbar from './layout/Navbar';
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

  return (
    <BrowserRouter>
      <Header /> 
      <Navbar />

      <Routes>        
        {/* <Route path="/login" exact component={Login} />
        <Route path="/register" exact component={Register} /> */}
        {/* <Route path="/blog/create" exact component={CreatePost} />
        <Route path="/blog/update/:id" exact component={UpdatePost} />
        <Route path="/user/:id" exact component={User} /> */}        

        <Route path="/" exact element={<Wrapper><Home /></Wrapper>} />
        <Route path="/blog" exact element={<Wrapper><Blog /></Wrapper>} />
        <Route path="/mars" exact element={<Wrapper><Mars /></Wrapper>} />
        <Route path="/rovers" exact element={<Wrapper><Rovers /></Wrapper>} />
        <Route path="/satellites" exact element={<Wrapper><Satellites /></Wrapper>} />
        <Route path="/nasa" exact element={<Wrapper><Nasa /></Wrapper>} />
        <Route path="/techport" exact element={<Wrapper><Techport /></Wrapper>} />
        <Route path="/about" exact element={<Wrapper><About /></Wrapper>} />
        <Route path="/contact" exact element={<Wrapper><Contact /></Wrapper>} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}
