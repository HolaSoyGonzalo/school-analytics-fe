export const postClass = (e, description) => {
  return async (dispatch) => {
    let formData = new FormData();
    formData.append("PostImage", e);
    try {
      const res = await fetch(
        "https://school-analytics.herokuapp.com/admin/class",
        {
          method: "POST",
          headers: { Accept: "application/json" },
          credentials: "include",
          body: formData,
          description,
        }
      );
      if (res.ok) {
        const singleClass = await res.json();
        dispatch({
          type: "POST_CLASS",
          payload: singleClass,
        });
        dispatch(getClass());
      }
    } catch (error) {
      dispatch({
        type: "GET_POSTCLASS_ERROR",
        payload: error.message,
      });
    }
  };
};

export const getClass = () => {
  return async (dispatch) => {
    try {
      const res = await fetch(
        "https://school-analytics.herokuapp.com/admin/class",
        {
          method: "GET",
          credentials: "include",
        }
      );
      const allClasses = await res.json();
      if (allClasses) {
        dispatch({
          type: "GET_CLASS",
          payload: allClasses,
        });
      }
    } catch (error) {
      dispatch({
        type: "CLASS_ERROR",
        payload: error.message,
      });
    }
  };
};

export const getClassById = (id) => {
  return async (dispatch) => {
    try {
      const res = await fetch(
        "https://school-analytics.herokuapp.com/admin/class/" + id,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const singleClass = await res.json();
      if (singleClass) {
        dispatch({
          type: "GET_CLASS",
          payload: singleClass,
        });
      }
    } catch (error) {
      dispatch({
        type: "CLASS_ERROR",
        payload: error.message,
      });
    }
  };
};
