import axios from "../utils/axios";

const getAllTeam = async (teamName, offset, limit) => {
  try {
    const response = await axios.post("/teams/getAll", {teamName, offset, limit});
    return response.data.data
  } catch (err) {
    console.log(err);
    return [];
  }
}

const createTeam = async (ownerId, teamName, province) => {
  try {
    const response = await axios.post("/teams/create", {ownerId, teamName, province});
    return response.data;
  } catch (err) {
    console.log(err);
    return {
      code: 500,
      errorMessage: "Lỗi không xác định"
    };
  }
}

export default {
  getAllTeam,
  createTeam
}