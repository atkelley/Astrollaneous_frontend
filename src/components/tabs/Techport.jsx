import { useState, useEffect, useRef, forwardRef, createRef } from "react";
import DatePicker from "react-datepicker";
import { getTechportData } from "../../api/nasa.api";
import { createSelectedDateString } from "../common/Utilities";
import Result from "../iterables/Result";
import Loader from "../common/Loader";
import { calendar } from "../../assets/img/index";
import "react-datepicker/dist/react-datepicker.css";

export default function Techport() {
  const projectRefs = useRef([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedProjectsArray, setSelectedProjectsArray] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [projectDatesObject,setProjectDatesObject] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const setRefs = (array) => projectRefs.current = array.map((_, index) => projectRefs.current[index] ?? createRef());

  const fetchData = async () => {
    await getTechportData().then(res => {
      let projectDatesObject = {};

      if (res.data.projects && res.data.projects.length > 0) {
        res.data.projects.forEach((project) => {
          if (project.lastUpdated in projectDatesObject) {
            projectDatesObject[project.lastUpdated].push(project.projectId);
          } else {
            projectDatesObject[project.lastUpdated] = [project.projectId];
          }
        });
      }

      let projectDatesArray = Object.keys(projectDatesObject);
      let mostRecentDate = new Date(projectDatesArray[0]);
      mostRecentDate.setTime(mostRecentDate.getTime() + (12 * 60 * 60 * 1000));

      setSelectedDate(mostRecentDate);
      setSelectedProjectId(projectDatesObject[projectDatesArray[0]][0])
      setSelectedProjectsArray(projectDatesObject[projectDatesArray[0]]);
      setRefs(projectDatesObject[projectDatesArray[0]]);
      setProjectDatesObject(projectDatesObject);
    }).then(_ => {
      setIsLoaded(true);
    }).catch(error => {
      console.log(error);
    });    
  }

  const handleDateSelect = (date) => {   
    const newSelectedDateString = createSelectedDateString(date);
    
    if (newSelectedDateString in projectDatesObject) {
      const newSelectedDate = new Date(newSelectedDateString);
      newSelectedDate.setTime(newSelectedDate.getTime() + (12 * 60 * 60 * 1000));

      setSelectedDate(newSelectedDate);
      setSelectedProjectId(projectDatesObject[newSelectedDateString][0])
      setSelectedProjectsArray(projectDatesObject[newSelectedDateString]);
      setRefs(projectDatesObject[newSelectedDateString]);
    }
  }  

  const handleProjectSelect = (index) => {
    if (index < 0) {
      index = selectedProjectsArray.length - 1;
    }

    if (index > selectedProjectsArray.length - 1) {
      index = 0;
    }

    projectRefs.current[index].current.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    });

    setSelectedProjectId(selectedProjectsArray[index]);
  }
  
  const TechportCustomInput = forwardRef(({ value, onClick, onChange }, ref) => (
    <>
      <input
        value={value}
        className="techport-custom-input"
        onClick={onClick}
        onChange={onChange}
        ref={ref}
      />
      <img src={calendar} alt="calendar" />
    </>
  ));

  return (
    (isLoaded ?
      <main className="techport">
        <section>
          <div className="techport-content-box">
            <div className="techport-datepicker-wrapper">
              <div className="techport-datepicker-box">
                <h2>Search by Date:</h2>
                <DatePicker
                  selected={selectedDate}
                  onChange={(date) => handleDateSelect(date)}
                  customInput={<TechportCustomInput />}
                  popperPlacement="right"
                  closeOnScroll={true}
                  filterDate={(date) => createSelectedDateString(date) in projectDatesObject}
                />
              </div>

              <div className="techport-results-box">
                  <ul className="techport-results-list">
                    {selectedProjectsArray.length > 0 &&
                      selectedProjectsArray.map((projectId, index) => {
                        return (
                          <li key={index}>
                            <button ref={projectRefs.current[index]} className={`btn btn-outline-secondary techport-result${selectedProjectId === projectId ? ' active' : ''}`} onClick={() => handleProjectSelect(index)}>
                              {projectId}
                            </button>
                          </li>
                        );
                      })
                    }
                </ul>
              </div>
            </div>

            <div className="techport-info-box">
              <p>Use the <span className="techport-info-bold">"Search By Date"</span> calendar to the left to explore various early-stage concepts, prototypes or fully-developed technologies.</p>
              <p>The TechPort portal aggregates technology investment information from developers, designers, architects and engineers from across NASA. Its primary goal is to promote collaboration and partnerships that could lead to actualization of these proposed technologies.</p>  
              <p>For more information, visit the Techport website <a href="https://techport.nasa.gov/home" target="_blank" rel="noopener noreferrer">here</a>.</p>  
              
              {selectedProjectId &&
                <>
                  <div className="buttons">
                    <button type="button" className="previous" onClick={() => handleProjectSelect(selectedProjectsArray.indexOf(selectedProjectId) - 1)}></button>
                    <p>{selectedProjectId}</p>
                    <button type="button" className="next" onClick={() => handleProjectSelect(selectedProjectsArray.indexOf(selectedProjectId) + 1)}></button>
                  </div>
                  <Result projectId={selectedProjectId} />
                </>    
              }          
            </div>
          </div>
        </section>
      </main>
      :
      <Loader />
    )
  );
}