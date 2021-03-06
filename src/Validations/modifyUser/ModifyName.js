import * as yup from 'yup'

export const modifyNameSchema = yup.object().shape({
    name: yup.string().min(4).max(10).required(),
})