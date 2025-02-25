import { useState, useEffect, useRef } from "react";

export default function Spinner() {
  const [isLoading, setIsLoading] = useState(false);
  const spinningTextRef = useRef(null);

  useEffect(() => {
    let index = 1;  

    const id = setInterval(() => {
      let spans = spinningTextRef.current.children;

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
    <div className="spinner-container">
      <div className="spinner-wrap">
        <div className="spinner"></div> 
      </div>
      {isLoading &&
        <div className="spinning-wrap">
          <h1 className="spinning" ref={spinningTextRef}>Loading<span>.</span><span>.</span><span>.</span><span>.</span><span>.</span></h1>
        </div>
      }
    </div>
  );
}