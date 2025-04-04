import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { getMarsWeather } from '../../api/nasa.api';
import { getFormalDateString } from '../common/Utilities';
import { useModal } from '../../contexts/ModalContext';
import mars_orange from '../../assets/img/mars_round.png';
import elysium_planitia from '../../assets/img/elysium_planitia.jpg';
import Image from '../iterables/Image';
import Loader from '../common/Loader';
import axios from 'axios';

export default function Mars() {
  const tdRefs = useRef([]);
  const [weatherData, setWeatherData] = useState({ 
    data: [], 
    selectedSol: null, 
    convertedSolTemps: null, 
    convertedSolPressures: null, 
    convertedSolSpeeds: null, 
    conversions: { 'temperature': 'celsius', 'pressure': 'pascal', 'speed': 'm/s' }, 
  });
  const [isLoaded, setIsLoaded] = useState(false);
  const { openModal } = useModal();

  // useEffect(() => {
  //   async function getMarsWeather () {
  //     axios.get("https://mars.nasa.gov/rss/api/?feed=weather&category=msl&feedtype=json")
  //     .then((response) => {
  //       // console.log(response.data);
  //       for (let temp in response.data.descriptions) {
  //         if (temp.endsWith("_en")) {
  //           console.log(temp)
  //           console.log(response.data.descriptions[temp])
  //         }
  //       }

  //       for (let temp in response.data.soles.slice(0, 7)) {
  //         // console.log(temp, response.data.soles[temp])
  //       }

  //     }).catch(error => console.error(error));

  //   }

  //   getMarsWeather();
  // }, [])

  useEffect(() => {
    async function fetchData() {
      await getMarsWeather().then(response => {
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

    fetchData();
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
              <p>The <a href="https://en.wikipedia.org/wiki/InSight" target="_blank" rel="noopener noreferrer">InSight</a> lander took daily weather measurements on Mars from <Link className="elysium" onClick={() => openModal(<Image data={{ src: elysium_planitia, alt: "Elysium Planitia", caption: "NASA/JPL-Caltech © 2021" }} />)}><b>Elysium Planitia</b></Link> (a flat, smooth plain near Mars&apos; equator).</p>
              <p>Sadly, InSight stopped transmitting on <a href="https://www.nasa.gov/missions/insight/nasa-retires-insight-mars-lander-mission-after-years-of-science/" target="_blank" rel="noopener noreferrer">Dec. 15th, 2022</a>, but 
              we preserved this page to illustrate some of the data that it was transmitting.</p>
              <p><a href="https://mars.nasa.gov/insight/" target="_blank" rel="noopener noreferrer">Click for more information about NASA&apos;s InSight program.</a></p>

    
              <select name="weather" value={weatherData.selectedSol['sol']} onChange={selectSol}>
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
        </section>
      :
        <Loader />
      }
    </main>
  );
}