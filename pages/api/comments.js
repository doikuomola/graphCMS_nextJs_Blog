import { GraphQLClient, gql } from "graphql-request";

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHICS_ENDPOINT;

export default async function comments(req, res) {
  const { name, email, comment, slug } = req.body;

  const graphcms_token = process.env.GRAPHCMS_TOKEN;

  const graphQLClient = new GraphQLClient(graphqlAPI, {
    headers: {
      authorization: `Bearer ${graphcms_token}`,
    },
  });

  const query = gql`
    mutation createComment(
      $name: String!
      $email: String!
      $comment: String!
      $slug: String!
    ) {
      createComment(
        data: {
          name: $name
          email: $email
          comment: $comment
          post: { connect: { slug: $slug } }
        }
      ) {
        id
      }
    }
  `;

  try {
    const result = await graphQLClient.request(query, {
      name,
      email,
      comment,
      slug,
    });
    return res.status(200).send(result);
  } catch (error) {
    console.log(error);
  }
}
