import { useEffect, useState } from "react";
import { getSatellites } from "../../services/satellite.service";
import Collapsible from "../common/Collapsible";
import Loader from '../common/Loader';

import * as Cesium from 'cesium';

// window.CESIUM_BASE_URL = '/';

export default function Satellites() {
  const [isCesiumLoaded, setCesiumIsLoaded] = useState(true);
  const [satelliteData, setSatelliteData] = useState({});
  const [selectedSatellite, setSelectedSatellite] = useState('noaa');

  useEffect(() => {
    // const viewer = new Cesium.Viewer("cesiumContainer", { shouldAnimate: true, });
    

      // Cesium.Ion.defaultAccessToken = import.meta.env.VITE_CESIUM_TOKEN;
 
      // var viewer = new Cesium.Viewer("cesiumContainer", { shouldAnimate: true, });
      // viewer.entities.removeAll();
      // viewer.dataSources.add( Cesium.CzmlDataSource.load(`/static/mySpaceStuff/tle2czml/tle_${name}.czml`) );
      // let collapseTop = document.getElementById('collapseTop');
      // collapseTop.classList.remove("show");

      // Example: Add a simple satellite entity (replace with actual data and logic)
      // viewer.entities.add({
      //   position: Cesium.Cartesian3.fromDegrees(-75.5978, 40.0389, 200000),
      //   model: {
      //     uri: 'path/to/satellite.glb', // Replace with your satellite model
      //     scale: 1000,
      //   },
      // });

    // return () => viewer.destroy();
  }, []);


  useEffect(() => {
    async function fetchData() {
      await getSatellites().then(response => {
        const ordered = Object.keys(response.data).sort((a, b) => b.localeCompare(a)).reduce(
          (obj, key) => { 
            obj[key] = response.data[key]; 
            return obj;
          }, 
          {}
        );

        setSatelliteData(ordered);
        setSelectedSatellite(response.data['Weather & Earth'].filter(satellite => satellite.name === 'noaa')[0]);
      }).catch(error => {
        console.log(error);
      });
    }
  
    fetchData();
  }, []);

  // console.log(satelliteData)

  // const fetchSatelliteData = async (name) => {
  //   await getSatellite(name)
  //   .then(response => {
  //     if (response.status == 200) {
  //       this.setState({ isLoaded: true, isLoading: false, satellite: response.data });
 
  //       var viewer = new Cesium.Viewer("cesiumContainer", { shouldAnimate: true, });
  //       viewer.entities.removeAll();
  //       viewer.dataSources.add( Cesium.CzmlDataSource.load(`/static/mySpaceStuff/tle2czml/tle_${name}.czml`) );
  //       let collapseTop = document.getElementById('collapseTop');
  //       collapseTop.classList.remove("show");
  //     }
  //   })
  //   .catch(error => {
  //     console.log(error);
  //   });
  // }

  const handleChange = (value, type) => {
    setSelectedSatellite(satelliteData[type].filter(satellite => satellite.name === value)[0]);
  }

  return (
    <main className="satellites">
      {isCesiumLoaded ?
        <section>
          <div className="text-box">
            <Collapsible title={selectedSatellite.title}>
              <p>{selectedSatellite.text}</p>
            </Collapsible>
          </div>

          <div className="content-box">
            <div className="cesium-box">
              {/* <div id="cesiumContainer" className="fullSize"></div>
              <div id="loadingOverlay"><h1>Loading...</h1></div>
              <div id="toolbar"></div> */}
            </div>

            <div className="accordion-box">
              {Object.keys(satelliteData).map((type, index) => {
                return (
                  <Collapsible key={index} title={type}>
                    {satelliteData[type].map(({id, name, acronym}) => {
                      return (
                        <p key={id} onClick={() => handleChange(name, type)}>
                          <input type="radio" id={name} name="satellites" value={name} checked={selectedSatellite.name === name} onChange={(event) => handleChange(event.target.value, type)} />
                          <label htmlFor="satellites">{acronym}</label>
                        </p>
                      );
                    })}
                  </Collapsible>
                );
              })}
            </div>
          </div>
        </section>          
      :
        <Loader />
      }
    </main>
  );
}