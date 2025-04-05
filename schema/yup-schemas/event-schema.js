const yup = require("yup");

const schema = yup.object().shape({
    title: yup.string().required("Title is required"),
    venue: yup.string().required("Venue is required"),
    time: yup.string().required("required"),
    dates: yup.array()
        .min(1)
        .required('Event dates are required')
        .of(yup.date())
});

module.exports = { schema };