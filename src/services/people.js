import axios from 'axios';
import qs from 'qs';

const HOSTNAME = "http://localhost:3000";
export default class PeopleService {
    static async add(user){
        const formData = new FormData();
        formData.append("name", user.userInfo.name);
        if (user.image) formData.append("image", user.image, user.image.name);
        if (user.email) formData.append("email", user.userInfo.email);
        formData.append("geo", JSON.stringify(user.userInfo.geo));
        const response = await axios.post(`${HOSTNAME}/peopleadd`, formData);
        console.log(response);
    }

    static async getUsers(){
        const response = await axios.get(`${HOSTNAME}/people`);
        console.log(response);
        return response.data;
    }
}