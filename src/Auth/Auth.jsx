const Authorize = async (setUser) => {
  try {
    const response = await fetch("http://localhost:9999/home/user/me", {
      credentials: "include",
    });
    const data = await response.json();
    if (!data.errors) {
      setUser(data);
    }
  } catch (error) {
    console.log(error);
  }
};

export default Authorize;
