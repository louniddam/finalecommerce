import * as yup from 'yup'

export const modifyEmailSchema = yup.object().shape({
    email: yup.string().email().required(),
})