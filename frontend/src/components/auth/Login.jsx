import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import toast from "react-hot-toast";
import { baseUrl } from "../../baseUrl/baseUrl";

//  Yup validation schema
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});
const Login = () => {
  const navigate=useNavigate()

  const handleSubmit = async(values) => {
    try {
      const response = await axios.post(`${baseUrl}/user/login`, values);
      const token = response.data.token;
      if (token) {
        localStorage.setItem('authToken', token);  
        toast.success('Login successful!');
        console.log(response.data);
        navigate("/projects");
      } else {
        console.error('No token received.');
      }
    } catch (error) {
      toast.error(`Error: ${error.response?.data?.message || error.message}`);
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col w-full max-w-md px-4 py-8 bg-white rounded-lg shadow-2xl  sm:px-6 md:px-8 lg:px-10 m-auto mt-24 ">
      <div className="self-center mb-6 text-xl font-medium text-gray-600 sm:text-2xl ">
        Login
      </div>
      <div className="mt-8">


      <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form autoComplete="off">
              {/* Email Field */}
              <div className="flex flex-col mb-2">
                <div className="flex relative">
                  <span className="rounded-l-md inline-flex items-center px-3 border-t bg-white border-l border-b border-gray-300 text-gray-500 shadow-sm text-sm">
                    <svg width="15" height="15" fill="currentColor" viewBox="0 0 1792 1792">
                      <path d="M1792 710v794q0 66-47 113t-113 47h-1472q-66 0-113-47t-47-113v-794q44 49 101 87 362 246 497 345 57 42 92.5 65.5t94.5 48 110 24.5h2q51 0 110-24.5t94.5-48 92.5-65.5q170-123 498-345 57-39 100-87zm0-294q0 79-49 151t-122 123q-376 261-468 325-10 7-42.5 30.5t-54 38-52 32.5-57.5 27-50 9h-2q-23 0-50-9t-57.5-27-52-32.5-54-38-42.5-30.5q-91-64-262-182.5t-205-142.5q-62-42-117-115.5t-55-136.5q0-78 41.5-130t118.5-52h1472q65 0 112.5 47t47.5 113z" />
                    </svg>
                  </span>
                  <Field
                    type="text"
                    name="email"
                    className={`rounded-r-lg flex-1 appearance-none border w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent ${errors.email && touched.email ? "border-red-500" : "border-gray-300"}`}
                    placeholder="Your email"
                  />
                </div>
                <ErrorMessage name="email" component="p" className="text-red-500 text-sm" />
              </div>

              <div className="flex flex-col mb-6">
                <div className="flex relative">
                  <span className="rounded-l-md inline-flex items-center px-3 border-t bg-white border-l border-b border-gray-300 text-gray-500 shadow-sm text-sm">
                    <svg width="15" height="15" fill="currentColor" viewBox="0 0 1792 1792">
                      <path d="M1376 768q40 0 68 28t28 68v576q0 40-28 68t-68 28h-960q-40 0-68-28t-28-68v-576q0-40 28-68t68-28h32v-320q0-185 131.5-316.5t316.5-131.5 316.5 131.5 131.5 316.5q0 26-19 45t-45 19h-64q-26 0-45-19t-19-45q0-106-75-181t-181-75-181 75-75 181v320h736z" />
                    </svg>
                  </span>
                  <Field
                    type="password"
                    name="password"
                    className={`rounded-r-lg flex-1 appearance-none border w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent ${errors.password && touched.password ? "border-red-500" : "border-gray-300"}`}
                    placeholder="Your password"
                  />
                </div>
                <ErrorMessage name="password" component="p" className="text-red-500 text-sm " />
              </div>
              <div className="flex w-full">
                <button
                  type="submit"
                  className="py-2 px-4 bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-purple-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
                >
                  Login
                </button>
              </div>
            </Form>
          )}
        </Formik>
        </div>
      <div className="flex items-center justify-center mt-6">
        <Link
          to="/register"
          className="inline-flex items-center text-sm font-thin text-center text-gray-500 hover:text-gray-700"
        >
          <span className="ml-2">You don&#x27;t have an account?</span>
        </Link>
      </div>
    </div>
  );
};

export default Login;
