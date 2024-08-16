import { FormikConfig, FormikValues, useFormik } from 'formik';

export const useForm = <Values extends FormikValues = FormikValues>(data: FormikConfig<Values>) => {
  const formik = useFormik(data);

  const { values, handleChange, handleBlur, errors, touched } = formik;

  const isError = (name: keyof Values) => touched[name] && Boolean(errors[name]);

  const helperText = (name: keyof Values) =>
    touched[name] && errors[name] ? (errors[name] as string) : undefined;

  const register = <T = unknown>(name: keyof Values) => ({
    id: name,
    name,
    value: values[name] as T,
    onChange: handleChange,
    onBlur: handleBlur,
    helperText: helperText(name),
  });

  return {
    ...formik,
    isError,
    helperText,
    register,
  };
};
