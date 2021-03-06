import * as yup from 'yup'

export const createProductSchema = yup.object().shape({
    name: yup.string().required(),
    title: yup.string().required(),
    description: yup.string().required(),
    image: yup.string().required(),
    price: yup.number().required(),
    quantity: yup.number().required(),
    category: yup.string().required()
})