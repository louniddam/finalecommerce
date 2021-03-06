import * as yup from 'yup'

export const userSigninSchema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(4).max(10).required(),
})