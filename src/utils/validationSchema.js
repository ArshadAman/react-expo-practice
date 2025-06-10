import * as Yup from 'yup';

export const loginSchema = Yup.object().shape({
    email: Yup.string()
        .email("Please enter a valid email address")
        .required("Email is required"),
    password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password cannot be empty")
});

export const signupSchema = Yup.object().shape({
    fullname: Yup.string()
        .min(2, "Full name must be at least 2 characters")
        .required("Full name is required"),
    email: Yup.string()
        .email("Please enter a valid email address")
        .required("Email is required"),
    password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password cannot be empty"),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], "Passwords must match")
        .required("Confirm password is required")
});

