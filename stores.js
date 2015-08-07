var apiConfig = require("./config/api");

export default {
  links: {
    url: (params) => {
      if (params && typeof params.id === "string") {
        return `${apiConfig.url}/api/links/${params.id}`;
      } else {
        return `${apiConfig.url}/api/links`;
      }
    }
  },
  tags: {
    url: () => {
      return `${apiConfig.url}/api/tags`;
    }
  },
  users: {
    url: () => {
      return `${apiConfig.url}/api/user`;
    }
  }
};
