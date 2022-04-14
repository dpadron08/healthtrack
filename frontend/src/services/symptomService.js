import axios from "axios"

const API_URL = "http://localhost:8000" + "/api/symptoms/"

// create a new symptom
const createSymptom = async (symptomData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  }
  
  const response = await axios.post(API_URL, symptomData, config)
  return response.data
}

const getSymptoms = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  }

  const response = await axios.get(API_URL, config)
  return response.data
}

const deleteSymptom = async (symptomId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  }

  const response = await axios.delete(API_URL + symptomId, config)
  return response.data
}

const editSymptom = async (symptomId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  }

  const response = await axios.put(API_URL + symptomId, config)
  return response.data
}

const symptomService = {
  createSymptom,
  getSymptoms,
  deleteSymptom,
  editSymptom
}

export default symptomService;