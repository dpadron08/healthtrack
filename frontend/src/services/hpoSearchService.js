import axios from "axios";

// for /api/hpo/search/?q={query}
const HPO_SEARCH_API_URL = "https://hpo.jax.org/api/hpo/search/";

const search = async (query, max = -1, offset = 0, category = "terms") => {
  const FINAL_URL = `${HPO_SEARCH_API_URL}?q=${query}&max=${max}&offset=${offset}&category=${category}`;

  const config = {
    headers: {
      accept: "application/json",
    },
  };

  const response = await axios.get(FINAL_URL, config);
  return response.data;
};

const hpoSearchService = {
  search,
};

export default hpoSearchService;
