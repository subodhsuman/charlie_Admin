import axios from "axios";

export default class ApiClass {

    // static baseUrl = 'https://node.charlieexchange.io/admin/';
    // static nodeUrl = 'https://node.charlieexchange.io/';

    static baseUrl = 'http://192.168.90.152:5055/admin/';
    static nodeUrl = 'http://192.168.90.152:5055/';

  // post api
  static postRequest(apiUrl, isToken = true, formData = null, headers = null, params = null) {
    return axios.post(this.baseUrl + apiUrl, formData, this.config(isToken, headers, params)).then((result) => {
      return result;
    }).catch((error) => {
      if (error.response.status == 401) {
        this.unauthenticateRedirect();
      }
    });
  }

  // get api
  static getRequest(apiUrl, isToken = true, headers = null, params = null) {
    return axios.get(this.baseUrl + apiUrl, this.config(isToken, headers, params)).then((result) => {
      return result;
    }).catch((error) => {
      if (error.response.status == 401) {
        this.unauthenticateRedirect(); 
      }
    });
  }

  // update api if form data with image 
  static updateFormRequest(apiUrl, isToken = true, formData = null, headers = null, params = null) {
    baseParam = { _method: "PUT" };
    if (params != null) { var baseParam = Object.assign(params, baseParam); }
    return axios.post(this.baseUrl + apiUrl, formData, this.config(isToken, headers, baseParam)).then((result) => {
      return result;
    }).catch((error) => {
      if (error.response.status == 401) {
        this.unauthenticateRedirect();
      }
    });
  }

  // update api if form data with json format 
  static updateRequest(apiUrl, isToken = true, formData = null, headers = null, params = null) {
    return axios.put(this.baseUrl + apiUrl, formData, this.config(isToken, headers, params)).then((result) => {
      return result;
    }).catch((error) => {
      if (error.response.status == 401) {
        this.unauthenticateRedirect();
      }
    });
  }

  // delete api
  static deleteRequest(apiUrl, isToken = true, headers = null, params = null) {
    return axios.delete(this.baseUrl + apiUrl, this.config(isToken, headers, params)).then((result) => {
      return result;
    }).catch((error) => {
      if (error.response.status == 401) {
        this.unauthenticateRedirect();
      }
    });
  }

  static deleteNodeRequest(apiUrl, isToken = true, headers = null, params = null) {
    return axios.delete(this.nodeUrl + apiUrl, this.config(isToken, headers, params)).then((result) => {
      return result;
    }).catch((error) => {
      if (error.response.status == 401) {
        this.unauthenticateRedirect();
      }
    });
  }

 //Update node 
 static putNodeRequest(apiUrl, isToken = true, formData = null, headers = null, params = null) {

  return axios.put(this.nodeUrl + apiUrl, formData, this.config(isToken, headers, params)).then(result => {
      return result;
  }).catch(error => {
      if (error.response.status == 401) {
          this.unauthenticateRedirect();
      }
  });
}

static getRate(apiUrl, headers = null, params = null) {
  return axios
    .get(this.rateURl, this.config(headers, params))
    .then((result) => {
      return result;
    })
    .catch((err) => {
      if (err.response.status == 401) {
        this.unauthenticateRedirect();
      }
    });
}


  // Configrations of header and parameters 
  static config(isToken = true, headers = null, parameters = null) {
    var defaultHeaders = {
      Accept: "application/json",
    };
    var merge = {};
    if (isToken) {
      var token = { Authorization: `Bearer ${localStorage.getItem('token')}` };
    
      merge = Object.assign(defaultHeaders, token);
    }
    merge = Object.assign(defaultHeaders, headers);
    return {
      headers: merge,
      params: parameters,
    };
  }

  // unautherntication Error
  static unauthenticateRedirect() {
    localStorage.clear();
    location.replace("/");
  }

  // node get Api
  static getNodeRequest(apiUrl, isToken = true, headers = null, params = null) {
    return axios.get(this.nodeUrl + apiUrl, this.config(isToken, headers, params)).then((result) => {
      return result;
    }).catch((error) => {
      if (error.response.status == 401) { this.unauthenticateRedirect(); }
    });
  }

  // node post Api
  static postNodeRequest(apiUrl, isToken = true, formData = null, headers = null, params = null) {
    return axios.post(this.nodeUrl + apiUrl, formData, this.config(isToken, headers, params)).then((result) => {
      return result;
    }).catch((error) => {
      if (error.response.status == 401) { this.unauthenticateRedirect(); }
    });
  }

}
