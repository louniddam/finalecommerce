import * as yup from 'yup'

export const modifyImageSchema = yup.object().shape({
    image: yup.string().required(),
})