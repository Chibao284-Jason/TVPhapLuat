import Config from "@config/configApi";
const axios = require('axios');
export const getBannerApi = () => {
  const config = {
    method: 'get',
    url: `${Config.API_URL}/banner/`,
    headers: {},
  };
  return axios(config)
    .then(function (response: any) {

      return response
    })
    .catch(function (error: any) {
      return error
    });
}
