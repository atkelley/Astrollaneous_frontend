import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { useModal } from '../../contexts/ModalContext';
import { getFormalDateString } from '../common/Utilities';
import { mars_orange, elysium_planitia } from "../../assets/img";
import { getMarsWeather } from '../../api/nasa.api';
import Image from '../iterables/Image';
import Loader from "../common/Loader";


export default function Mars2() {
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
  const { openModal } = useModal();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    await getMarsWeather().then((response) => {
      setWeatherData(response.data.soles.slice(0, 7));
      setIsLoaded(true);
    }).catch(error => console.error(error));
  }

  const columns = {
    min_temp: "Wind Temp. (min.)",
    max_temp: "Wind Temp. (max.)",
    min_gts_temp: "Ground Temp. (min.)",
    max_gts_temp: "Ground Temp. (max.)",
    pressure: "Pressure",
    wind_speed: "Wind Speed",
    wind_direction: "Wind Direction",
    abs_humidity: "Relative Humidity",
    atmo_opacity: "Atmos. Opacity",
    local_uv_irradiance_index: "UV Index",
    sunrise: "Sunrise",
    sunset: "Sunset",
  };

  const getConvertedValue = (key, value) => {
    if (key.toLowerCase().includes("temp")) {
      return parseFloat(((value * 1.8) + 32).toFixed(2));
    }

    if (key.toLowerCase().includes("pressure")) {
      return parseFloat((value / 133.3).toFixed(2));
    }

    if (key.toLowerCase().includes("speed")) {
      if (value === "--"){
        return value;
      } else {
        return parseFloat((value * 0.621371).toFixed(2));
      }
    }
  }

  const convert = (event) => {
    setConversions({...conversions, [event.target.id]: true });
  }

  const unconvert = (event) => {
    setConversions({...conversions, [event.target.id]: false });
  }

  const getTableDataCell = (key, value) => {
    if (key.includes("temp")) {
      return (
        <td>
          <span>{value}</span>
          <span className="float-right">
            (<button className={!conversions[key] ? "selected" : ""} id={key} onClick={unconvert}>°C</button>|<button className={conversions[key] ? "selected" : ""} id={key} onClick={convert}>°F</button>)
          </span>
        </td>
      );
    } else if (key.includes("pressure")) {
      return (
        <td>
          <span>{value}</span>
          <span className="float-right">
            (<button className={!conversions[key] ? "selected" : ""} id={key} onClick={unconvert}>Pa</button>|<button className={conversions[key] ? "selected" : ""} id={key} onClick={convert}>mmHg</button>)
          </span>        
        </td>
      );
    } else if (key.includes("speed")) {
      return (
        <td>
          <span>{value}</span>
          <span className="float-right">
            (<button className={!conversions[key] ? "selected" : ""} id={key} onClick={unconvert}>km/H</button>|<button className={conversions[key] ? "selected" : ""} id={key} onClick={convert}>mph</button>)
          </span>        
        </td>
      );
    } else {
      return (
        <td>
          <span>{value}</span>
        </td>
      );
    }    
  }


  return (
    <main className="mars2">      
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
                Curiosity's location</Link> on the Elysium Planitia (a flat, smooth plain near Mars&apos; equator), autumn starts in month 1, winter in month 4, spring in month 7 and summer in month 10.
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
                Object.entries(columns).map(([key, value], index) => {
                  return (
                    <tr key={index}>
                      {getTableDataCell(key, value)}
                      {weatherData.length > 0 && (
                        weatherData.map((datum) => <td key={datum.id}>{!(key in conversions) || !conversions[key] ? datum[key] : getConvertedValue(key, datum[key])}</td>
                      ))}
                    </tr>
                  )
                }
              ))}
            </tbody>
          </table>
          <div className="footnotes">
            <p>
              * Mars is colder than our planet. Moreover, Mars' atmosphere does not retain the heat. Hence, the difference between day and night temperatures 
              is more pronounced than our planet.
            </p>
            <p>
              ** Because of Mars' thin atmosphere, heat from the Sun can easily escape and cause big differences between Mars' ground and air temperatures. 
              Imagine if you were on the Martian equator at noon, it would feel like summer at your feet, but winter at your head.
            </p>
            <p>
              † Pressure is a measure of the total mass in a column of air above us. Because Mars' atmosphere is extremely tenuous, pressure on Mars' surface 
              is about 160 times less than Earth's. The average pressure on the Martian surface is about 700 Pascals (Earth's average is 100,000 Pascals). 
              Curiosity is in the Gale crater, which is about 5 kilometers (3 miles) deep. For this reason, the pressure measured is usually higher than average.
            </p>
            <p>
              ‡ NASA's Viking landers and Pathfinder rover showed that the average wind speeds at their locations were pretty weak (about 1-4 m/s, 4-15 km/h or 2.5-9 mph). 
              However, during a dust storm, the winds can get quite strong (30 m/s, 110 km/h, 68 mph or more).
            </p>
            <p>
              § Mars' atmosphere contains water vapor and REMS records its relative humidity, which is a measurement of the amount of water vapor in the air compared 
              with the amount of water vapor the air can hold at its measured temperature. Water is also present on Mars as water ice, at Mars' poles. However, 
              proof of liquid water in present-day Mars remains elusive.
            </p>
            <p>
              ¶ Weather on Mars is more extreme than Earth's. Mars is cooler and with bigger differences between day and night temperatures. Also, dust storms are more common. 
              However, Mars (like Earth) also has polar ice caps and seasonal changes. Therefore, like Earth, Mars can have sunny, cloudy or windy days, which effect its 
              atmospheric opacity.
            </p>
            <p>
              # The local ultraviolet (UV) irradiance index indicates the intensity of the ultraviolet radiation from the Sun at Curiosity's location. 
              UV radiation is a damaging agent for life. On Earth, ozone layer prevents damaging UV light from reaching the surface. However, since Mars
              lacks any ozone in the atmosphere, UV radiation can reach the Martian surface.
            </p>
          </div>
        </section>
      :
        <Loader />
      }
    </main>
  )
}