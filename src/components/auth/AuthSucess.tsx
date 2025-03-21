
// // import { useEffect } from 'react';
// // import { useNavigate } from 'react-router-dom';

// // const AuthSuccess = () => {
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     const params = new URLSearchParams(window.location.search);
// //     const token = params.get('token');

// //     if (token) {
// //       localStorage.setItem('token', token);

// //       // Send token to main window
// //       window.opener?.postMessage({ token }, window.origin);
      
// //       setTimeout(() => window.close(), 500); // Ensure popup closes

// //     } else {
// //       navigate('/login'); // Redirect if authentication failed
// //     }
// //   }, [navigate]);

// //   return <p>Authenticating...</p>;
// // };

// // export default AuthSuccess;
// // src/pages/AuthSuccess.tsx
// import { useEffect } from 'react';
// import { useSearchParams } from 'react-router-dom';

// const AuthSuccess = () => {
//   const [searchParams] = useSearchParams();
  
//   useEffect(() => {
//     const token = searchParams.get('token');
//     const error = searchParams.get('error');

//     if (token) {
//       window.opener.postMessage({ token }, window.location.origin);
//       window.close();
//     }

//     if (error) {
//       window.opener.postMessage({ error }, window.location.origin);
//       window.close();
//     }
//   }, []);

//   return <div>Closing window...</div>;
// };

// export default AuthSuccess;
// import { useEffect } from 'react';

// const AuthSuccess = () => {
//   useEffect(() => {
//     const params = new URLSearchParams(window.location.search);
//     const token = params.get('token');

//     if (token) {
//       localStorage.setItem('token', token);

//       // Send token to main window
//       window.opener?.postMessage({ token }, window.opener?.location.origin);

//       setTimeout(() => window.close(), 500); // Safe way to close popup
//     } else {
//       window.close(); // Close even if login fails
//     }
//   }, []);

//   return <p>Authenticating...</p>;
// };

// export default AuthSuccess;

// src/pages/AuthSuccess.tsx
import { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

const AuthSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get('token');
    const error = searchParams.get('error');
    const isNewUser = searchParams.get('newUser');

    if (token) {
      localStorage.setItem('token', token);

      if (isNewUser === "true") {
        navigate('/onboarding');
      } else {
        navigate('/dashboard');
      }
    } else if (error) {
      console.error("Authentication error:", error);
      navigate('/signup');
    }
  }, [searchParams, navigate]);
  //   if (window.opener) {
  //     if (token) {
  //       window.opener.postMessage({ token }, window.location.origin);
  //     }
  //     if (error) {
  //       window.opener.postMessage({ error }, window.location.origin);
  //     }
  //     window.close();
  //   }
  // }, [searchParams]);

  return <div>Completing authentication...</div>;
};

export default AuthSuccess;
// import { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// const AuthSuccess = () => {
//   const navigate = useNavigate();

//   useEffect(() => {
//     const urlParams = new URLSearchParams(window.location.search);
//     const token = urlParams.get('token');
//     const isNewUser = urlParams.get('newUser') === 'true';
//     const error = urlParams.get('error');

//     if (token) {
//       localStorage.setItem('token', token);
//       navigate(isNewUser ? '/onboarding' : '/dashboard');
//     }
//   }, []);

//   return <div>Authenticating...</div>;
// };

// export default AuthSuccess;
