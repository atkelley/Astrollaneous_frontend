import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { useModal } from '../../contexts/ModalContext';
import { getFormalDateString } from '../common/Utilities';
import { mars_orange, elysium_planitia } from "../../assets/img/index";
import { getMarsWeather } from '../../api/nasa.api';
import { parameters, footnotes } from '../common/Constants';
import Image from '../iterables/Image';
import Loader from "../common/Loader";


export default function Mars2() {
  const { openModal } = useModal();
  const [isLoaded, setIsLoaded] = useState(false);
  const [weatherData, setWeatherData] = useState([]);
  const [conversions, setConversions] = useState({
    min_temp: false,
    max_temp: false,
    min_gts_temp: false,
    max_gts_temp: false,
    pressure: false,
    wind_speed: false,
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    await getMarsWeather().then((response) => {
      setWeatherData(response.data.soles.slice(0, 7));
      setIsLoaded(true);
    }).catch(error => console.error(error));
  }

  const convertValue = (key, value) => {
    let converted = value;

    if (key.toLowerCase().includes("temp")) {
      converted = parseFloat(((value * 1.8) + 32).toFixed(2));
    }

    if (key.toLowerCase().includes("pressure")) {
      converted = parseFloat((value / 133.3).toFixed(2));
    }

    if (key.toLowerCase().includes("speed") && value !== "--") {
      converted = parseFloat((value * 0.621371).toFixed(2));
    }

    return converted;
  }

  const convert = (event) => {
    setConversions({...conversions, [event.target.id]: true });
  }

  const revert = (event) => {
    setConversions({...conversions, [event.target.id]: false });
  }

  const adjustParameterCell = (key) => {
    let units = null; 

    switch(key) {
      case "min_temp":
      case "max_temp":
      case "min_gts_temp":
      case "max_gts_temp":
        units = ["°C", "°F"];
        break;
      case "pressure":
        units = ["Pa", "mmHg"];
        break;
      case "wind_speed":
        units = ["km/h", "mph"]
        break;
      default:
        break;
    }

    if (units) {
      return (
        <span>
          (
            <button className={!conversions[key] ? "selected" : ""} id={key} onClick={revert}>{units[0]}</button>|
            <button className={conversions[key] ? "selected" : ""} id={key} onClick={convert}>{units[1]}</button>
          )
        </span>
      )
    } 

    return null;
  }

  const adjustParameterTitle = (key, value) => {
    return (
      <span>
        {value}
        {parameters[key].symbol && <sup className="symbol">{parameters[key].symbol}</sup>}
      </span>
    );
  }

  return (
    <main className="mars">      
      {isLoaded ?
        <section>
          <div className="title-box">
            <img src={mars_orange} alt="picture of Mars" />

            <div className="text-box">
              <h1>Mars Daily Weather</h1>
              <p>
                This page consumes data from the <a className="link" href="https://github.com/ingenology/mars_weather_api/" target="_blank" rel="noopener noreferrer">MAAS API</a>, an open source REST API that presents data collected by the Curiosity rover and
                relayed by the <a className="link" href="http://cab.inta-csic.es/rems/index.html" target="_blank" rel="noopener noreferrer">REMS (Rover Environmental Monitoring Station)</a>.
              </p>
              <p>The term "sol" refers to the duration of one day on Mars. A sol is about 24 hours and 40 minutes. For Curiosity, sol 0 corresponds to the day it landed on Mars.</p>
              <p>While a single day on Earth is about 24 hours, a sol is about 24 hours and 40 minutes. So one single sol starts during one Earth day and finishes during the next Earth day.</p>            
              <p>
                A Martian year lasts about two of Earth's years, but is divided into 12 months (like Earth). However, Martian months range from 46 to 67 sols long. The longest one is month 3 
                (67 sols) and the shortest one is month 9 (46 sols). 
              </p> 
              <p>
                In the southern hemisphere at <Link className="link" onClick={() => openModal(<Image data={{ src: elysium_planitia, alt: "Elysium Planitia", caption: "NASA/JPL-Caltech © 2021" }} />)}>
                Curiosity's location</Link> on the edge of the Elysium Planitia (a flat, smooth plain near Mars&apos; equator), autumn starts in month 1, winter in month 4, spring in month 7 and summer in month 10.
              </p>
            </div>
          </div>

          <table>
            <thead>
              <tr>
                <th><div className="th-param">Parameter</div></th>
                {weatherData.length > 0 && (
                  weatherData.map((datum, index) => <th key={index}><div className="th-sol">Sol {datum.sol}</div><div className="th-season">{datum.season}</div><div className="th-date">({getFormalDateString(datum.terrestrial_date)})</div></th>
                ))}
              </tr>
            </thead>
            <tbody>
              {weatherData.length > 0 && (
                Object.entries(parameters).map(([key, value], index) => {
                  return (
                    <tr key={index}>
                      <td className="parameter">{adjustParameterTitle(key, value.title)}{adjustParameterCell(key)}</td>
                      {weatherData.length > 0 && (
                        weatherData.map((datum) => <td key={datum.id}>{!(key in conversions) || !conversions[key] ? datum[key] : convertValue(key, datum[key])}</td>
                      ))}
                    </tr>
                  )
                }
              ))}
            </tbody>
          </table>
          <div className="footnotes">
            {footnotes.map((footnote, index) => <p key={index}>{footnote}</p>)}
          </div>
        </section>
      :
        <Loader />
      }
    </main>
  )
}