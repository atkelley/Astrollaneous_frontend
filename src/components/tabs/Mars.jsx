import { useState, useEffect, useRef } from 'react';
import { getMarsWeatherData } from '../../api/nasa.api';
import { getFormalDateString } from '../common/Utilities';
import mars_orange from '../../assets/mars_round.png';
import elysium_planitia from '../../assets/elysium_planitia.jpg';
import Loader from '../common/Loader';

export default function Mars() {
  const tdRefs = useRef([]);
  const [weatherData, setWeatherData] = useState({ 
    data: [], 
    selectedSol: null, 
    convertedSolTemps: null, 
    convertedSolPressures: null, 
    convertedSolSpeeds: null, 
    conversions: { 'temperature': 'celsius', 'pressure': 'pascal', 'speed': 'm/s' }, // DEFAULT: temperature => Celsius, pressure => Pascal, wind speed => m/s
  });
  const [isLoaded, setIsLoaded] = useState(false);


  useEffect(() => {
    async function getMarsWeather() {
      await getMarsWeatherData().then(response => {
        let array = [];

        for (let key in response.data) {
          if (parseInt(key)){
            array.push({...response.data[key], 'sol': key})
          } 
        }      

        setWeatherData({ 
          ...weatherData,
          data: array, 
          selectedSol: array[0], 
          convertedSolTemps: convertValues(array[0]['AT'], 'temperature'),
          convertedSolPressures: convertValues(array[0]['PRE'], 'pressure'),
          convertedSolSpeeds: convertValues(array[0]['HWS'], 'speed'),
        });

        setIsLoaded(true)
      }).catch(error => {
        console.log(error);
      });
    }

    getMarsWeather();
  }, []);

  const convertValues = (valuesObj, metric) => {
    let tempObj = {};

    if (metric === 'temperature') {
      for (let temp in valuesObj) {
        tempObj[temp] = (valuesObj[temp] * 1.8) + 32
      }
    }

    if (metric === 'pressure') {
      for (let pressure in valuesObj) {
        tempObj[pressure] = valuesObj[pressure] / 133.3;
      }
    }

    if (metric === 'speed') {
      for (let speed in valuesObj) {
        tempObj[speed] = valuesObj[speed] * 2.237;
      }
    }

    return tempObj;
  }

  const selectSol = (event) => {
    let selected = weatherData.data.filter(datum => datum.sol === event.target.value)[0];
    
    for(let td of tdRefs.current) {
      let children = td.children;

      for(let child of children) {
        if (child.id === "celsius" || child.id === "pascal" || child.id === "m/s") {
          child.classList.add('selected');
        } else {
          child.classList.remove('selected');
        }
      }
    }

    setWeatherData({ 
      ...weatherData, 
      selectedSol: selected, 
      convertedSolTemps: convertValues(selected['AT'], 'temperature'),
      convertedSolPressures: convertValues(selected['PRE'], 'pressure'),
      convertedSolSpeeds: convertValues(selected['HWS'], 'speed'),
      conversions: { 'temperature': 'celsius', 'pressure': 'pascal', 'speed': 'm/s' }
    });
  }

  const toggleConversion = (event) => {
    const { name, id } = event.target;

    let children = event.target.parentElement.children;
    for(let child of children) {
      if (child.id === id) {
        child.classList.add('selected');
      } else {
        child.classList.remove('selected');
      }
    }
    let tempObj = { ...weatherData, conversions: { ...weatherData.conversions, [name]: id } };
    setWeatherData(tempObj);
  }

  return (
    <main className="mars">
      {isLoaded ?
        <section>
          <div className="title-box">
            <img src={mars_orange} alt="picture of Mars" />

            <div className="text-box">
              <h1>Mars Daily Weather</h1>
              <p>The InSight lander is taking daily weather measurements on Mars from <a className="mars-insight-link" data-toggle="modal" data-target="#mainModal"><b>Elysium Planitia</b></a> (a flat, smooth plain near Mars&apos; equator).</p>
              <p><a href="https://mars.nasa.gov/insight/" target="_blank" rel="noopener noreferrer">Click for more information about NASA&apos;s InSight program.</a></p>

    
              <select value={weatherData.selectedSol['sol']} onChange={selectSol}>
                {weatherData.data.length > 0 && (
                  weatherData.data.map((datum, index) => <option key={index} value={datum.sol}>Sol {datum.sol} - {getFormalDateString(datum.First_UTC.split('T')[0])}</option>
                ))}
              </select>
            </div>
          </div>

          <table>
            <thead>
              <tr>
                <th>Parameter</th>
                <th>Avg.</th>
                <th>Min.</th>
                <th>Max.</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td ref={(el) => (tdRefs.current[0] = el)}>Temperature ( <button name="temperature" className="selected" id="celsius" onClick={toggleConversion}>°C</button> | <button name="temperature" id="fahrenheit" onClick={toggleConversion}>°F</button> )</td>
                <td>{ (weatherData.conversions.temperature === 'celsius') ? `${weatherData.selectedSol['AT']['av'].toFixed(2)} °C` : `${weatherData.convertedSolTemps['av'].toFixed(2)} °F` }</td>
                <td>{ (weatherData.conversions.temperature === 'celsius') ? `${weatherData.selectedSol['AT']['mn'].toFixed(2)} °C` : `${weatherData.convertedSolTemps['mn'].toFixed(2)} °F` }</td>
                <td>{ (weatherData.conversions.temperature === 'celsius') ? `${weatherData.selectedSol['AT']['mx'].toFixed(2)} °C` : `${weatherData.convertedSolTemps['mx'].toFixed(2)} °F` }</td>
              </tr>
              <tr>
                <td ref={(el) => (tdRefs.current[1] = el)}>Pressure ( <button name="pressure" className="selected" id="pascal" onClick={toggleConversion}>Pa</button> | <button name="pressure" id="mmHg" onClick={toggleConversion}>mmHg</button> )</td>
                <td>{ (weatherData.conversions.pressure === 'pascal') ? `${weatherData.selectedSol['PRE']['av'].toFixed(2)} Pa` : `${weatherData.convertedSolPressures['av'].toFixed(2)} mmHg` }</td>
                <td>{ (weatherData.conversions.pressure === 'pascal') ? `${weatherData.selectedSol['PRE']['mn'].toFixed(2)} Pa` : `${weatherData.convertedSolPressures['mn'].toFixed(2)} mmHg` }</td>
                <td>{ (weatherData.conversions.pressure === 'pascal') ? `${weatherData.selectedSol['PRE']['mx'].toFixed(2)} Pa` : `${weatherData.convertedSolPressures['mx'].toFixed(2)} mmHg` }</td>
              </tr> 
              <tr>
                <td ref={(el) => (tdRefs.current[2] = el)}>Wind Speed ( <button name="speed" className="selected" id="m/s" onClick={toggleConversion}>m/s</button> | <button name="speed" id="mph" onClick={toggleConversion}>mph</button> )</td>
                <td>{ (weatherData.conversions.speed === 'm/s') ? `${weatherData.selectedSol['HWS']['av'].toFixed(2)} m/s` : `${weatherData.convertedSolSpeeds['av'].toFixed(2)} mph` }</td>
                <td>{ (weatherData.conversions.speed === 'm/s') ? `${weatherData.selectedSol['HWS']['mn'].toFixed(2)} m/s` : `${weatherData.convertedSolSpeeds['mn'].toFixed(2)} mph` }</td>
                <td>{ (weatherData.conversions.speed === 'm/s') ? `${weatherData.selectedSol['HWS']['mx'].toFixed(2)} m/s` : `${weatherData.convertedSolSpeeds['mx'].toFixed(2)} mph` }</td>
              </tr>
            </tbody>
          </table>



          {/* <div className="modal fade bd-example-modal-lg" id="mainModal" tabIndex="-1" role="dialog" aria-labelledby="modalLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-body embed-responsive-16by9">
                  <img itemProp="image" src="/static/mySpaceStuff/img/mars-surface.jpg" className="img-rounded" style={{ width: "100%", height: "auto" }} />
                  <p className="modal-title float-left" id="modalLabel"><em>NASA/JPL-Caltech &copy; 2021</em></p>
                  <button type="button" className="btn btn-secondary button-float-right" data-dismiss="modal">Close</button>
                </div>
              </div>
            </div>
          </div> */}
        </section>
      :
        <Loader />
      }
    </main>
  );
}