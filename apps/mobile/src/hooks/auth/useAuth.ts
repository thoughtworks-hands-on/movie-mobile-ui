import { useCallback, useEffect, useReducer, useMemo } from 'react';
import { secureKeyValueStore } from '@catalyst/storage';
import type { AuthMethods, UseAuthHookOutput } from './types';

import { AuthActionTypes } from '../../reducers/auth/authActions';
import authReducer from '../../reducers/auth/authReducer';
import { useSpinnerContext } from '../../context/spinner/spinnerContext';

export default function useAuth(): UseAuthHookOutput {
  const [authState, dispatch] = useReducer(authReducer, {
    loading: true,
  });
  const { setLoadingFalse, setLoadingTrue } = useSpinnerContext();

  const bootstrapAsync = useCallback(async () => {
    try {
      const userToken = await secureKeyValueStore.getItem('accessToken');
      dispatch({ type: AuthActionTypes.RESTORE_TOKEN, token: userToken });
    } catch (e) {
      dispatch({ type: AuthActionTypes.LOG_OUT, token: null });
    }
  }, []);

  useEffect(() => {
    bootstrapAsync();
  }, [bootstrapAsync]);

  const logOut = () => {
    secureKeyValueStore.deleteItem('accessToken');
    dispatch({ type: AuthActionTypes.LOG_OUT, token: null });
  };

  const authMethods: AuthMethods = useMemo(
    () => ({
      logIn: async () => {
        try {
          setLoadingTrue();
          const accessToken =
            'eyJhbGciOiJIUzI1NiJ9.eyJVc2VybmFtZSI6Im1vdW50ZWJhbmt1c2VyIiwiZXhwIjozODY1MDQ0MzUzLCJpYXQiOjE2NTU5NjkxNTN9.TNATKPexdfrWv4v6nSFsb08Uinsqic03oQCHZ6VeASI';

          setLoadingFalse();
          secureKeyValueStore.setItem('accessToken', accessToken);
          dispatch({ type: AuthActionTypes.LOG_IN, token: accessToken });
        } catch (error) {
          setLoadingFalse();
          logOut();
        }
      },
      logOut,
    }),
    [setLoadingFalse, setLoadingTrue],
  );

  return {
    authState,
    authMethods,
  };
}
