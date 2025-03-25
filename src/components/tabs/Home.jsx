import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { NASA_DAILY_PHOTO_BACKUP_DATA } from '../common/Constants';
import { getDailyPhoto } from '../../api/nasa.api';
import { getFormalDateString } from '../common/Utilities';
import Loader from '../common/Loader';

export default function Home({ sendModalData }) {
  const [dailyData, setDailyData] = useState(NASA_DAILY_PHOTO_BACKUP_DATA);
  const { media_type, date, title, copyright, explanation, url, hdUrl, isLoaded } = dailyData;

  useEffect(() => {
    async function fetchData() {
      await getDailyPhoto().then(response => {
        let { media_type, title, date, copyright, explanation, hdurl, url } = response.data;

        setDailyData({
          date: getFormalDateString(date),
          title, 
          media_type,
          copyright: copyright ? `${copyright} © 2025` : 'NASA © 2025',
          explanation: explanation.split(/\w+\s(Gallery:|Universe:|Challenge:|Surprise:|Coverage:)/)[0],
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

  return (
    <main className="home">
      {isLoaded ?
        <section>
          <h1>Astronomy Picture of the Day:</h1>
          <hr />    

          <div className="content-box">
            <a onClick={() => sendModalData({ type: media_type, src: hdUrl, alt: title, caption: copyright })}>
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

Home.propTypes = {
  sendModalData: PropTypes.func,
};