import axios from "axios";

const API_URL = "http://localhost:8000" + "/api/matches/";

const getMatches = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);
  return response.data;
};

const matchService = {
  getMatches,
};

export default matchService;
