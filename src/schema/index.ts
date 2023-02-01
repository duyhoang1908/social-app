import * as Yup from 'yup';

export const loginSchema = Yup.object().shape({
    email: Yup.string().required("Không được bỏ trống").email("Email không chính xác"),
    password: Yup.string().required("Không được bỏ trống")
})

export const registerSchema = Yup.object().shape({
    username: Yup.string().required("Không được bỏ trống"),
    email: Yup.string().required("Không được bỏ trống").email("Email không chính xác"),
    password: Yup.string().required("Không được bỏ trống"),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Mật khẩu không khớp'),
})