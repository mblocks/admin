import { useState, useCallback } from 'react';

function useLayoutModel() {
  const [data, setData] = useState({
    app: {},
    role: {},
    user: {},
    loading: true,
  });
  const setLayoutModel = useCallback((props) => {
    setData({
      app: props.app || {},
      role: props.role || {},
      user: props.user || {},
      loading: props.loading == false ? false : true,
    });
  }, []);
  return {
    ...data,
    setLayoutModel,
  };
}

export default useLayoutModel;
