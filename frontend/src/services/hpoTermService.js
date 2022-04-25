import axios from "axios";

// for /api/hpo/term/{ontologyID}
const HPO_TERM_SEARCH_API_URL = "https://hpo.jax.org/api/hpo/term/";

// use this to get definitions and commetns about ontology ID's
const searchTerm = async (ontologyID) => {
  const FINAL_URL = `${HPO_TERM_SEARCH_API_URL}${ontologyID}`;

  const config = {
    headers: {
      accept: "application/json",
    },
  };

  const response = await axios.get(FINAL_URL, config);
  return response.data;
};

const hpoTermService = {
  searchTerm,
};

export default hpoTermService;
