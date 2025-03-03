import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getRoverData } from '../../api/nasa.api';
import Rover from '../iterables/Rover';
import Spinner from '../common/Spinner';

export default function Rovers({ sendModalData }) {
  const [tabSelect, setTabSelect] = useState("perseverance");
  const [selectedRover, setSelectedRover] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const fetchData = async (name) => {
    setIsLoaded(false);
    setTabSelect(name);
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
    fetchData("perseverance");
  }, []);

  return (
    <main className="rovers">
      <section>
        <div className="rovers-nav-list">
          <button type="button" id="perseverance" className={tabSelect === "perseverance" ? 'selected' : null} onClick={(event) => fetchData(event.target.id)}>Perseverance</button>
          <button type="button" id="curiosity" className={tabSelect === "curiosity" ? 'selected' : null} onClick={(event) => fetchData(event.target.id)}>Curiosity</button>
          <button type="button" id="spirit" className={tabSelect === "spirit" ? 'selected' : null} onClick={(event) => fetchData(event.target.id)}>Spirit</button>
          <button type="button" id="opportunity" className={tabSelect === "opportunity" ? 'selected' : null} onClick={(event) => fetchData(event.target.id)}>Opportunity</button>
        </div>
        {isLoaded ? <Rover rover={selectedRover} sendModalData={sendModalData} /> : <Spinner />}
      </section>
    </main>
  );
}

Rovers.propTypes = {
  sendModalData: PropTypes.func
};