import backup_image from '../../assets/img/backup_image.jpg';
import backup_image_large from '../../assets/img/backup_image_large.jpg';

import { getFormalDateString } from './Utilities';

export const NASA_DAILY_PHOTO_BACKUP_DATA = {
  date: getFormalDateString(),
  media_type: 'image',
  title: 'Chandra Spots a Mega-Cluster of Galaxies in the Making',
  copyright: 'X-ray: NASA/CXC/SAO/G.Schellenberger et al.; Optical:SDSS',
  explanation: `Astronomers using data from NASA's Chandra X-ray Observatory and other 
  telescopes have put together a detailed map of a rare collision between four galaxy 
  clusters. Eventually all four clusters — each with a mass of at least several hundred 
  trillion times that of the Sun — will merge to form one of the most massive objects 
  in the universe. Galaxy clusters are the largest structures in the cosmos that are held 
  together by gravity. Clusters consist of hundreds or even thousands of galaxies embedded 
  in hot gas, and contain an even larger amount of invisible dark matter. Sometimes two galaxy 
  clusters collide, as in the case of the Bullet Cluster, and occasionally more than two will 
  collide at the same time. The new observations show a mega-structure being assembled in a 
  system called Abell 1758, located about 3 billion light-years from Earth. It contains two 
  pairs of colliding galaxy clusters that are heading toward one another. Scientists first 
  recognized Abell 1758 as a quadruple galaxy cluster system in 2004 using data from Chandra 
  and XMM-Newton, a satellite operated by the European Space Agency (ESA). Each pair in the 
  system contains two galaxy clusters that are well on their way to merging. In the northern 
  (top) pair seen in the composite image, the centers of each cluster have already passed by 
  each other once, about 300 to 400 million years ago, and will eventually swing back around. 
  The southern pair at the bottom of the image has two clusters that are close to approaching 
  each other for the first time.`,
  hdUrl: backup_image_large,
  url: backup_image,
  isLoaded: false,
};

import curiosity from "../../assets/mp4/curiosity-3d.mp4";
import opportunity from "../../assets/mp4/opportunity-3d.mp4";
import spirit from "../../assets/mp4/spirit-3d.mp4";
import perseverance from "../../assets/mp4/perseverance-3d.mp4";

export const roverVideos = { 
  "Curiosity": curiosity, 
  "Perseverance": perseverance, 
  "Opportunity": opportunity, 
  "Spirit": spirit 
};