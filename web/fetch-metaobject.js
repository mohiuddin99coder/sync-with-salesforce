import { GraphqlQueryError } from "@shopify/shopify-api";
import shopify from "./shopify.js";

const CREATE_METAOBJECT_QUERY = `
  query {
      metaobjects(type: "salesforcecredential", first: 1,reverse:true, sortKey: "updated_at") {
        edges {
          node {
            id
            fields {
              key
              value
            }
          }
        }
      }
    }
`;

export default async function getMetaobject(session) {

  const client = new shopify.api.clients.Graphql({ session });

  try {
    const metaobject = await client.query({
        data: {
          query: CREATE_METAOBJECT_QUERY
        },
      });
      return metaobject;
  } catch (error) {
    if (error instanceof GraphqlQueryError) {
      throw new Error(
        `${error.message}\n${JSON.stringify(error.response, null, 2)}`
      );
    } else {
      throw error;
    }
  }
}

