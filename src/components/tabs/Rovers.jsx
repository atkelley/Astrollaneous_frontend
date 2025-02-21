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
    console.log(name)

    await getRoverData(`${name}/`, {params: { api_key: `${env.VITE_NASA_API_KEY}` } } ).then(({ data: { rover }}) => {
      console.log(rover)
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
        <nav>
          <div className="nav nav-tabs" id="nav-tabs" role="tablist">
            <a className="nav-link active" id="perseverance" href="" role="tab" onClick={handleTabClick}>Perseverance</a>
            <a className="nav-link" id="curiosity" href="" role="tab" onClick={handleTabClick}>Curiosity</a>
            <a className="nav-link" id="spirit" href="" role="tab" onClick={handleTabClick}>Spirit</a>
            <a className="nav-link" id="opportunity" href="" role="tab" onClick={handleTabClick}>Opportunity</a>
          </div>
        </nav>
        { isLoaded ? <Rover rover={selectedRover} /> : <Spinner /> }
      </section>
    </main>
  );
}