import { backup_image, backup_image_large } from "../../assets/img/index";
import { curiosity, perseverance, opportunity, spirit } from "../../assets/mp4/index";
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

export const roverVideos = { 
  "Curiosity": curiosity, 
  "Perseverance": perseverance, 
  "Opportunity": opportunity, 
  "Spirit": spirit 
};

export const parameters = {
    min_temp: { title: "Wind Temp. (min.)", symbol: "*" },
    max_temp: { title: "Wind Temp. (max.)", symbol: "*" },
    min_gts_temp: { title: "Ground Temp. (min.)", symbol: "**" },
    max_gts_temp: { title: "Ground Temp. (max.)", symbol: "**" },
    pressure: { title: "Pressure", symbol: "†" },
    wind_speed: { title: "Wind Speed", symbol: "‡" },
    wind_direction: { title: "Wind Direction", symbol: null },
    abs_humidity: { title: "Relative Humidity", symbol: "§" },
    atmo_opacity: { title: "Atmos. Opacity", symbol: "¶" },
    local_uv_irradiance_index: { title: "UV Index", symbol: "#" },
    sunrise: { title: "Sunrise", symbol: null },
    sunset: { title: "Sunset", symbol: null },
  };

  export const footnotes = [
    `* Mars is colder than our planet. Moreover, Mars' atmosphere does not retain the heat. Hence, the difference between day and night temperatures 
    is more pronounced than our planet.`,
    `** Because of Mars' thin atmosphere, heat from the Sun can easily escape and cause big differences between Mars' ground and air temperatures. 
    Imagine if you were on the Martian equator at noon, it would feel like summer at your feet, but winter at your head.`,
    `† Pressure is a measure of the total mass in a column of air above us. Because Mars' atmosphere is extremely tenuous, pressure on Mars' surface 
    is about 160 times less than Earth's. The average pressure on the Martian surface is about 700 Pascals (Earth's average is 100,000 Pascals). 
    Curiosity is in the Gale crater, which is about 5 kilometers (3 miles) deep. For this reason, the pressure measured is usually higher than average.`,
    `‡ NASA's Viking landers and Pathfinder rover showed that the average wind speeds at their locations were pretty weak (about 1-4 m/s, 4-15 km/h or 2.5-9 mph). 
    However, during a dust storm, the winds can get quite strong (30 m/s, 110 km/h, 68 mph or more).`,
    `§ Mars' atmosphere contains water vapor and REMS records its relative humidity, which is a measurement of the amount of water vapor in the air compared 
    with the amount of water vapor the air can hold at its measured temperature. Water is also present on Mars as water ice, at Mars' poles. However, 
    proof of liquid water in present-day Mars remains elusive.`,
    `¶ Weather on Mars is more extreme than Earth's. Mars is cooler and with bigger differences between day and night temperatures. Also, dust storms are more common. 
    However, Mars (like Earth) also has polar ice caps and seasonal changes. Therefore, like Earth, Mars can have sunny, cloudy or windy days, which effect its 
    atmospheric opacity.`,
    `# The ultraviolet (UV) irradiance index indicates the intensity of the ultraviolet radiation from the Sun at Curiosity's location. 
    UV radiation is a damaging agent for life. On Earth, ozone layer prevents damaging UV light from reaching the surface. However, since Mars
    lacks any ozone in the atmosphere, UV radiation can reach the Martian surface.`
  ];