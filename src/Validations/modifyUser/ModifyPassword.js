import * as yup from 'yup'

export const modifyPasswordSchema = yup.object().shape({
    password: yup.string().min(4).max(10).required(),
})