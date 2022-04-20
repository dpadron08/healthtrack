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
    <div>
      <h2>Creating your symptom: </h2>
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
      <h4>Term Suggestions</h4>
      <p>{suggestions}</p>
      <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
        Save
      </button>
    </div>
  );
};

export default SymptomCreate;
