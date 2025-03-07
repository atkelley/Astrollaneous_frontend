import { useState } from "react";
import PropTypes from "prop-types";
import { capitalizeEveryFirstLetter, getFormalDateString } from "../common/Utilities";
import { getNasaData } from '../../api/nasa.api';
import Video from "../iterables/Video";
import Image from "../iterables/Image";
import Audio from "../iterables/Audio";
import Loader from '../common/Loader';
import search from "../../assets/img/search.png";

export default function Nasa({ sendModalData }) {
  const [state, setState] = useState({
    searchTerm: "",
    selectedCollectionType: "",
    selectedCollection: [],
    convertedResults: {},
    slideIndex: 0,
    isLoaded: false,
    isLoading: false,
    checkboxes: {
      "image": {checked: true },
      "video": {checked: true },
      "audio": {checked: true },
    }
  });

  const fetchData = async () => {
    let convertedResults = {};
    let searchTerm = state.searchTerm;

    if (searchTerm && (state.checkboxes['image'].checked || state.checkboxes['video'].checked || state.checkboxes['audio'].checked)) {
      setState({ ...state, isLoading: true, isLoaded: false });

      await getNasaData.get('/search', { params: { q: searchTerm } } ).then(({ data }) => {
        data.collection.items.forEach(item => {
          let searchObject = {
            'title': item.data[0].title,
            'nasa_id': item['data'][0]['nasa_id'],
            'create_date': getFormalDateString(item.data[0].date_created),
            'description': (item.data[0].description || item.data[0].title),
            'json_url': item['href']
          }
  
          if (item.data[0].media_type == 'image') {
            searchObject.preview_image = item['links'][0]['href'];
            searchObject.author = item['data'][0]['photographer'];
          }
  
          if (item.data[0].media_type == 'video') {
            searchObject.preview_image = item['links'][0]['href'].replaceAll(' ', '%20');
          }
  
          if (state.checkboxes[item.data[0].media_type].checked){
            (convertedResults[item.data[0].media_type]) ? convertedResults[item.data[0].media_type].push(searchObject) : convertedResults[item.data[0].media_type] = [searchObject];
          }
        });

        setState({ 
          slideIndex: 0,
          selectedCollectionType: Object.keys(convertedResults)[0],
          convertedResults, 
          isLoading: false, 
          isLoaded: true, 
          searchTerm,
          checkboxes: {
            'image': { checked: true },
            'video': { checked: true },
            'audio': { checked: true },
          }
        });
      }).catch(error => {
        console.log(error);
      });
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchData();
  }
  
  const onChangeCheckbox = (event) => {
    let checkboxes = state.checkboxes;
    checkboxes[event.target.value].checked = !checkboxes[event.target.value].checked;
    setState({ ...state, checkboxes });
  }

  const handleNextSlide = (delta) => {
    let newIndex = state.slideIndex + delta;

    if (newIndex < 0) {
      setState({ ...state, slideIndex: state.convertedResults[state.selectedCollectionType].length - 1 });
    } else if (newIndex > state.convertedResults[state.selectedCollectionType].length - 1) {
      setState({ ...state, slideIndex: 0 });
    } else {
      setState({ ...state, slideIndex: newIndex });
    }
  }

  const getHeaderTitle = () => {
    return `${state.convertedResults[state.selectedCollectionType].length} ${state.selectedCollectionType} result${(state.convertedResults[state.selectedCollectionType].length == 1) ? '' : 's'} for "${state.searchTerm}":`;
  }  

  // console.log(state.slideIndex, state.selectedCollectionType, state.convertedResults[state.selectedCollectionType][state.slideIndex])

  return (
    <main className="nasa">
      {state.isLoading 
        ? 
          <Loader /> 
        :
          <section>
            <form onSubmit={(event) => handleSubmit(event)}>
              <div className="input-container">
                <input 
                  type="text"
                  name="input-field" 
                  className="input-field" 
                  placeholder={`Search for...(e.g. "Orion")`} 
                  value={state.searchTerm} 
                  onChange={(event) => setState({ ...state, searchTerm: event.target.value})}   
                />
                <button type="submit" className="input-button"><img src={search} alt="magnifying glass icon"></img></button><br />
              </div>

              <div className="checkbox-container">
                {Object.keys(state.checkboxes).map((checkbox, index) => {
                  return (
                    <label key={index}>
                      <input 
                        type="checkbox" 
                        name="checkbox" 
                        value={checkbox} 
                        onChange={(event) => onChangeCheckbox(event)} 
                        checked={state.checkboxes[checkbox].checked}
                      />{capitalizeEveryFirstLetter(checkbox)}
                    </label>
                  )
                })}
              </div>
            </form>

            {(state.isLoaded && Object.keys(state.convertedResults).length > 0) &&
              <div className="results-box">
                <div className="results-header">
                  <h3>{getHeaderTitle()}</h3>
                  <div className="results-header-tabs">
                    {Object.keys(state.convertedResults).map((name, index) => {
                      return (
                        <button 
                          key={ index } 
                          className={`results-header-tab ${index == 0 ? 'front' : ''}${state.selectedCollectionType == name ? ' active' : ''}${(index == Object.keys(state.convertedResults).length - 1) ? ' back' : ''}` } 
                          onClick={(event) => setState({ ...state, selectedCollectionType: event.target.value, slideIndex: 0 })} 
                          value={name}>{capitalizeEveryFirstLetter(name)}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <hr />
                  
                <div className="results-content-box">
                  {state.selectedCollectionType == 'image' &&
                    <div className="slideshow-container">
                      <Image 
                        index={state.slideIndex} 
                        image={state.convertedResults[state.selectedCollectionType][state.slideIndex]} 
                        total={state.convertedResults[state.selectedCollectionType].length} 
                        sendModalData={(data) => sendModalData(data)} 
                        handleNextSlide={handleNextSlide}
                      />
                    </div>
                  }

                  {state.selectedCollectionType == 'video' &&
                    state.convertedResults[state.selectedCollectionType].map((item, index) => {
                      return <Video key={index} video={item} sendModalData={sendModalData} />
                    })
                  }

                  {state.selectedCollectionType == 'audio' &&
                    state.convertedResults[state.selectedCollectionType].map((item, index) => {
                      return <Audio key={index} audio={item} />
                    })
                  }
                </div>
              </div>
            }

            {(state.isLoaded && Object.keys(state.convertedResults).length === 0) &&
              <div className="no-results-box">No results found.</div>
            }
          </section>
      }
    </main>
  );
}

Nasa.propTypes = {
  sendModalData: PropTypes.func
};