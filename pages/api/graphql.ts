import getConfig from 'next/config';
import { GraphQLClient } from 'graphql-request';

const { serverRuntimeConfig } = getConfig();

const {
  BRANCH,
  GRAPHCMSURL,
  GRAPHCMSPROJECTID,
  GRAPHCMS_TOKEN,
} = serverRuntimeConfig.graphcms;

const graphqlEndpoint = `${GRAPHCMSURL}/${GRAPHCMSPROJECTID}/${BRANCH}`;

export const graphQLClient = new GraphQLClient(graphqlEndpoint, {
  headers: {
    authorization: `Bearer ${GRAPHCMS_TOKEN}`,
  },
});

async function proxyGraphql(req, res) {
  try {
    const { variables, query } = req.body;
    const data = await graphQLClient.rawRequest(query, variables);
    res.json(data);
  } catch (e) {
    res.json({ data: {}, errors: [{ message: e.message }] });
  }
}

export default proxyGraphql;
