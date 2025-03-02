import { useState } from 'react';
import PropTypes from 'prop-types';
import { getRoverData } from '../../api/nasa.api';
import { getFormalDateString, capitalizeEveryFirstLetter, reformatDateString, getNextDate } from '../common/Utilities';
import { roverVideos } from '../common/Constants';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Rover({ rover, sendModalData }) {
  const { name, status, launch_date, landing_date, max_date, max_sol, cameras } = rover;

  const [selected, setSelected] = useState({ dateType: "earth", solNumber: 1, cameraData: {} });
  const [earthDate, setEarthDate] = useState(new Date(max_date + "T12:00:00.000Z"));
  const [cameraType, setCameraType] = useState(null);
  const [slideIndex, setSlideIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  const fetchData = async () => {
    setIsLoaded(false);
    let cameraData = {};      
    const env = await import.meta.env;

    await getRoverData.get(`${name.toLowerCase()}/photos`, {
      params: {
        ...(selected.dateType == "earth" ? { earth_date: `${earthDate.getFullYear()}-${earthDate.getMonth()+1}-${earthDate.getDate()}` } : {}),
        ...(selected.dateType == 'sol' ? { sol: selected.solNumber } : {}),
        api_key: env.VITE_NASA_API_KEY
      },
    }).then(({ data: { photos }}) => {
      photos.forEach(photo => {
        (cameraData[photo.camera.name]) ? cameraData[photo.camera.name].push(photo.img_src) : cameraData[photo.camera.name] = [photo.img_src];
      });
    }).then(() => {
      setSlideIndex(0);
      setSelected({ ...selected, cameraData: cameraData });
      setCameraType(Object.keys(cameraData)[0]);
      setIsLoaded(true);
    }).catch(error => {
      console.log(error);
    });
  }

  const handleNextSlide = (delta) => {
    let newIndex = slideIndex + delta;

    if (newIndex < 0) {
      setSlideIndex(selected.cameraData[cameraType].length - 1);
    } else if (newIndex > selected.cameraData[cameraType].length - 1) {
      setSlideIndex(0);
    } else {
      setSlideIndex(newIndex);
    }
  }

  const handleCameraType = (name) => {
    setSlideIndex(0);
    setCameraType(name);
  }

  return (
    <div className="rover">       
      <div className="left-box">
        <video controls autoPlay loop muted>
          <source src={roverVideos[name]} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className="info-box">
          <p>Rover: <a href={`https://en.wikipedia.org/wiki/${name}_(rover)`} target="_blank" rel="noopener noreferrer">{name}</a></p>
          <p>Launched: {getFormalDateString(launch_date)}</p>
          <p>Landed: {getFormalDateString(landing_date)}</p>
          <p>Latest: {getFormalDateString(max_date)}</p>
          <p>Status: <span className={`${status === 'active' ? 'active' : 'complete'}`}> {capitalizeEveryFirstLetter(status)}</span></p>
        </div>

        {cameras && 
          <table>
            <thead>
              <tr>
                <th>Acronym</th>
                <th>Camera</th>
              </tr>
            </thead>
            <tbody>
              {cameras.map((camera, index) => 
                <tr 
                  key={index} 
                  className={isLoaded ? (!selected.cameraData[camera.name] ? "inactive" : "active") : ""} 
                  onClick={(isLoaded && selected.cameraData[camera.name]) ? () => handleCameraType(camera.name) : () => {}}
                >
                  <td>{camera.name}</td><td>{camera.full_name}</td>
                </tr>
              )}
            </tbody>
          </table>
        }
      </div>

      <div className="right-box">
        <div className="search-box">
          <h2 className="search-title">Search photos by Earth date or Sol number:</h2>

          <div className="search-dates">
            <div className="earth-date" onClick={() => setSelected({ ...selected, "dateType": "earth" })}>  
              <div className="earth-date-radio-box">
                <div className="earth-date-label-box">
                  <input 
                    id="earth"
                    type="radio" 
                    name="date-type-selector" 
                    value="earth"  
                    onChange={(event) => setSelected({ ...selected, "dateType": event.target.value })} 
                    checked={(selected.dateType == "earth")}
                  /> 
                  <label htmlFor="earth">By Earth</label>
                </div>
                <span>(from {reformatDateString(landing_date)} to {reformatDateString(max_date)})</span>
              </div>
                
              <div className="earth-date-selector-box">
                <DatePicker selected={earthDate} maxDate={getNextDate(max_date)} minDate={getNextDate(landing_date)} onChange={(date) => setEarthDate(date)} />
              </div>
            </div>

            <div className="sol-number" onClick={() => setSelected({ ...selected, "dateType": "sol" })}>         
              <div className="sol-number-radio-box">
                <div className="sol-number-label-box">
                  <input 
                    id="sol" 
                    type="radio" 
                    name="date-type-selector" 
                    value="sol" 
                    max={max_sol}
                    onChange={(event) => setSelected({ ...selected, "dateType": event.target.value })} 
                    checked={(selected.dateType == 'sol')}
                  /> 
                  <label htmlFor="sol">By Sol</label>
                </div>
                <span>(from Sol 1 to Sol { max_sol })</span>
              </div>

              <div className="sol-number-selector-box">
                <input 
                  id="number"
                  type="number" 
                  min="1" 
                  max={max_sol} 
                  className="sol-number-selector-input"
                  value={selected.solNumber}
                  onChange={(event) => setSelected({ ...selected, "solNumber": event.target.value })}
                />
              </div> 
            </div>
          </div>

          <div className="search-submit">
            <button type="submit" onClick={fetchData}>Search</button>
          </div>  
        </div>
  
        {isLoaded &&
          <div className="slideshow-box">
            {Object.keys(selected.cameraData).length > 0 ? 
              <div className="slideshow-wrapper">
                <div className="slideshow-header">
                  <button onClick={() => handleNextSlide(-1)}>&#10094;&#10094;&#10094;</button>
                  <p className="slide-description">{`${cameraType} - (${slideIndex + 1}/${selected.cameraData[cameraType].length})`}</p>
                  <button onClick={() => handleNextSlide(1)}>&#10095;&#10095;&#10095;</button> 
                </div>
                <div className="slideshow-content">
                  <a onClick={() => sendModalData({ imgSrc: selected.cameraData[cameraType][slideIndex], imgAlt: `${name} - ${cameraType}`, imgCaption: `${name} - ${cameraType} ${cameraType} - (${slideIndex + 1}/${selected.cameraData[cameraType].length})` })}>
                    <img src={selected.cameraData[cameraType][slideIndex]} alt={`${name} - ${cameraType} - ${slideIndex + 1}`} />
                  </a>
                </div>
              </div>
              : 
              <p className="no-results-box">No results found.</p>
            }
          </div>
        }
      </div>
    </div>
  )
}

Rover.propTypes = {
  rover: PropTypes.object,
  sendModalData: PropTypes.func
};