import axios from 'axios';

const PEOPLE_API_HOST = process.env.REACT_APP_PEOPLE_API_HOST;

export default class PeopleService {
    static async add(user){
        const formData = new FormData();
        formData.append("name", user.userInfo.name);
        if (user.image) formData.append("image", user.image, user.image.name);
        if (user.email) formData.append("email", user.userInfo.email);
        formData.append("geo", JSON.stringify(user.userInfo.geo));
        const response = await axios.post(`${PEOPLE_API_HOST}/peopleadd`, formData);
        console.log(response);
    }

    static async getUsers(){
        const response = await axios.get(`${PEOPLE_API_HOST}/people`);
        console.log(response);
        return response.data;
    }
}