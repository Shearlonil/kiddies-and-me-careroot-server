const yup = require("yup");

const schema = yup.object().shape({
    f_name: yup.string().required("First Name is required"),
    l_name: yup.string().required("Last Name is required"),
    no_attending: yup.number().typeError('Must be a number').positive("Must be greater than 0").required("required"),
    city: yup.string().required("City is required"),
    province: yup.string().required("State/Province is required"),
    zip: yup.number().typeError('Zip must be a number').positive("Must be greater than 0").required("required"),
    phone_no: yup.string()
        .matches(/^\d{10,11}$/, "Invalid phone number")
        .required("Phone number is required"),
    address: yup.string().required("Address is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    locations: yup.array().typeError('Please select a location').min(1, "Please select a location").of(yup.string().required('A location is required')).required('A location is required'),
});

module.exports = { schema };