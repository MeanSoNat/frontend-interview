import { createContext, useState, useEffect, useCallback } from "react";
import PropTypes from 'prop-types'; 
import axios from "axios";

export const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const baseURL = import.meta.env.VITE_DATA_BASE_URL;

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(`${baseURL}/api/intent`);
    
      // Update subintent values
    const updatedData = response.data.map(item => {
      if (item.subintent === 1) {
        return { ...item, subintent: "sap" };
      } else if (item.subintent === 2) {
        return { ...item, subintent: "ad" };
      } else {
        return item; // No change for other values
      }
    });
      setData(updatedData);
    } catch (error) {
      console.error(error);
    }
  }, [baseURL]);

  const submit = useCallback(
    async (intent, subintent, point) => {
      try {
        await axios.post(`${baseURL}/api/intent`, {
          intent: intent,
          subintent: subintent,
          point: point,
        });
        fetchData(); // Fetch data again after successful submission
      } catch (error) {
        console.error(error);
      }
    },
    [baseURL, fetchData]
  );

  const deleteItem = useCallback(
    async (item) => {
      try {
        await axios.delete(`${baseURL}/api/intent/${item.id}`);
        fetchData();
      } catch (error) {
        console.error(error);
      }
    },
    [baseURL, fetchData]
  );

  useEffect(() => {
    fetchData();
  }, [submit, fetchData, deleteItem]);

  return (
    <DataContext.Provider value={{ data, submit, deleteItem }}>
      {children}
    </DataContext.Provider>
  );
};


DataProvider.propTypes = {
  children: PropTypes.node.isRequired, 
};