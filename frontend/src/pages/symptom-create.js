import "../App.css";
import React from "react";
import hpoSearchService from "../services/hpoSearchService";

const SymptomCreate = () => {
  const [symptomText, setSymptomText] = React.useState("");
  const [suggestions, setSuggestions] = React.useState([]);

  const onChangeText = (e) => {
    setSymptomText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    hpoSearchService.search(symptomText).then((data) => {
      const results = data["terms"].map((arrayItem) => {
        return arrayItem["name"];
      });
      console.log(results);
      setSuggestions(results);
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
        <p>{suggestions}</p>
      </div>
    </div>
  );
};

export default SymptomCreate;
