const authorise = async (setUser) => {
  try {
    const response = await fetch("http://localhost:9999/home/users/me", {
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

export { authorise };
