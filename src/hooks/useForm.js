import { useState } from 'react';

const useForm = (initialValues, validate) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });

    if (validate) {
      setErrors({
        ...errors,
        [name]: validate(name, value),
      });
    }
  };

  const handleSubmit = (onSubmit) => (e) => {
    e.preventDefault();
    const newErrors = Object.keys(values).reduce((acc, key) => {
      const error = validate ? validate(key, values[key]) : null;
      if (error) acc[key] = error;
      return acc;
    }, {});

    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      onSubmit(values);
    }
  };

  return {
    values,
    errors,
    handleChange,
    handleSubmit,
  };
};

export default useForm;
