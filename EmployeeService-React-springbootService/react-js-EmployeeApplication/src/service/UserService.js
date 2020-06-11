import axios from 'axios';
import AuthService from './AuthService';

const USER_API_BASE_URL = 'http://localhost:8080/users';

class UserService {

    fetchUsers() {
        return axios.get(USER_API_BASE_URL, AuthService.getAuthHeader());
    }

    fetchUserById(userId) {
        return axios.get(USER_API_BASE_URL + '/' + userId, AuthService.getAuthHeader());
    }

    deleteUser(userId) {
        return axios.delete(USER_API_BASE_URL + '/' + userId, AuthService.getAuthHeader());
    }

    addUser(user) {
        return axios.post(""+USER_API_BASE_URL, user, AuthService.getAuthHeader());
    }

    editUser(user) {
        return axios.put(USER_API_BASE_URL + '/' + user.id, user, AuthService.getAuthHeader());
    }

}

export default new UserService();