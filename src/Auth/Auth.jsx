// const authorize = async (setUser) => {
//   try {
//     const response = await fetch("http://localhost:9999/home/user/me", {
//       credentials: "include",
//     });
//     const data = await response.json();
//     if (!data.errors) {
//       setUser(data);
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };
import useState from "react";
import backend from "./index";

const Authorize = async (props) => {
  try {
    if (props.match.params.id === "me") {
      const result = await backend.get("/home/user/me");
      console.log("-----------------------", result);
      props.loginUser(result.data);
    } else {
      const result = await backend.get(`/home/user/${props.match.params.id}`);
      console.log("-----------------------", result);
      props.loginUser(result.data);
    }
  } catch (error) {
    console.log(error);
  }
};

export default Authorize;
