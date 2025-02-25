import { useState, useEffect } from 'react';
import { getRoverData } from '../../api/nasa.api';
import Rover from '../iterables/Rover';
import Spinner from '../common/Spinner';

export default function Rovers() {
  const [selectedRover, setSelectedRover] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const fetchRoverData = async (name) => {
    setIsLoaded(false);
    const env = await import.meta.env;

    await getRoverData(`${name}/`, {params: { api_key: `${env.VITE_NASA_API_KEY}` } } ).then(({ data: { rover }}) => {
      setSelectedRover({ ...rover });
    }).then(() => {
      setIsLoaded(true);
    }).catch(error => {
      console.log(error);
    });
  };

  useEffect(() => {
    fetchRoverData("perseverance");
  }, []);

  const handleTabClick = (event) => {
    event.preventDefault();
    // this.handleTabChange(event);
    fetchRoverData(event.target.id);
  }

  return (
    <main className="rovers">
      <section>
        <div className="rovers-nav-list">
          <button type="button" id="perseverance" onClick={handleTabClick} autoFocus>Perseverance</button>
          <button type="button" id="curiosity" onClick={handleTabClick}>Curiosity</button>
          <button type="button" id="spirit" onClick={handleTabClick}>Spirit</button>
          <button type="button" id="opportunity" onClick={handleTabClick}>Opportunity</button>
        </div>
        { isLoaded ? <Rover rover={selectedRover} /> : <Spinner /> }
      </section>
    </main>
  );
}