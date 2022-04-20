import "../App.css";
import React from "react";
import hpoSearchService from "../services/hpoSearchService";

const SymptomCreate = () => {
  const [symptomText, setSymptomText] = React.useState("");
  const [terms, setTerms] = React.useState([]);
  const [diseases, setDiseases] = React.useState([]);
  const [genes, setGenes] = React.useState([]);

  const onChangeText = (e) => {
    setSymptomText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    hpoSearchService.search(symptomText, 10).then((data) => {
      const termResults = data["terms"].map((arrayItem) => {
        return arrayItem["name"];
      });
      const diseaseResults = data["diseases"].map((arrayItem) => {
        return arrayItem["dbName"];
      });
      const geneResults = data["genes"].map((arrayItem) => {
        return arrayItem["name"];
      });

      setTerms(termResults);
      setDiseases(diseaseResults);
      setGenes(geneResults);
      console.log(termResults);
      console.log(diseaseResults);
      console.log(geneResults);
      // setSuggestions(results);
    });
  };

  return (
    <div className="flex-container">
      <div className="flex-child">
        <h4>Creating your symptom: </h4>
        <form>
          <div className="form-group">
            <label htmlFor="textarea">Symptom text</label>
            <textarea
              className="form-control"
              id="textarea"
              rows="8"
              onChange={onChangeText}
              value={symptomText}
            ></textarea>
          </div>
        </form>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleSubmit}
        >
          Search
        </button>
      </div>
      <div className="flex-child">
        <h4>Term Suggestions</h4>
        <div>
          {terms.length > 0 ? (
            <ul>
              {terms.map((term, index) => {
                return <li key={index}> {term} </li>;
              })}
            </ul>
          ) : (
            "None"
          )}
        </div>
        <h4>Disease Suggestions</h4>
        <div>
          {diseases.length > 0 ? (
            <ul>
              {diseases.map((disease, index) => {
                return <li key={index}> {disease} </li>;
              })}
            </ul>
          ) : (
            "None"
          )}
        </div>
        <h4>Gene suggestions</h4>
        <div>
          {genes.length > 0 ? (
            <ul>
              {genes.map((gene, index) => {
                return <li key={index}> {gene} </li>;
              })}
            </ul>
          ) : (
            "None"
          )}
        </div>
      </div>
    </div>
  );
};

export default SymptomCreate;
