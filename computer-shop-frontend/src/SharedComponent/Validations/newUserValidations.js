import * as yup from "yup";

const validationSchema = yup.object({
    email: yup
      .string()
      .email('Wprowadź poprawny adres email')
      .required('Adres email jest wymagany'),
      
    password: yup
      .string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
        "Hasło musi zawierać minimum 8 znaków, w tym małą i wielką literę cyfrę i znak specjalny"
      )
      .max(40, 'Hasło nie może być dłuższe niż 40 znaków')
      .required('Hasło jest wymagane'),

      confirmpassword: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Hasła muszą być takie same')
      .required('Potwierdź swoje hasło'),

      name: yup
      .string()
      .matches(/^[A-Za-z ]*$/, 'Wprowadź poprawne imie')
      .max(40, 'Imie nie może być dłuższe niż 40 znaków')
      .required('Imie jest wymagane'),

      surname: yup
      .string()
      .matches(/^[A-Za-z ]*$/, 'Wprowadź poprawne nazwisko')
      .max(60, 'Nazwisko nie może być dłuższe niż 60 znaków')
      .required('Nazwisko jest wymagane'),

      login: yup
      .string()
      .max(25, 'Login nie może być dłuższy niż 25 znaków')
      .required('Login jest wymagany'),

      address: yup
      .string()
      .max(120, 'Adres nie może być dłuższy niż 120 znaków'),

      housenumber: yup
      .string()
      .max(20, 'Numer domu nie może być dłuższy niż 20 znaków'),

      postalCode: yup
      .string()
      .max(20, 'Kod pocztowy nie może być dłuższy niż 20 znaków'),
  });

  export default validationSchema;
