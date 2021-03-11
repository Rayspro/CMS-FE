import axios from 'axios';

export default class authService {
  init = () => {
        this.setInterceptors();
  };
  
  setInterceptors = () => {
        axios.defaults.headers.common['Token'] = localStorage.getItem("token");
  };
}