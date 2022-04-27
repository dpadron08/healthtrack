import React, { useEffect, useState } from "react";
import matchService from "../services/matchService";

const form_style = { textAlign: "left", width: "50%" };

const Matches = () => {
  const [matches, setMatches] = useState([]);

  const retrieveMatches = () => {
    // local storage only stores strings
    const userCookie = JSON.parse(localStorage.getItem("user"));
    if (!userCookie) {
      setMatches([]);
      return;
    }
    const token = userCookie["token"];

    if (!token) {
      setMatches([]);
      console.log("Error, user cookie found with no token");
      return;
    }

    matchService
      .getMatches(token)
      .then((data) => {
        setMatches(data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  useEffect(retrieveMatches, []);

  return (
    <div>
      <h4>These are your matches! </h4>
      <p style={form_style}>
        A match is someone who was found to have similar symptoms as you! Feel
        free to reach out with their email to connect.{" "}
      </p>
      <div className="row">
        {matches.map((match, index) => {
          return (
            <div className="col-lg-4 pb-1" key={index}>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{match.email}</h5>
                  <p className="card-text">
                    <strong>Matching symptom: </strong>
                    {match.symptom.text}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Matches;
