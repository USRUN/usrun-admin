import axios from "../utils/axios";
import AuthenticationService from "./AuthenticationService";


const banUser = async (userId, banned) => {
    try {
        const response = await axios.post("/users/banUser", {
            userId,
            banned
        });

        if (response.data.code == 0) {
            return true;
        } else {
            return false;
        }
    } catch (err) {
        console.error(err);
        return false;
    }
};

const loadUserOnPage = async (offset, limit) => {
    const authHeader = AuthenticationService.authHeader();

    try {
        const response = await axios.post("/users/getAllUsersPaged", {
            offset,
            limit
        }, {
            headers: authHeader,
        });

        if (response.data.code == 0) {
            console.log(response.data);
            return response.data.data;
        } else {
            return [];
        }
    } catch (err) {
        console.error(err);
        return [];
    }
}

export default {
    banUser,
    loadUserOnPage
};