import { useRef, useEffect, useState, useCallback } from "react";
import { getSatellite, getSatellites } from "../../services/satellite.service";
import Collapsible from "../common/Collapsible";

import * as Cesium from 'cesium';
import "cesium/Build/Cesium/Widgets/widgets.css";

export default function Satellites() {
  const viewerRef = useRef(null);
  const cesiumContainerRef = useRef(null);
  const [areSatellitesLoaded, setAreSatellitesLoaded] = useState(false);
  const [satellites, setSatellites] = useState(null);
  const [selectedSatellite, setSelectedSatellite] = useState(null);
    
  const fetchSatellites = useCallback(async () => {
    await getSatellites().then(({ data }) => {
      setSatellites(data); 
      setSelectedSatellite({...data['Weather & Earth'].filter(satellite => satellite.name === 'noaa')[0], type: 'Weather & Earth'});
    }).then(() => {
      setAreSatellitesLoaded(true);
    }).catch(error => {
      console.log(error);
    });
  }, []);

  const handleSatelliteSelection = (value, type) => {
    setSelectedSatellite({...satellites[type].filter(satellite => satellite.name === value)[0], type: type});
    setSatelliteInCesiumContainer(value);
  };

  const setSatelliteInCesiumContainer = async (value) => {
    await getSatellite(value, {responseType: 'blob',}).then((response) => {
      viewerRef.current.entities.removeAll();
      viewerRef.current.dataSources.removeAll();
      viewerRef.current.dataSources.add(Cesium.CzmlDataSource.load(response.data));
    }).catch(error => {
      console.log(error);
    });
  }

  useEffect(() => {
    Cesium.Ion.defaultAccessToken = import.meta.env.VITE_CESIUM_TOKEN;
    viewerRef.current = new Cesium.Viewer("cesiumContainer", { shouldAnimate: true, });
    setSatelliteInCesiumContainer('noaa');
    fetchSatellites();

    return () => {
      viewerRef.current.entities.removeAll();
      viewerRef.current.dataSources.removeAll();
      viewerRef.current.destroy();
    };
  }, [fetchSatellites]);

  return (
    <main className="satellites">
      <section>
        {areSatellitesLoaded && 
          <div className="text-box">
          <Collapsible title={selectedSatellite.title} type={null} selectedType={selectedSatellite.type}>
            <p>{selectedSatellite.text}</p>
          </Collapsible>
        </div>
        }
    
        <div className="content-box">
          <div className="cesium-box">
            <div ref={cesiumContainerRef} id="cesiumContainer"></div>
          </div>

          {areSatellitesLoaded &&
            <div className="accordion-box">
              {Object.keys(satellites).map((type, index) => {
                return (
                  <Collapsible key={index} title={null} type={type} selectedType={selectedSatellite.type}>
                    {satellites[type].map(({id, name, acronym}) => {
                      return (
                        <p key={id} onClick={() => handleSatelliteSelection(name, type)}>
                          <input type="radio" id={name} name="satellites" value={name} checked={selectedSatellite.name === name} onChange={(event) => handleSatelliteSelection(event.target.value, type)} />
                          <label htmlFor="satellites">{acronym}</label>
                        </p>
                      );
                    })}
                  </Collapsible>
                );
              })}
            </div>
          }
        </div>
      </section>          
    </main>
  );
}