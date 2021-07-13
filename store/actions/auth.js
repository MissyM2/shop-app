export const SIGNUP = 'SIGNUP';
export const LOGIN = 'LOGIN';

export const signup = (email, password) => {
  return async dispatch => {
    const response = await fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBpYuHf-bsOCgbk7fgkwGTCzZ0kSV289PY',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true
        })
      }
    );

    if (!response.ok) {
        const errorResData = await response.json();
        const errorId = errorResData.error.message;
        let message = 'Something went wrong!';

        if (errorId === 'EMAIL_EXISTS') {
            message = 'Email exists already!';

        } else if (errorId === 'INVALID_PASSWORD') {
            message = 'This password could not be found!';
        } 
        throw new Error(message);
      }

    const resData = await response.json();
    console.log(resData);
    dispatch({ type: SIGNUP, token: resData.idToken, userId: resData.localId });
  };
};

export const login = (email, password) => {
    return async dispatch => {
      const response = await fetch(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBpYuHf-bsOCgbk7fgkwGTCzZ0kSV289PY',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: email,
            password: password,
            returnSecureToken: true
          })
        }
      ); 

      if (!response.ok) {
        const errorResData = await response.json();
        const errorId = errorResData.error.message;
        let message = 'Something went wrong!';

        if (errorId === 'EMAIL_NOT_FOUND') {
            message = 'This email address could not be found!';

        } else if (errorId === 'INVALID_PASSWORD') {
            message = 'This password could not be found!';
        } 
        throw new Error(message);
      }
  
      const resData = await response.json();
      console.log(resData);
      dispatch({ type: LOGIN, token: resData.idToken, userId: resData.localId });
    };
  };