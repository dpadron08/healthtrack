import axios from "axios";

const API_URL = "http://localhost:8000" + "/api/tree/";

// get this user's tree
const getTree = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);
  return JSON.parse(response.data.tree.items);
};

const updateTree = async (token, treeItems) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(
    API_URL,
    { items: JSON.stringify(treeItems) },
    config
  );
  return response.data;
};

const treeService = {
  getTree,
  updateTree,
};

export default treeService;
