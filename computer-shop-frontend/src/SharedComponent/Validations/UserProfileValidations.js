import * as yup from "yup";

const validationSchema = yup.object({

    password: yup
      .string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
        "Hasło musi zawierać minimum 8 znaków, w tym małą i wielką literę cyfrę i znak specjalny"
      )
      .max(40, 'Hasło nie może być dłuższe niż 40 znaków')
      .required('Hasło jest wymagane'),

      confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Hasła muszą być takie same')
      .required('Potwierdź swoje hasło'),

  });

  export default validationSchema;
