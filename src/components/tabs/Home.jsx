import { useState, useEffect } from 'react';
import { NASA_DAILY_PHOTO_BACKUP_DATA } from '../common/Constants';
import { getDailyPhoto } from '../../api/nasa.api';
import { getFormalDateString } from '../common/Utilities';
import { useModal } from '../../contexts/ModalContext';
import Loader from '../common/Loader';

export default function Home() {
  const [dailyData, setDailyData] = useState(NASA_DAILY_PHOTO_BACKUP_DATA);
  const { media_type, date, title, copyright, explanation, url, hdUrl, isLoaded } = dailyData;
  const { openModal, closeModal } = useModal();

  useEffect(() => {
    async function fetchData() {
      await getDailyPhoto().then(response => {
        let { media_type, title, date, copyright, explanation, hdurl, url } = response.data;

        setDailyData({
          date: getFormalDateString(date),
          title, 
          media_type,
          copyright: copyright ? `${copyright} © 2025` : 'NASA © 2025',
          explanation: explanation.split(/\w+\s(Hemisphere Alert :|Gallery:|Universe:|Challenge:|Surprise:|Coverage:)/)[0],
          hdUrl: (media_type == 'image') ? hdurl : url,
          url: (media_type == 'image') ? url : url,
          isLoaded: true,
        });
      }).catch(error => {
        console.log(error);
      });
    }
  
    fetchData();
  }, []);

    const getImageComponent = () => {
      return (
        <div className="image-box">
          <img src={hdUrl} alt={title} />
  
          <div className="text-box">
            <p>{copyright}</p>
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      );
    }
  
    const getVideoComponent = () => {
      return (
        <video id="video" width="840" height="auto" controls autoPlay>
          <source src={hdUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video> 
      );
    }

  const handleClick = () => {
    if (media_type === "image") {
      openModal(getImageComponent());
    }

    if (media_type === "video") {
      openModal(getVideoComponent());
    }
  }

  return (
    <main className="home">
      {isLoaded ?
        <section>
          <h1>Astronomy Picture of the Day:</h1>
          <hr />    

          <div className="content-box">
            <a onClick={handleClick}>
              {media_type === 'image' ? 
                <img src={url} alt={title} />
                :
                <div className="iframe-box">
                  <iframe src={url} alt={title} />
                </div>
              }
            </a> 
            <div className="text-box">
              <h6>{date}</h6>
              <h3>{title}</h3>
              <p>{explanation}</p>
            </div>
          </div>  
        </section>          
      :
        <Loader />
      }
    </main>
  );
}