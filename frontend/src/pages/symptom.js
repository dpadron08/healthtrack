import React from "react";
import { useEffect } from "react";
import { useMatch, useNavigate } from "react-router-dom";
import symptomService from "../services/symptomService";

const Symptom = () => {
  const initialSymptomState = {
    text: "",
    id: "",
  };
  const [symptom, setSymptom] = React.useState(initialSymptomState);

  const match = useMatch("symptoms/:id");
  let navigate = useNavigate();

  const getSymptom = (id) => {
    // local storage only stores strings
    const token = JSON.parse(localStorage.getItem("user"))["token"];

    symptomService.getSymptom(id, token).then((data) => {
      setSymptom({ text: data.symptoms[0].text, id: data.symptoms[0]._id });
    });
  };

  const onChangeText = (e) => {
    setSymptom({ ...symptom, text: e.target.value });
  };

  useEffect(() => {
    getSymptom(match.params.id);
  }, [match.params.id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // local storage only stores strings
    const token = JSON.parse(localStorage.getItem("user"))["token"];

    symptomService
      .editSymptom(symptom.id, { text: symptom.text }, token)
      .then((response) => {
        console.log("Updated response: " + response);
        navigate("/", { replace: true });
      });
  };

  const handleDelete = (e) => {
    e.preventDefault();

    // local storage only stores strings
    const token = JSON.parse(localStorage.getItem("user"))["token"];

    symptomService.deleteSymptom(symptom.id, token).then((response) => {
      console.log("SymptomID: " + symptom.id + " was deleted");
      navigate("/", { replace: true });
    });
  };

  return (
    <div>
      <h1>Editing your symptom: </h1>
      <form>
        <div className="form-group">
          <label htmlFor="textarea">Symptom text</label>
          <textarea
            className="form-control"
            id="textarea"
            rows="8"
            onChange={onChangeText}
            value={symptom.text}
          ></textarea>
        </div>
      </form>
      <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
        Save
      </button>
      <br></br>
      <button type="submit" className="btn btn-primary" onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
};

export default Symptom;
