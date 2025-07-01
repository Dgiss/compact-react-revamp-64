
import { Amplify } from 'aws-amplify';

const awsConfig = {
  aws_project_region: "eu-west-3",
  aws_cloud_logic_custom: [
    {
      name: "AdminQueries",
      endpoint: "https://j49tvrfjf1.execute-api.eu-west-3.amazonaws.com/fwatcher",
      region: "eu-west-3"
    }
  ],
  aws_appsync_graphqlEndpoint: "https://77e55jvfordw5c6tb5bmh6loiq.appsync-api.eu-west-3.amazonaws.com/graphql",
  aws_appsync_region: "eu-west-3",
  aws_appsync_authenticationType: "AMAZON_COGNITO_USER_POOLS",
  aws_appsync_apiKey: "da2-madtpj74mjallnjpbhca7owzym",
  aws_cognito_identity_pool_id: "eu-west-3:5fdebe79-865b-40ec-8de0-f0b04dbbae29",
  aws_cognito_region: "eu-west-3",
  aws_user_pools_id: "eu-west-3_K0BoxUFkS",
  aws_user_pools_web_client_id: "1bg4vbumtfgjmro8n65ce4c859",
  oauth: {},
  aws_cognito_username_attributes: [],
  aws_cognito_social_providers: [],
  aws_cognito_signup_attributes: [],
  aws_cognito_mfa_configuration: "OFF",
  aws_cognito_mfa_types: ["SMS"],
  aws_cognito_password_protection_settings: {
    passwordPolicyMinLength: 8,
    passwordPolicyCharacters: []
  },
  aws_cognito_verification_mechanisms: ["PHONE_NUMBER"]
};

export const configureAmplify = () => {
  Amplify.configure(awsConfig);
};

export default awsConfig;
