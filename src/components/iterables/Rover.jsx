import { useState } from 'react';
import PropTypes from 'prop-types';
import { getRoverData } from '../../api/nasa.api';
import { getFormalDateString, capitalizeEveryFirstLetter, reformatDateString, getNewSlideIndex } from '../common/Utilities';
import curiosity from "../../assets/img/curiosity.png";
import opportunity from "../../assets/img/opportunity.jpg";
import spirit from "../../assets/img/spirit.jpg";
import perseverance from "../../assets/img/perseverance.jpg";

import Spinner from '../common/Spinner';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Rover({ rover }) {
  const { name, status, launch_date, landing_date, max_date, max_sol, cameras } = rover;
  const roverImages = {
    "Curiosity": curiosity,
    "Perseverance": perseverance,
    "Opportunity": opportunity,
    "Spirit": spirit
  };

  const [earthDate, setEarthDate] = useState(new Date(max_date + "T12:00:00.000Z"));
  const [selected, setSelected] = useState({ 
    dateType: "earth", 
    solNumber: 1, 
    camera: "ALL", 
    cameraType: null,
    cameraData: {},
    slideIndex: 0,
    isLoaded: false
  });

  const [isLoading, setIsLoading] = useState(false);

  const showModal = (obj) => {}

  const handleNextSlide = (num) => {}

  const getNextDate = (date) => {
    const nextDate = new Date(date);
    nextDate.setDate(nextDate.getDate() + 1);
    return nextDate;
  }

  const fetchData = async () => {
    let cameraData = {}
    const env = await import.meta.env;

      // this.setState({ isLoading: true, isLoaded: false });
    await getRoverData.get(`${name.toLowerCase()}/photos`, {
      params: {
        ...(selected.dateType == "earth" ? { earth_date: `${earthDate.getFullYear()}-${earthDate.getMonth()+1}-${earthDate.getDate()}` } : {}),
        ...(selected.dateType == 'sol' ? { sol: selected.solNumber } : {}),
        ...(selected.camera != 'ALL' ? { camera: selected.camera.toLowerCase() } : {}),
        api_key: env.VITE_NASA_API_KEY
      },
    }).then(({ data: { photos }}) => {
      photos.forEach(photo => {
        (cameraData[photo.camera.name]) ? cameraData[photo.camera.name].push(photo.img_src) : cameraData[photo.camera.name] = [photo.img_src];
      });

      console.log(cameraData);
    }).then(() => {
      setSelected({ ...selected, cameraData: cameraData,
        // cameraType: (Object.keys(cameraData).length > 0) ? Object.keys(cameraData)[0] : '',
        // // selectedDateType: 'earth',
        // // selectedEarthDate: new Date(this.props.rover.max_date.replace(/-/g, '\/')),
        // // selectedSolNumber: this.props.rover.max_sol,
        // // selectedCamera: 'ALL',
        // isLoading: false, 
        isLoaded: true 
      });
    }).catch(error => {
      console.log(error);
    });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchData();
  }

  return (
    <div className="rover">
      <div className="left-box">
        <a data-toggle="modal" data-target='#modal' onClick={() => showModal({'isImage': true, 'modalUrl': `${ name.toLowerCase() }_large.jpg`, 'modalAuthor': 'NASA' })}>
          <img src={roverImages[name]} alt={ name } />
        </a>

        <div className="info-box">
          <p>Rover: <a href={`https://en.wikipedia.org/wiki/${ name }_(rover)`} target="_blank" rel="noopener noreferrer">{ name }</a></p>
          <p>Launched: { getFormalDateString(launch_date) }</p>
          <p>Landed: { getFormalDateString(landing_date) }</p>
          <p>Latest: { getFormalDateString(max_date) }</p>
          <p>Status: <span className={`${status === 'active' ? 'active' : 'complete'}`}> { capitalizeEveryFirstLetter(status) }</span></p>
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
              {cameras.map((camera, index) => <tr key={index}><td>{camera.name}</td><td>{camera.full_name}</td></tr>)}
            </tbody>
          </table>
        }
      </div>

      <div className="right-box">
        <h2 className="right-box-title">Search photos by Earth date/Sol number and camera type:</h2>

        <div className="search-dates">
          <div className="earth-date" onClick={() => setSelected({ ...selected, "dateType": "earth" })}>  
            <div className="earth-date-radio-box">
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
            
            <div className="earth-date-selector-box">
              <DatePicker selected={earthDate} maxDate={getNextDate(max_date)} minDate={getNextDate(landing_date)} onChange={(date) => setEarthDate(date)} />
              <p>Date range:</p>
              <p>{reformatDateString(landing_date)} to {reformatDateString(max_date)}</p>
            </div>
          </div>

          <div className="sol-number" onClick={() => setSelected({ ...selected, "dateType": "sol" })}>         
            <div className="sol-number-radio-box">
              <input 
                id="sol" 
                type="radio" 
                name="date-type-selector" 
                value="sol" 
                max={max_sol}
                onChange={(event) => setSelected({ ...selected, "dateType": event.target.value })} 
                checked={(selected.dateType == 'sol')}
              /> 
              <label htmlFor="sol"><p>By Sol</p></label>
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
              <p className="rover-search-sol-text">Sol range: </p>
              <p className="rover-search-sol-text">Day 1 to Day { max_sol }</p>
            </div> 
          </div>
        </div>

        <div className="search-cameras">
          <div className="search-cameras-box">
            <h3>By Camera:</h3>
            
            <div className="search-camera">
              <input 
                id='ALL' 
                type="radio" 
                name="camera_selector" 
                value='ALL' 
                onChange={(event) => setSelected({ ...selected, camera: event.target.value })} 
                checked={selected.camera == 'ALL'} 
              />
              <label htmlFor='ALL'>ALL (all available rover photos)</label>
            </div>

            {cameras.map((camera, index) => {
              return (
                <div key={index} className="search-camera">
                  <input 
                    id={camera.name} 
                    type="radio" 
                    name="camera_selector" 
                    value={camera.name} 
                    onChange={(event) => setSelected({ ...selected, camera: event.target.value })} 
                    checked={selected.camera == camera.name} 
                  />
                  <label htmlFor={camera.name}>{camera.name} ({camera.full_name})</label>
                </div>
              );
            })}
          </div>
        </div>

        <div className="search-submit">
          <button type="submit" onClick={handleSubmit}>Search</button>
        </div>       


        {/* {isLoading && <Spinner /> } */}

        {(Object.keys(selected.cameraData).length > 0) &&
          <div className="container main-container rover-container">
            <div className="row">
              <div className="col-md-12">
                <div className="results-header-tab-selector rover-tabs-box">
                  {Object.keys(selected.cameraData).map((name, index) => {
                    return (
                      <button 
                        key={ index } 
                        className={ `results-header-tab ${index == 0 ? 'front' : ''}${selected.cameraType == name ? ' active' : ''}${(index == Object.keys(selected.cameraData).length - 1) ? ' back' : ''}` } 
                        onClick={(event) => setSelected({ cameraType: event.target.value, slideIndex: 0 })} 
                        value={ name }>{ name }
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* {(selected.cameraData[selected.cameraType] && (selected.cameraData[selected.cameraType].length > 0)) &&
              <div className="slideshow-container">
                <div className="slides fade-in" value={ selected.slideIndex }>
                  <div className="slides-wrapper">
                    <div className="slide-counter">{ selected.slideIndex + 1 } / { selected.cameraData[selected.cameraType].length }</div>
                    <a data-toggle="modal" data-target='#modal' onClick={() => showModal({'isImage': true, 'modalUrl': selected.cameraData[selected.cameraType][selected.slideIndex], 'modalAuthor': capitalizeEveryFirstLetter(name) })}>
                      <img src={ selected.cameraData[selected.cameraType][selected.slideIndex] } alt={`${ name } - ${ selected.cameraType } - ${ selected.slideIndex + 1 }`} />
                    </a>
                    <span className="prev" onClick={() => handleNextSlide(-1)}>&#10094;</span>
                    <span className="next" onClick={() => handleNextSlide(1)}>&#10095;</span> 
                  </div>
                  <div className="slide-description">{`${ name } - ${ selected.cameraType } - ${ selected.slideIndex + 1 }`}</div>
                </div>
              </div>
            } */}
          </div>
        }
        {(Object.keys(selected.cameraData).length === 0 && selected.isLoaded)  &&
          <div className="container main-container rover-container">
            <div className="row">
              <div className="col-md-12">
                No results found.
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  )
}

Rover.propTypes = {
  rover: PropTypes.object,
};