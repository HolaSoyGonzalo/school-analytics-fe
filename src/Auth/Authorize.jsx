const Authorize = async (setUser) => {
  try {
    const response = await fetch(
      "https://school-o-be.herokuapp.com/home/user/me/",
      {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      }
    );
    const data = await response.json();
    console.log(data);
    setUser(data);
  } catch (error) {
    console.log(error);
  }
};

export default Authorize;
