// async function handleLogin() {
//     setLoginStatus("Signing in...")
//     if (formInputs.username === "" || formInputs.password === "") {
//       setLoginStatus("username or password is empty!")
//       return
//     } else {
//       const options = {
//         method: 'POST',
//         headers: {
//           'Accept': 'application/json',
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(formInputs)
//       }
//       await fetch(API_URL+'/auth', options)
//       .then(res => res.json())
//       .then(data => {
//         if('_doc' in data) {
//           setLoginId(data['_doc']['_id'])
//           setPrevLogin(data['_doc']['_id'])
//         }
//         setLoginStatus(data.status)
//       })
//     }
//   }

//   export default handleLogin;

import Cookies from "js-cookie";
import { base64Encode } from "~/utils/scripting";

const API_URL : string = import.meta.env.VITE_SERVER_LINK;

type FormInputs = {
  username: string;
  password: string;
};

type LoginResponse = {
  status: string;
  _doc?: {
    _id: string;
  };
};

async function handleLogin(
  formInputs: FormInputs,
  setLoginInfo: (loginInfo: Object) => void,
) {
  Cookies.remove('t000')

  if (!formInputs.username || !formInputs.password) {
    setLoginInfo((prev: Object) => {return {...prev, status:'400', statusMessage: 'username or password is empty!'}});
    return;
  }
  



  const options: RequestInit = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formInputs),
  };

  setLoginInfo((prev: Object) => {return {...prev, status:'102', statusMessage: 'Signing In...'}});
  const res = await fetch(`${API_URL}/auth`, options);
  const data: LoginResponse = await res.json();

  console.log(data)
  if (data._doc) {
    Cookies.set('t000', base64Encode(JSON.stringify({_id: data._doc._id, username: data._doc._id, status:'200', statusMessage: 'logged In'})))
    setLoginInfo((prev: Object) => {return {...prev, status:'200', statusMessage: 'logged In'}});
  } else {
    setLoginInfo((prev: Object) => {return {...prev, status:'500', statusMessage: data.status || 'something went wrong!'}});
    Cookies.remove('t000')
  }

}
export default handleLogin;
