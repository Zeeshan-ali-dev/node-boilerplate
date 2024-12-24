const formatResponse = (status = true, message = "", data = []) => {
  return {
    status,
    message,
    data,
  };
};

module.exports = {
  formatResponse,
};
