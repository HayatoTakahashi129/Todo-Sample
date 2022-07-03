import { Amplify, Auth } from "aws-amplify";
import awsmobile from "../aws-exports";

Amplify.configure(awsmobile);

const useAuthentication = () => {
  const signUp = async (email, nickname, password) => {
    try {
      const { user } = await Auth.signUp({
        username: email,
        password,
        attributes: {
          "custom:nickname": nickname,
        },
      });
      console.log(user);
    } catch (error) {
      console.log("error sign up: ", error);
    }
  };

  const confirmSignUp = async (username, code) => {
    try {
      await Auth.confirmSignUp(username, code);
    } catch (error) {
      console.log("error confirming sign up: ", error);
    }
  };

  const signIn = async (username, password) => {
    try {
      const user = await Auth.signIn(username, password);
      console.log("user: ", user);
    } catch (error) {
      console.log("error sign in: ", error);
    }
  };

  const signOut = async () => {
    try {
      await Auth.signOut();
    } catch (error) {
      console.log("error signing out: ", error);
    }
  };

  return {
    signUp,
    confirmSignUp,
    signIn,
    signOut,
  };
};

export default useAuthentication;
