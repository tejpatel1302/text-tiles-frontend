import axios from "axios";

const api = "https://api-text.ravindravaland.co";

export const addCategoryApi = async (formData: any, config: any) => {
    try {
      const response = await axios.post(
        `${api}/category`,
        formData,
        config
      );
      return response.data;
    } catch (error) {
      throw error; // You can handle errors in the calling function
    }
  };

  export const addManageCategoryApi = async (formData: any, config: any) => {
    try {
      const response = await axios.post(
        `${api}/sub-category`,
        formData,
        config
      );
      return response.data;
    } catch (error) {
      throw error; // You can handle errors in the calling function
    }
  };
  export const addProductApi = async (formData: any, config: any) => {
    try {
      const response = await axios.post(
        `${api}/product`,
        formData,
        config
      );
      return response.data;
    } catch (error) {
      throw error; // You can handle errors in the calling function
    }
  };
  export const getCategoryApi  = async (payload: any) => {
    return axios.get(`${api}/category`, {
      headers: payload,
    });
  };
  export const getSubCategoryApi  = async (payload: any) => {
    return axios.get(`${api}/sub-category`, {
      headers: payload,
    });
  };
  export const getColorsApi  = async (payload: any) => {
    return axios.get(`${api}/colors`, {
      headers: payload,
    });
  };
  export const getProductsApi  = async (payload: any) => {
    return axios.get(`${api}/product`, {
      headers: payload,
    });
  };
 