import { useState, useEffect } from "react";
import { api } from "../../api/api";

export default function Result({ projectId }) {
  const [project, setProject] = useState({});
  const {
    acronym, 
    description, 
    title, 
    program, 
    leadOrganization, 
    startDateString, 
    endDateString, 
    status, 
    projectDirectors,
    projectManagers, 
    programDirectors, 
    programManagers,
    principalInvestigators, 
    benefits, 
    closeoutSummary, 
    libraryItems 
  } = project;

  useEffect(() => {
    fetchData(projectId);
  }, [projectId]);

  const fetchData = () => {
    api.get(`/nasa/${projectId}`).then(res => {
      let temp = res.data.project;

      for (let title of ["project", "program"]) {
        res.data.project[title + "Contacts"].forEach(contact => {
          let role = contact[title + "ContactRole"].replace("_", "");
          role = role.charAt(0).toLowerCase() + role.slice(1) + "s";
  
          if (!temp[role]) {
            temp[role] = [];
          } 
  
          temp[role].push(contact.fullName);
        });
      }

      setProject(temp);
    }).catch(error => console.log(error));
  }

  return (
    (Object.keys(project).length > 0 &&
      <div className="results-container">        
        <div className="results-section-box">
          <div className="results-section-whole">
            <h4 className="results-section-title">Project Name:</h4>
            <span>
              <a href={`https://techport.nasa.gov/view/${projectId}`} target="_blank" rel="noopener noreferrer">{title}</a>
              {acronym && <span>&nbsp;({acronym})</span>}
            </span>
          </div>
        </div>

        <div className="results-section-box">
          <div className="results-section-half">
            <h4 className="results-section-title">Responsible Program:</h4>
            <span>{program.title} ({program.acronym})</span>
          </div>

          <div className="results-section-half">
            <h4 className="results-section-title">Lead Organization:</h4>
            {leadOrganization && <span>{leadOrganization.organizationName}{`${leadOrganization.city ? " - " + leadOrganization.city : ""}`}{`${leadOrganization.stateTerritory ? ", "  + leadOrganization.stateTerritory.name: ""}`}</span>} 
          </div>
        </div>

        <div className="results-section-box">
          <div className="results-section-third">
            <h4 className="results-section-title">Start Date:</h4>
            <span>{startDateString}</span>
          </div>
          <div className="results-section-third">
            <h4 className="results-section-title">End Date:</h4>
            <span>{endDateString}</span>
          </div>
          <div className="results-section-third">
            <h4 className="results-section-title">Status:</h4>
            <span>{status}</span>
          </div>
        </div>

        <div className="results-section-box">
          <div className="results-section-fifth">
            <h4 className="results-section-title">Project Director(s):</h4>
            {projectDirectors ? projectDirectors.map((projectDirector, index) => <span key={index}>{projectDirector}</span>) : <span>CLASSIFIED</span>}
          </div>

          <div className="results-section-fifth">
            <h4 className="results-section-title">Project Manager(s):</h4>
            {projectManagers ? projectManagers.map((projectManager, index) => <span key={index}>{projectManager}</span>) :<span>CLASSIFIED</span>}
          </div>

          <div className="results-section-fifth">
            <h4 className="results-section-title">Program Director(s):</h4>
            {programDirectors ? programDirectors.map((programDirector, index) => <span key={index}>{programDirector}</span>) : <span>CLASSIFIED</span>}
          </div>

          <div className="results-section-fifth">
            <h4 className="results-section-title">Program Manager(s):</h4>
            {programManagers ? programManagers.map((programManager, index) => <span key={index}>{programManager}</span>) : <span>CLASSIFIED</span>}
          </div>

          <div className="results-section-fifth">
            <h4 className="results-section-title">Principal Investigator(s):</h4>
            {principalInvestigators ? principalInvestigators.map((principalInvestigator, index) => <span key={index}>{principalInvestigator}</span>) : <span>N/A</span>}
          </div>
        </div>

        <div className="results-section-box">
          <div className="results-section-whole">
            <h4 className="results-section-title">Description:</h4>
            {description ? <span dangerouslySetInnerHTML={{__html: description}}></span> : <span>N/A</span>} 
          </div>
        </div>

        <div className="results-section-box">
          <div className="results-section-whole">
            <h4 className="results-section-title">Benefits:</h4>
            {benefits ? <span dangerouslySetInnerHTML={{__html: benefits}}></span> : <span>CLASSIFIED</span>} 
          </div>
        </div>

        {closeoutSummary &&
          <div className="results-section-box">
            <div className="results-section-whole">
              <h4 className="results-section-title">Closeout Summary:</h4>
                {closeoutSummary && <span dangerouslySetInnerHTML={{__html: closeoutSummary}}></span>}
              <br />

              {(libraryItems && libraryItems.length > 0) &&
                <Fragment>
                  <h4 className="results-section-title">Closeout Document(s):</h4>
                    <span>
                      {libraryItems.map((document, index) => {
                        return <li key={index}><a href={`${ document.url }`}>{ document.title }</a></li>
                      })}
                    </span>
                    <br />
                </Fragment>
              }
            </div>
          </div>
        }
      </div>
    )
  );
}