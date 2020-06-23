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
  BACKEND_URL,
  GRAPHCMS_TOKEN,
  CDNBASE,
  APIURL,
  APIKEY,
} = process.env;

module.exports = {
  publicRuntimeConfig: {
    backend: { BACKEND_URL },
    graphcms: {
      GRAPHCMSPROJECTID,
      BRANCH,
      CDNBASE,
      APIURL,
      APIKEY,
    },
  },
  serverRuntimeConfig: {
    graphcms: {
      BRANCH,
      GRAPHCMSURL,
      GRAPHCMSPROJECTID,
      GRAPHCMS_TOKEN,
    },
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
