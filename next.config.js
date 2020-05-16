require('dotenv').config();
const {
  BRANCH,
  GRAPHCMSURL,
  GRAPHCMSPROJECTID,
  domain,
  clientId,
  clientSecret,
  scope,
  redirectUri,
  postLogoutRedirectUri,
  cookieSecret,
} = process.env;

module.exports = {
  publicRuntimeConfig: {
    graphcms: {
      BRANCH,
      GRAPHCMSURL,
      GRAPHCMSPROJECTID,
    },
  },
  serverRuntimeConfig: {
    auth: {
      domain,
      clientId,
      clientSecret,
      scope,
      redirectUri,
      postLogoutRedirectUri,
    },
    cookieSecret,
  },
};
