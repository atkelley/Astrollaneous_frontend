import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { getFormalDateString } from '../common/Utilities';
import axios from 'axios';
import Loader from "../common/Loader";

import { mars_orange, elysium_planitia } from "../../assets/img";

export default function Mars2() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedSol, setSelectedSol] = useState(0);
  const [weatherData, setWeatherData] = useState([]);
  // const [columns, setColumns] = useState([]);
    
    
  // { 
  //   data: [], 
    // selectedSol: null, 
    // convertedSolTemps: null, 
    // convertedSolPressures: null, 
    // convertedSolSpeeds: null, 
    // conversions: { 'temperature': 'celsius', 'pressure': 'pascal', 'speed': 'm/s' }, 
  // });

  useEffect(() => {
    async function getMarsWeather () {
      axios.get("https://mars.nasa.gov/rss/api/?feed=weather&category=msl&feedtype=json")
      .then((response) => {
        // for (let temp in response.data.descriptions) {
        //   if (temp.endsWith("_en")) {
        //     console.log(temp)
        //     console.log(response.data.descriptions[temp])
        //   }
        // }

        // for (let temp in response.data.soles.slice(0, 7)) {
        //   // console.log(temp, response.data.soles[temp])
        // }

        // console.log(response.data.soles)
        let data = response.data.soles.slice(0, 7);
        setWeatherData(data);
        // setColumns(Object.keys(data[0]));
        setIsLoaded(true);
      }).catch(error => console.error(error));

    }

    getMarsWeather();
  }, []);


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

// "ls"
// "min_temp" (air temp, celsius)
// "max_temp"
// "pressure" (pascals)
// "abs_humidity" (%)
// "wind_speed" (km/H)
// "wind_direction"
// "atmo_opacity"
// "sunrise"
// "sunset"
// "local_uv_irradiance_index"
// "min_gts_temp" (ground temp)
// "max_gts_temp"

  const selectSol = () => {}


  return (
    <main className="mars2">      
      {isLoaded ?
        <section>
          <div className="title-box">
            <img src={mars_orange} alt="picture of Mars" />

            <div className="text-box">
              <h1>Mars Daily Weather</h1>
              <p>The <a href="https://en.wikipedia.org/wiki/InSight" target="_blank" rel="noopener noreferrer">InSight</a> lander took daily weather measurements on Mars from <Link className="elysium" onClick={() => openModal(<Image data={{ src: elysium_planitia, alt: "Elysium Planitia", caption: "NASA/JPL-Caltech © 2021" }} />)}><b>Elysium Planitia</b></Link> (a flat, smooth plain near Mars&apos; equator).</p>
              <p>Sadly, InSight stopped transmitting on <a href="https://www.nasa.gov/missions/insight/nasa-retires-insight-mars-lander-mission-after-years-of-science/" target="_blank" rel="noopener noreferrer">Dec. 15th, 2022</a>, but 
              we preserved this page to illustrate some of the data that it was transmitting.</p>
              <p><a href="https://mars.nasa.gov/insight/" target="_blank" rel="noopener noreferrer">Click for more information about NASA&apos;s InSight program.</a></p>

    
              <select name="weather" value={selectedSol} onChange={selectSol}>
                {weatherData.length > 0 && (
                  weatherData.map((datum, index) => <option key={index} value={datum.id}>Sol {datum.id} - {getFormalDateString(datum.terrestrial_date)}</option>
                ))}
              </select>
            </div>
          </div>

          <table>
            <thead>
              <tr>
                <th><div className="th-param">Parameter</div></th>
                {weatherData.length > 0 && (
                  weatherData.map((datum, index) => <th key={index}><div className="th-sol">Sol {datum.sol}</div><div className="th-date">({getFormalDateString(datum.terrestrial_date)})</div></th>
                ))}
              </tr>
            </thead>
            <tbody>
              {weatherData.length > 0 && (
                Object.entries(columns).map(([key, value], index) => {
                  return (
                    <tr key={index}>
                      <td>{value}</td>
                      {weatherData.length > 0 && (
                        weatherData.map((datum, index) => <td key={datum.id}>{datum[key]}</td>
                      ))}
                    </tr>
                  )
                }
              ))}
            </tbody>
          </table>
        </section>
      :
        <Loader />
      }
    </main>
  )
}