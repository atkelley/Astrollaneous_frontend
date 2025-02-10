import { useState, useEffect } from 'react';
import { NASA_DAILY_PHOTO_BACKUP } from '../common/Constants';
import { getDailyPhotoData } from '../../api/nasa.api';
import { getFormalDateString } from '../common/Utilities';
import Loader from '../common/Loader';

export default function Home() {
  const [data, setData] = useState(NASA_DAILY_PHOTO_BACKUP);
  const { media_type, date, title, copyright, explanation, url, hdUrl, isLoaded, showModal } = data;

  useEffect(() => {
    async function getDailyPhoto() {
      await getDailyPhotoData().then(response => {
        let { media_type, title, date, copyright, explanation, hdurl, url } = response.data;
        setData({
          date: getFormalDateString(date),
          title, 
          media_type,
          copyright: copyright ? copyright : data.copyright,
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



    // getPicOfTheDay = async () => {
    //   try {
    //     // let thumbnailUrl = '../images/default-space-thumbnail.jpg';
    //     const { data } = await getDailyPhotoData.get();
    //     let isImage = (data.media_type == 'image') ? true : false;
  
    //     // if (!isImage) {
    //     //   if (data.url.includes('youtube')) {
    //     //     let youtubeIdString = data.url.substring(30, data.url.length - 6);
    //     //     thumbnailUrl = `https://img.youtube.com/vi/${youtubeIdString.split('?')[0]}/2.jpg`;
    //     //   }
    //     // }
  
    //     this.setState({
    //       isImage,
    //       isLoaded: true,
    //       title: data.title,
    //       description: data.explanation.split('Gallery:')[0],
    //       author: ((data.copyright) ? capitalizeEveryFirstLetter(data.copyright) : 'NASA'),
    //       hdUrl: (data.media_type == 'image') ? data.hdurl : data.url,
    //       url: (data.media_type == 'image') ? data.url : data.url,
    //     });
    //   } 

  }, [data]);

  return (
    <main className="home">
      {isLoaded ?
        <section>
          <h1>Astronomy Picture of the Day:</h1>
          <hr />    

          <div className="content-box">
            <a data-toggle="modal" data-target='#modal' onClick={() => showModal({ 'media_type': media_type, 'modalUrl': hdUrl })}>
              {(media_type === 'image') ? <img src={url} alt={title} /> : <iframe src={url} alt={title} />}
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