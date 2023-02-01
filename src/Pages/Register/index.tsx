import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile,
  User,
} from "firebase/auth";

import Input from "../../Components/Input";
import { registerSchema } from "../../schema";
import { UserSignUpData } from "../../types/sign.type";
import { addDocument } from "../../utils/connectFirebase";
import { toast } from "react-toastify";

const Register = () => {
  const auth = getAuth();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    resolver: yupResolver(registerSchema),
  });

  //register new user by email
  const handleRegister = async (data: UserSignUpData) => {
    await createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        //update userinfo
        updateProfile(auth.currentUser as User, {
          displayName: data.username,
        });

        //add userinfo to collection
        addDocument("user", {
          displayName: data.username,
          email: userCredential.user.email,
          uid: userCredential.user.uid,
        });
        toast("Đăng ký thành công");
      })
      .catch((error) => {
        // check error
        switch (error.message) {
          case "Firebase: Error (auth/email-already-in-use).":
            toast.warning("Tài khoản đã tồn tại.");
            break;
          default:
            toast.error("Đã có lỗi xảy ra!");
        }
      });
  };

  const submitData = (data: UserSignUpData) => {
    handleRegister(data);
    reset();
  };

  return (
    <div className="flex justify-between">
      <div className="lg:w-2/5 px-4 py-10">
        <img
          className="w-32 mt-12"
          src="https://www.gapo.vn/assets/images/logo%20gapo.svg"
          alt=""
        />
        <h1 className="text-black text-4xl font-bold mt-24 mb-10">
          Cùng trở thành Gapoer!
        </h1>
        <form onSubmit={handleSubmit(submitData as any)} className="w-full">
          <Input
            type="text"
            placeholder="Tên người dùng"
            field="username"
            register={register}
            message={errors.username?.message}
          />
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
          <Input
            type="password"
            placeholder="Nhập lại mật khẩu"
            field="confirmPassword"
            register={register}
            message={errors.confirmPassword?.message}
          />
          <input
            className="w-full px-5 py-3 bg-[#84C044] rounded-lg text-white font-semibold text-lg hover:cursor-pointer mt-3"
            type="submit"
            value="Đăng ký"
          />
        </form>
        <div className="text-center mt-10 text-base font-semibold">
          Bạn đã có tài khoản?{" "}
          <Link className="text-blue-600" to="/login">
            Đăng nhập
          </Link>
        </div>
      </div>
      <div className="lg:w-3/5">
        <img
          className="w-full object-cover"
          src="https://www.gapo.vn/assets/images/right-cover.jpg"
          alt="login-banner"
        />
      </div>
    </div>
  );
};

export default Register;
