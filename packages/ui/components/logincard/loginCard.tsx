import { useState } from "react";
import { BASE_URL, isLoggedIn } from "../../index";
import { useRecoilState } from "recoil";
import axios from "axios";

export function LoginCard() {
  // const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userState, setUserState] = useRecoilState(isLoggedIn);

  const handleLoginSubmit = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/admin/login`,
        { username: email, password: password },
        { headers: { "Content-type": "application/json" } }
      );
      //extract data from result
      const data = res.data;

      //set session token in local storage
      localStorage.setItem("token", data.token);

      setUserState({
        userEmail: email,
        isLoading: false,
      });
    } catch (e) {
      // console.log("login failed due to invalid credentials");
      // console.log(e);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-sky-600">
      <div className="flex flex-col items-center justify-center mx-auto md:h-screen">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-sky-800 dark:border-sky-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Login to your account
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={(e) => {
                e.preventDefault(); // prevent the default form submission behavior
                handleLoginSubmit();
              }}
            >
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Your Client ID
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="email"
                  placeholder="name@company.com"
                  required
                  onChange={(e: any) => setEmail(e.target.value)}
                  value={email}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-sky-700 dark:border-sky-600 dark:placeholder-sky-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  required
                  autoComplete="current-password"
                  onChange={(e: any) => setPassword(e.target.value)}
                  value={password}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-sky-700 dark:sky-gray-600 dark:placeholder-sky-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <div className="flex items-center justify-between"></div>
              <button
                type="submit"
                className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

// try {
//   const response = await fetch(`${BASE_URL}/api/login`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ email, password }),
//   });

//   if (response.ok) {
//     const { token } = await response.json();

//     // Store the token in localStorage
//     localStorage.setItem("token", token);

//     // Set the loggedIn state to true
//     setLoggedIn(true);

//     console.log("logged in successfully");

//     // Redirect to /tables
//     Router.push("/tables");
//   } else {
//     // Handle login failure
//     console.error("Login failed");
//   }
// } catch (error) {
//   console.error("Error during login:", error);
// }
