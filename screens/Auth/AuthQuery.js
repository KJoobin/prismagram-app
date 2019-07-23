import { gql } from 'apollo-boost';

export const LOG_IN = gql`
  mutation requestSecret($email: String!) {
    requestSecret(email: $email)
  }
`;

export const CONFIRM_SECRET = gql`
  mutation confirmSecret($email: String!, $secret: String!) {
    confirmSecret(email:$email, secret:$secret)
  }
`;

export const EMAIL_OVERLAP = gql`
  query isOverlap($email: String!) {
    isOverlap(email:$email)
  }
`;

export const CREATE_ACCOUNT = gql`
  mutation createAccount($email: String!, $username: String!, $firstName: String!, $bio: String!) {
      createAccount(email: $email,username: $username,firstName: $firstName,bio: $bio)
    }
`;
