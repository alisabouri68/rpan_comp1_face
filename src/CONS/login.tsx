import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { loginApi as request } from "RACT/RACT_request";
import { toast } from "react-toastify";
import AbsMan from "RACT/RACT_absMan";

import banner from "Asset/images/banner.png";
import logo from "Asset/images/logo-light.png";
import emailLogo from "Asset/images/email-logo.png";
import passLogo from "Asset/images/pass-logo.png";

function Login() {
  const isAuth = AbsMan.useAppSelector((state) => state.hyb.isAuth);

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth) navigate("/view/smartLab/welcome", { flushSync: true });
  }, [isAuth]);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate: (values: any) => {
      const errors: any = {};
      if (!values.email) errors.email = "Email is required";
      if (!values.password) errors.password = "Password is required";

      return errors;
    },
    onSubmit: (values: any) => {
      request
        .post("/login", values)
        .then(({ data }) => {
          window.localStorage.setItem("access_token", data?.object?.token);
          toast.success(data?.message);
          navigate("/view/smartLab/welcome", { flushSync: true });
        })
        .catch((error) => toast.error(error?.response?.data?.message));
    },
  });

  return (
    <div className="flex h-auto">
      <div className="w-1/2 relative">
        <div className="relative text-right">
          <img src={banner} className="h-screen w-full" />
          <div className="absolute text-2xl font-bold text-white top-1/3 left-1/3 flex items-center">
            <img src={logo} className="h-12 mr-3" />
            <div className="flex flex-col items-start">
              <span className="">Smart-Comp</span>
              <span>MONODASH</span>
            </div>
          </div>
          <span className="absolute text-2xl font-bold text-white top-2/4 left-1/2 -translate-x-1/2">
            WELCOME TO MONODASH
          </span>
        </div>
      </div>
      <div className="w-1/2 flex justify-center items-center">
        <form className="flex flex-col w-2/4" onSubmit={formik.handleSubmit}>
          <span className="font-bold text-2xl mb-8">Login</span>
          <div className="relative mb-4">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <img
                src={emailLogo}
                className="w-6 h-5 text-gray-500 dark:text-gray-400"
              />
            </div>
            <input
              type="text"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              className={
                "text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 " +
                (formik.errors.email
                  ? "border border-red-400 text-gray-900"
                  : "border border-gray-300 text-gray-900")
              }
              placeholder="Email"
            />
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <img
                src={passLogo}
                className="w-6 h-5 text-gray-500 dark:text-gray-400"
              />
            </div>
            <input
              type="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              className={
                "text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 " +
                (formik.errors.password
                  ? "border border-red-400 text-gray-900"
                  : "border border-gray-300 text-gray-900")
              }
              placeholder="Password"
            />
          </div>
          <span className="text-slate-400 cursor-pointer mt-1 mb-6 text-sm">
            Forget Password?
          </span>
          <label className="my-2">
            <input type="checkbox" checked className="rounded-md" />
            <span className="pl-1">Remember me?</span>
          </label>
          <button
            type="submit"
            className="bg-cyan-600 text-white py-4 text-xl rounded-lg cursor-pointer"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
