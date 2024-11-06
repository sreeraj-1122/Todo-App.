import React from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { baseUrl } from "../../baseUrl/baseUrl";
import toast from "react-hot-toast";
import axios from 'axios'
const Register = () => {
  const navigate=useNavigate()
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(3, 'Name must be at least 3 characters')
        .required('Name is required'),
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
    }),
    onSubmit: async(values) => {
      try {
        const response = await axios.post(`${baseUrl}/api/user/register`, values);
        const token = response.data.token;
        if (token) {
          localStorage.setItem('authToken', token);  
          toast.success('Registration successful!');
          console.log(response.data);
          navigate("/projects");
        } else {
          console.error('No token received.');
        }
      } catch (error) {
        toast.error(`Error: ${error.response?.data?.message || error.message}`);
        console.log(error);
      }
    },
  });

  return (
    <div className="flex flex-col w-full max-w-md px-4 py-8 bg-white rounded-lg shadow-2xl sm:px-6 md:px-8 lg:px-10 m-auto mt-24">
      <div className="self-center mb-6 text-xl font-medium text-gray-600 sm:text-2xl">
        Register
      </div>
      <div className="mt-8">
        <form onSubmit={formik.handleSubmit} autoComplete="off">
          <div className="flex flex-col mb-2">
            <div className="flex relative">
              <span className="rounded-l-md inline-flex items-center px-3 border-t bg-white border-l border-b border-gray-300 text-gray-500 shadow-sm text-sm">
                <svg
                  width="15"
                  height="15"
                  fill="currentColor"
                  viewBox="0 0 1024 1024"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M511.6 512c119 0 215.5-96.5 215.5-215.5S630.6 81 511.6 81 296.1 177.5 296.1 296.5 392.6 512 511.6 512zm0 60c-159.5 0-480 80-480 239.5v37c0 18.5 15 33.5 33.5 33.5h893c18.5 0 33.5-15 33.5-33.5v-37c0-159.5-320.5-239.5-480-239.5z" />
                </svg>
              </span>
              <input
                type="text"
                id="sign-in-name"
                name="name"
                className="rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                placeholder="name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
              />
            </div>
            {formik.touched.name && formik.errors.name ? (
              <div className="text-red-600 text-sm mt-1">{formik.errors.name}</div>
            ) : null}
          </div>

          <div className="flex flex-col mb-2">
            <div className="flex relative">
              <span className="rounded-l-md inline-flex items-center px-3 border-t bg-white border-l border-b border-gray-300 text-gray-500 shadow-sm text-sm">
                <svg
                  width="15"
                  height="15"
                  fill="currentColor"
                  viewBox="0 0 1792 1792"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M1792 710v794q0 66-47 113t-113 47h-1472q-66 0-113-47t-47-113v-794q44 49 101 87 362 246 497 345 57 42 92.5 65.5t94.5 48 110 24.5h2q51 0 110-24.5t94.5-48 92.5-65.5q170-123 498-345 57-39 100-87zm0-294q0 79-49 151t-122 123q-376 261-468 325-10 7-42.5 30.5t-54 38-52 32.5-57.5 27-50 9h-2q-23 0-50-9t-57.5-27-52-32.5-54-38-42.5-30.5q-91-64-262-182.5t-205-142.5q-62-42-117-115.5t-55-136.5q0-78 41.5-130t118.5-52h1472q65 0 112.5 47t47.5 113z" />
                </svg>
              </span>
              <input
                type="text"
                id="sign-in-email"
                name="email"
                className="rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                placeholder="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
            </div>
            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-600 text-sm mt-1">{formik.errors.email}</div>
            ) : null}
          </div>

          <div className="flex flex-col mb-6">
            <div className="flex relative">
              <span className="rounded-l-md inline-flex items-center px-3 border-t bg-white border-l border-b border-gray-300 text-gray-500 shadow-sm text-sm">
                <svg
                  width="15"
                  height="15"
                  fill="currentColor"
                  viewBox="0 0 1792 1792"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M1376 768q40 0 68 28t28 68v576q0 40-28 68t-68 28h-960q-40 0-68-28t-28-68v-576q0-40 28-68t68-28h32v-320q0-185 131.5-316.5t316.5-131.5 316.5 131.5 131.5 316.5q0 26-19 45t-45 19h-64q-26 0-45-19t-19-45q0-106-75-181t-181-75-181 75-75 181v320h736z" />
                </svg>
              </span>
              <input
                type="password"
                id="sign-in-password"
                name="password"
                className="rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                placeholder="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
            </div>
            {formik.touched.password && formik.errors.password ? (
              <div className="text-red-600 text-sm mt-1">{formik.errors.password}</div>
            ) : null}
          </div>

          <div className="flex w-full">
            <button
              type="submit"
              className="py-2 px-4 bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-purple-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
            >
              Register
            </button>
          </div>
        </form>
      </div>
      <div className="flex items-center justify-center mt-6">
        <Link
          to="/login"
          className="inline-flex items-center text-sm font-thin text-center text-gray-500 hover:text-gray-700"
        >
          <span className="ml-2">Already have an account?</span>
        </Link>
      </div>
    </div>
  );
};

export default Register;
