import { useEffect, useRef } from "react";
import Phobos from '../../assets/phobos_flat.jpg';
import Deimos from '../../assets/deimos_flat.png';
import Mars from '../../assets/mars_flat.jpg';

export default function Loader() {
  const loadingTextRef = useRef(null);

  useEffect(() => {
    let index = 1;  

    const id = setInterval(() => {
      let spans = loadingTextRef.current.children;

      if (index < spans.length) {
        spans[index].style.visibility = 'visible';
        index += 1;
      } else {
        index = 1;

        for(let i = index; i < spans.length; i++) {
          spans[i].style.visibility = 'hidden';
        }        
      }
    }, 500);

    return () => clearInterval(id);
  }, []);

  return (
    <div className="loader">
      <div className="mars" style={{ backgroundImage: `url(${Mars})` }}></div> 
      <div className="phobos" style={{ backgroundImage: `url(${Phobos})` }}></div>
      <div className="deimos" style={{ backgroundImage: `url(${Deimos})` }}></div>
      <h1 className="loading-text" ref={loadingTextRef}>Loading<span>.</span><span>.</span><span>.</span><span>.</span><span>.</span></h1>
    </div>
  );
}