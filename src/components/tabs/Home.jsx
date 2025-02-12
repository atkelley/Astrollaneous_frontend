import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { NASA_DAILY_PHOTO_BACKUP_DATA } from '../common/Constants';
import { getDailyPhotoData } from '../../api/nasa.api';
import { getFormalDateString } from '../common/Utilities';
import Loader from '../common/Loader';

export default function Home({ sendModalData }) {
  const [dailyData, setDailyData] = useState(NASA_DAILY_PHOTO_BACKUP_DATA);
  const { media_type, date, title, copyright, explanation, url, hdUrl, isLoaded } = dailyData;

  useEffect(() => {
    async function getDailyPhoto() {
      await getDailyPhotoData().then(response => {
        let { media_type, title, date, copyright, explanation, hdurl, url } = response.data;

        setDailyData({
          date: getFormalDateString(date),
          title, 
          media_type,
          copyright: copyright ? copyright : 'NASA © 2025',
          explanation: explanation.split(/Gallery:|Explore Your Universe:|Jigsaw Challenge:/)[0],
          hdUrl: (media_type == 'image') ? hdurl : url,
          url: (media_type == 'image') ? url : url,
          isLoaded: true,
        });
      }).catch(error => {
        console.log(error);
      });
    }
  
    getDailyPhoto();
  }, []);

  return (
    <main className="home">
      {isLoaded ?
        <section>
          <h1>Astronomy Picture of the Day:</h1>
          <hr />    

          <div className="content-box">
            {media_type === 'image' ? 
              <a onClick={() => sendModalData({ imgSrc: hdUrl, imgAlt: title, imgCaption: copyright })}>
                <img src={url} alt={title} />
              </a> 
              : 
              <div className="iframe-box">
                <iframe src={url} alt={title} />
              </div>
            }

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

Home.propTypes = {
  sendModalData: PropTypes.func,
};