import { useState, useEffect, Fragment, forwardRef } from "react";
import DatePicker, { CalendarContainer } from "react-datepicker";
import { getTechportData } from "../../api/nasa.api";
import { createSelectedDateString } from "../common/Utilities";
import Result from "../iterables/Result";
import Loader from "../common/Loader";
import "react-datepicker/dist/react-datepicker.css";

export default function Techport() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedProjectsArray, setSelectedProjectsArray] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [projectDatesObject,setProjectDatesObject] = useState({});

  // const {state, setState} = useState({
  //   next: 0,
  //   previous: 0,
  //   selectedDate: null,
  //   selectedProjectId: null,
  //   selectedProjects: [],
  // });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    await getTechportData().then(res => {
      let projectDatesObject = {}; // ORGANIZES PROJECT IDS BY DATE

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
      setSelectedProjectsArray(projectDatesObject[projectDatesArray[0]]);
      setProjectDatesObject(projectDatesObject)
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
      setSelectedProjectsArray(projectDatesObject[newSelectedDateString]);
    }
  }  

  const handleProjectSelect = (index) => {
    console.log(index)

    // setState({ 
    //   selectedProjectId: selectedProjectsArray[index],
    //   previous: ((index == 0) ? selectedProjectsArray.length - 1 : index - 1),
    //   next: ((index == selectedProjectsArray.length - 1) ? 0 : index + 1)
    // });
  }

  // const MyContainer = ({ className, children }) => {
  //   return (
  //     <CalendarContainer className={className}>
  //       <div>{children}</div>
  //     </CalendarContainer>
  //   );
  // };
  
  // const TechportCustomInput = forwardRef(({ value, onClick, onChange }, ref) => (
  //   <input
  //     value={value}
  //     className="techport-custom-input"
  //     onClick={onClick}
  //     onChange={onChange}
  //     ref={ref}
  //   ></input>
  // ));

  console.log(selectedProjectId)

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
                  // customInput={<TechportCustomInput />}
                  popperPlacement="right"
                  // calendarContainer={MyContainer}
                  closeOnScroll={true}
                  filterDate={(date) => createSelectedDateString(date) in projectDatesObject}
                />
              </div>

              <div className="techport-results-box">
                {/* <h1 className="techport-results-title">{selectedProjectsArray.length} projects listed on {getFormalDateString(selectedDate.toISOString())}:</h1> */}
                  <ul className="techport-results-list">
                    {selectedProjectsArray.length > 0 &&
                      selectedProjectsArray.map((projectId, index) => <li key={index}><button className="btn btn-outline-secondary techport-result" onClick={() => setSelectedProjectId(projectId)}>{projectId}</button></li>)
                    }
                </ul>
              </div>
            </div>

            <div className="techport-info-box">
              <span className="techport-chevron"><i className="fa fa-chevron-circle-left fa-3x" aria-hidden="true"></i></span>
              <p>Use the <span className="techport-info-bold">"Search By Date"</span> calendar to the left to explore various early-stage concepts, prototypes or fully-developed technologies.</p>
              <p>The TechPort portal aggregates technology investment information from developers, designers, architects and engineers from across NASA. Its primary goal is to promote collaboration and partnerships that could lead to actualization of these proposed technologies.</p>  
              <p>For more information, visit the Techport website <a href="https://techport.nasa.gov/home" target="_blank" rel="noopener noreferrer">here</a>.</p>  
              
              {selectedProjectId &&
                <>
                  <hr />
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