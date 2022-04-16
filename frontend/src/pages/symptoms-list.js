import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import symptomService from "../services/symptomService";

const SymptomsList = props => {
  const [symptoms, setSymptoms] = useState([]);

  const retreiveSymptoms = () => {    
    // local storage only stores strings
    const token = JSON.parse(localStorage.getItem('user'))['token']

    symptomService.getSymptoms(token)
      .then( data => {
        setSymptoms(data.symptoms)
      })
      .catch( e => {
        console.log(e)
      })
  }

  useEffect(retreiveSymptoms, []);

  return (
    <div className="row">
        {symptoms.map((symptom, index) => {
          const symptomText = symptom.text;
          return (
            <div className="col-lg-4 pb-1" key={index}>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Symptom</h5>
                  <p className="card-text">
                    <strong>Text: </strong>{symptomText}
                  </p>
                  <div className="row">
                  <Link to={"/symptoms/"+symptom._id} className="btn btn-primary col-lg-5 mx-1 mb-1">
                    View/Edit Symptom
                  </Link>
                  <Link to={"/symptoms/"+symptom._id} className="btn btn-primary col-lg-5 mx-1 mb-1">
                    Delete Symptom
                  </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}


      </div>
  );
}

export default SymptomsList;