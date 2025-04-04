import { useModal } from "../../contexts/ModalContext";
import Image from "../iterables/Image";
import {
  thumb_heic,
  large_heic,
  thumb_sunshield,
  large_sunshield,
  thumb_space,
  large_space
} from "../../assets/img/index"

import Space from "../../assets/img/space.jpg";

export default function About() {
  const { openModal } = useModal();

  return (
    <main className="about">
      <section>
        <h4>All Things Space-Related</h4>
        <hr />
        <div className="about-content-box">
          <div className="about-text-box text-box-right">
            <p>
              This website is an aggregate of various resources that the modern, amateur astronomist
              would utilize in pursuing their interest in all things space-related. The &quot;Mars&quot; page compiles photos for the
              the three most widely-known rovers (Curiosity, Opportunity & Spirit), in addition to tracking current weather patterns
              on the famous Red planet. The &quot;NEOs&quot; page can show the user current where-abouts and trajectories
              of various &quot;Near Earth Objects&quot; (comets, meteorites, etc.), and classify which are potential dangers to Earth and estimate
              their times of impact. The &quot;Satellites&quot; page is a comprehensive tool for identifying the myriad, man-made devices orbiting our planet
              and describes what they do and who they belong to. &quot;Space Weather&quot; forecasts what to expect, in terms of space-related weather
              (solar wind, flares, etc.) and how that can effect the performance of our aforementioned, man-made objects. The &quot;NASA&quot; page is
              comprehensive searching tool of NASA&apos;s images and video archives and &quot;Techport&quot; is a page dedicated to highlighting some of NASA&apos;s
              most interesting, current technologies being developed.
            </p>
            <p className="about-article-link">
              Read the latest article from the <a href="https://www.spacetelescope.org/news/heic2021/" target="_blank" rel="noopener noreferrer">Hubble Space Telescope site</a>.
            </p>
          </div>

          <div className="about-image-box">
            <figure>
              <a onClick={() => openModal(<Image data={{ src: large_heic, alt: `Hubble Identifies Strange Exoplanet That Behaves Like the Long-Sought "Planet Nine"`, caption: `NASA @ 2025`}} />)}>
                <img src={thumb_heic} alt={`Hubble Identifies Strange Exoplanet That Behaves Like the Long-Sought "Planet Nine"`} />
              </a>
              <figcaption>Hubble Identifies Strange Exoplanet That Behaves Like the Long-Sought &quot;Planet Nine&quot;</figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section>
        <h4>Django, React & Bootstrap</h4>
        <hr />
        <div className="about-content-box">
          <div className="about-image-box">
            <figure>
              <a onClick={() => openModal(<Image data={{ src: large_sunshield, alt: "NASA's Webb Sunshield Successfully Unfolds and Tensions in Final Tests", caption: `NASA @ 2025`}} />)}>
                <img src={thumb_sunshield} alt="NASA's Webb Sunshield Successfully Unfolds and Tensions in Final Tests" />
              </a>
              <figcaption>NASA&apos;s Webb Sunshield Successfully Unfolds and Tensions in Final Tests</figcaption>
            </figure>
          </div>

          <div className="about-text-box text-box-left">
            <p>
              This website (version 2.0.1) was created with Python (version 3.8.0), Django (version 3.0.1), Bootstrap4, HTML5 and CSS3.
              It consumes from various NASA and Hubble telescope APIs, using Python&apos;s requests library. This website was conceived as a project to learn more about Django
              Full Stack Development, and pursue a life-long goal of learning more about astronomy. Originally, it was a blog project from an online course,
              designed to demonstrate the basic MVT structure of Django. That component is now used to log the progress of this website&apos;s continous development,
              as well as, journal various points of interest related to astronomy. It is a long-term goal to refine this website&apos;s content
              further and enhance its functionality to attract paid memberships and ad placements (via Google Adsense, affiliate marketing, etc.).
            </p>

            <p className="about-article-link">
              Read the latest article from the <a href="http://www.nasa.gov/feature/goddard/2020/webb-sunshield-successfully-unfolds-and-tensions-in-final-tests" target="_blank" rel="noopener noreferrer">NASA Goodard site</a>.
            </p>
          </div>
        </div>
      </section>
  
      <section>
        <h4>Who We Are</h4>
        <hr />
        <div className="about-content-box">
          <div className="about-text-box text-box-right">
            <p>
              We are a group of space-enthusiasts who met through a Web Development Full Stack Bootcamp in Boston. This bootcamp focused on the basics (HTML, CSS, Javascript)
              and introduced us to many different Javascript libraries, like Node.js (a runtime environment), Mustache.js (a templating library) and React.js (a front-end framework). Additionally,
              we were exposed to both MySQL and Mongo/Mongoose database management systems, JSON, AJAX, Bootstrap, Heroku and APIs. Future plans include experimenting with putting Angular and Java into
              this architecture, as well as incorporating cloud development (most likely through AWS) when launching this website to its permanent online location. For questions or additional
              information, feel free to reach out to us through our contact form in the header of this website.
            </p>
            <p className="about-article-link">
              Read the latest article from the <a href="https://spacetelescopelive.org/2020-12-24T16:02:17+00:00" target="_blank" rel="noopener noreferrer">Space Telescope Live site</a>.
            </p>
          </div>

          <div className="about-image-box">
            <figure>
              <a onClick={() => openModal(<Image data={{ src: large_space, alt: "COS/FUV Gain Map and Aperture Placement at LP6", caption: `NASA @ 2025`}} />)}>
                <img src={thumb_space} alt="COS/FUV Gain Map and Aperture Placement at LP6" />
              </a>
              <figcaption>COS/FUV Gain Map and Aperture Placement at LP6</figcaption>
            </figure>
          </div>
        </div>
      </section>
    </main>
  );
}