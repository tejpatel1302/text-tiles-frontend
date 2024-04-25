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
  
  export const addAddressApi = async (formData: any, config: any) => {
    try {
      const response = await axios.post(
        `${api}/address`,
        formData,
        config
      );
      return response.data;
    } catch (error) {
      throw error; // You can handle errors in the calling function
    }
  };
  export const PaymentApi = async (formData: any, config: any) => {
    try {
      const response = await axios.post(
        `${api}/paymentcard`,
        formData,
        config
      );
      return response.data;
    } catch (error) {
      throw error; // You can handle errors in the calling function
    }
  };
  export const OrderApi = async (formData: any, config: any) => {
    try {
      const response = await axios.post(
        `${api}/order`,
        formData,
        config
      );
      return response.data;
    } catch (error) {
      throw error; // You can handle errors in the calling function
    }
  };
  export const addToCartApi = async (formData: any, config: any) => {
    try {
      const response = await axios.post(
        `${api}/cart/add-to-cart`,
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
  
  export const getUserApi  = async (payload: any) => {
    return axios.get(`${api}/auth/whoami`, {
      headers: payload,
    });
  };
 
  export const getPaymentApi  = async (payload: any) => {
    return axios.get(`${api}/paymentcard`, {
      headers: payload,
    });
  };
  export const getAddressApi  = async (payload: any) => {
    return axios.get(`${api}/address`, {
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
  export const getOrderHistoryApi  = async (payload: any) => {
    return axios.get(`${api}/order/data/user-history`, {
      headers: payload,
    });
  };
  export const getOrdersApi  = async (payload: any) => {
    return axios.get(`${api}/order`, {
      headers: payload,
    });
  };
  export const getCartApi  = async (payload: any) => {
    return axios.get(`${api}/cart`, {
      headers: payload,
    });
  };
  export const getSAOrdersApi  = async (payload: any) => {
    return axios.get(`${api}/erp`, {
      headers: payload,
    });
  };
  // export const getOrderDetailApi   = async (payload: any ,req:any) => {
  //   return axios.get(`${api}/order/action`, {
  //     headers: payload,
  //     req
  //   });
  // };
  export const deleteCategoryApi  = async (payload: any, id:any) => {
    return axios.delete(`${api}/category/${id}`, {
      headers: payload,
      params:{
        id:id
      }
    });
  };
  export const deleteSubCategoryApi  = async (payload: any, id:any) => {
    return axios.delete(`${api}/sub-category/${id}`, {
      headers: payload,
      params:{
        id:id
      }
    });
  };
  export const ReviewedApi = async (payload: any, id:any, status:any) => {
    return axios.patch(`${api}/order/${id}`,status ,{
      headers: payload,
      params:{
        id:id
      }
    });
  };
  export const actionApi = async (payload: any, req: any) => {
    return axios.post(`${api}/order/action`, req, {
        headers: payload,
      
    });
};
  export const getSingleProductApi = async (payload:any, id:any) => {
    try {
      const response = await axios.get(`${api}/product/${id}`, {
        headers: payload,
        params: {
          id: id
        }
        
      });
      return response.data;
    } catch (error) {
      // Handle errors here
      console.error('Error fetching single product:', error);
      throw error; // Rethrow the error to handle it in the calling code
    }
  };
  export const  getOrderDetailsApi = async (payload:any, id:any) => {
    try {
      const response = await axios.get(`${api}/order/${id}`, {
        headers: payload,
        params: {
          id: id
        }
        
      });
      return response.data;
    } catch (error) {
      // Handle errors here
      console.error('Error fetching single product:', error);
      throw error; // Rethrow the error to handle it in the calling code
    }
  };
  
  export const getSubCategoryWithIDApi = async (payload:any, id:any) => {
    try {
      const response = await axios.get(`${api}/sub-category/${id}`, {
        headers: payload,
        params: {
          id: id
        }
        
      });
      return response.data;
    } catch (error) {
      // Handle errors here
      console.error('Error fetching single product:', error);
      throw error; // Rethrow the error to handle it in the calling code
    }
  };
  export const getProductsWithSubIDApi = async (payload:any, id:any) => {
    try {
      const response = await axios.get(`${api}/product/Sub-Category/${id}`, {
        headers: payload,
        params: {
          id: id
        }
        
      });
      return response.data;
    } catch (error) {
      // Handle errors here
      console.error('Error fetching single product:', error);
      throw error; // Rethrow the error to handle it in the calling code
    }
  };
  export const getProductsWithColorIdApi = async (payload:any, id:any) => {
    try {
      const response = await axios.get(`${api}/colors/relation/${id}`, {
        headers: payload,
        params: {
          id: id
        }
        
      });
      return response.data;
    } catch (error) {
      // Handle errors here
      console.error('Error fetching single product:', error);
      throw error; // Rethrow the error to handle it in the calling code
    }
  };