// import Links from './stores/links';
// import Link from './stores/link';
// import User from './stores/user';
// import Tags from './stores/tags';
//
// export default {
//   links: Links,
//   link: Link,
//   user: User,
//   tags: Tags
// };

var apiConfig = require("./config/api");

export default {
  links: {
    url: (params) => {
      if (params && typeof params.id === "number") {
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
