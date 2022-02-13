import { gql } from "@apollo/client";

export const getAll = gql`
  {
    getAll {
      title
      description
    }
  }
`;
