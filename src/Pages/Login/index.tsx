import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { loginSchema } from "../../schema";
import Input from "../../Components/Input";
import { UserSignInData } from "../../types/sign.type";

const Login = () => {
  const auth = getAuth();
  const history = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    resolver: yupResolver(loginSchema),
  });

  //login
  const handleLogin = async (data: UserSignInData) => {
    await signInWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        const userData = {
          uid: userCredential.user.uid,
          displayName: userCredential.user.displayName,
          email: userCredential.user.email,
        };

        //save user info to localStorage
        localStorage.setItem("user", JSON.stringify(userData));

        //navigate to home page
        history("/");
      })
      .catch((error) => {
        // check error
        switch (error.message) {
          case "Firebase: Error (auth/wrong-password).":
            toast.warning("Tài khoản hoặc mật khẩu không chính xác");
            break;
          case "Firebase: Error (auth/user-not-found).":
            toast.warning("Người dùng không tồn tại!");
            break;
          default:
            toast.error("Đã có lỗi xảy ra!");
        }
      });
  };

  const submitData = (data: UserSignInData) => {
    handleLogin(data);
    reset();
  };

  return (
    <div className="flex flex-col lg:flex-row justify-between">
      <div className="lg:w-2/5 px-4 py-10 order-2 lg:order-1">
        <img
          className="w-32 mt-12"
          src="https://www.gapo.vn/assets/images/logo%20gapo.svg"
          alt=""
        />
        <h1 className="text-black text-4xl font-bold mt-24 mb-10">
          Xin chào Gapoer!
        </h1>
        <form onSubmit={handleSubmit(submitData as any)} className="w-full">
          <Input
            type="text"
            placeholder="Email"
            field="email"
            register={register}
            message={errors.email?.message}
          />
          <Input
            type="password"
            placeholder="Mật khẩu"
            field="password"
            register={register}
            message={errors.password?.message}
          />
          <input
            className="w-full px-5 py-3 bg-[#84C044] rounded-lg text-white font-semibold text-lg hover:cursor-pointer mt-3"
            type="submit"
            value="Đăng nhập"
          />
        </form>
        <div className="text-center mt-10 text-base font-semibold">
          Bạn chưa có tài khoản?{" "}
          <Link className="text-blue-600" to="/register">
            Đăng ký
          </Link>
        </div>
      </div>
      <div className="lg:w-3/5 order-1 lg:order-2">
        <img
          className="w-full max-h-80 lg:h-full object-cover"
          src="https://www.gapo.vn/assets/images/right-cover.jpg"
          alt="login-banner"
        />
      </div>
    </div>
  );
};

export default Login;
