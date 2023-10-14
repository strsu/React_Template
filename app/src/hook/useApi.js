import { useReducer, useEffect } from 'react';

// Reducer 함수
const apiReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_INIT':
      return { ...state, isLoading: true, error: null };
    case 'FETCH_SUCCESS':
      return { ...state, isLoading: false, data: action.payload, error: null };
    case 'FETCH_ERROR':
      return { ...state, isLoading: false, data: null, error: action.payload };
    default:
      throw new Error(`Unsupported action type: ${action.type}`);
  }
};

// 초기 상태
const initialApiState = {
  data: null,
  isLoading: true,
  error: null,
};

const useApi = (call, params = null) => {
  const [state, dispatch] = useReducer(apiReducer, initialApiState);

  useEffect(() => {
    const fetchData = async (params) => {
      dispatch({ type: 'FETCH_INIT' });

      try {
        const response = await call(params);
        if (response === false) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        dispatch({ type: 'FETCH_SUCCESS', payload: response });
      } catch (error) {
        dispatch({ type: 'FETCH_ERROR', payload: error.message });
      }
    };

    fetchData(params);
  }, [call, params]);

  return state;
};

export default useApi;
