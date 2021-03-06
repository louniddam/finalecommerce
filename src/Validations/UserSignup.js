import * as yup from 'yup'

export const userSignupSchema = yup.object().shape({
    name: yup.string().min(4).max(10).required(),
    email: yup.string().email().required(),
    pwd: yup.string().min(4).max(10).required(),
    img: yup.string().required(),
})