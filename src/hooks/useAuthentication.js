import { useDispatch } from "react-redux";
import { updateTokens, updateUserInfo, clear } from "../store/slices/userSlice";
import { Amplify, Auth } from "aws-amplify";
import awsmobile from "../aws-exports";

Amplify.configure(awsmobile);

const useAuthentication = () => {
  const dispatch = useDispatch();

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
      return;
    } catch (error) {
      console.log("error sign up: ", error);
    }
  };

  const confirmSignUp = async (username, code) => {
    try {
      await Auth.confirmSignUp(username, code);
      return;
    } catch (error) {
      console.log("error confirming sign up: ", error);
    }
  };

  const signIn = async (username, password) => {
    try {
      const user = await Auth.signIn(username, password);
      const tokens = {
        idToken: user.signInUserSession.idToken.jwtToken,
        accessToken: user.signInUserSession.accessToken.jwtToken,
        refreshToken: user.signInUserSession.refreshToken.token,
      };
      dispatch(updateUserInfo(user.attributes));
      dispatch(updateTokens(tokens));
      return;
    } catch (error) {
      console.log("error sign in: ", error);
    }
  };

  const signOut = async () => {
    try {
      await Auth.signOut();
      return;
    } catch (error) {
      console.log("error signing out: ", error);
    }
  };

  const refresh = async () => {
    let result;
    try {
      result = await Auth.currentSession();
    } catch (error) {
      // no auth token.
      dispatch(clear());
      return;
    }
    if (result) {
      const tokens = {
        idToken: result.getIdToken()?.getJwtToken(),
        accessToken: result.getAccessToken()?.getJwtToken(),
        refreshtToken: result.getRefreshToken()?.getToken(),
      };
      dispatch(updateTokens(tokens));
    }
  };

  const startUp = async () => {
    const getUserAttributes = async () => {
      let user;
      try {
        user = await Auth.currentAuthenticatedUser();
      } catch (error) {
        // no user.
        dispatch(clear());
        return;
      }
      if (user) {
        dispatch(updateUserInfo(user.attributes));
      }
      return;
    };
    const refreshPromise = refresh();
    const getUserAttributesPromise = getUserAttributes();
    await Promise.all([refreshPromise, getUserAttributesPromise]);
  };

  return {
    signUp,
    confirmSignUp,
    signIn,
    signOut,
    refresh,
    startUp,
  };
};

export default useAuthentication;
