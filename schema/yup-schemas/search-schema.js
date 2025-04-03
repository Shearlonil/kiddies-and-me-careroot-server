const yup = require("yup");

const schema = yup.object().shape({
    idOffset: yup.number().required('offset is required'),
    limit: yup.number().required('limit is required'),
});

module.exports = schema;