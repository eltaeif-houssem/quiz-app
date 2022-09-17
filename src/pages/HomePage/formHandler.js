const formHandler = (category, difficulty, limit, setSnack) => {
  if (!category || !difficulty || !limit) {
    setSnack({
      open: true,
      severity: "warning",
      message: "All fields are required!",
    });
    return false;
  }
  return true;
};

export default formHandler;
