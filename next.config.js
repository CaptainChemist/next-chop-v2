require('dotenv').config();
const { BRANCH, GRAPHCMSURL, GRAPHCMSPROJECTID } = process.env;

module.exports = {
  publicRuntimeConfig: {
    graphcms: {
      BRANCH,
      GRAPHCMSURL,
      GRAPHCMSPROJECTID,
    },
  },
};
