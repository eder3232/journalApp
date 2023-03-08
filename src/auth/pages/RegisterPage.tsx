import React, { useMemo } from 'react'
import {
  Alert,
  Box,
  Button,
  Grid,
  Link,
  TextField,
  Typography,
} from '@mui/material'
import AuthLayout from '../layout/AuthLayout'
import { Link as RouterLink } from 'react-router-dom'
import { useFormik } from 'formik'
import * as yup from 'yup'
import {
  useAppDispatch,
  useAppSelector,
} from '../../shared/store/hooks/reduxHooks'
import { startCreatingUserWithEmailPassword } from '../../shared/store/auth/thunks'

const LoginFormSchema = yup.object().shape({
  name: yup
    .string()
    .min(6, 'El nombre debe tener al menos 6 caracteres.')
    .max(50, 'El nombre debe tener máximo 50 caracteres.')
    .required('El nombre es requerido'),
  email: yup
    .string()
    .email('Ingresa un email válido')
    .required('El email es requerido.'),
  password: yup
    .string()
    .min(6, 'Debe tener al menos 6 caracteres.')
    .max(50, 'Debe tener máximo 50 caracteres.')
    .required('La contraseña es requerida'),
  password2: yup
    .string()
    .oneOf([yup.ref('password')], 'Las contraseñas deben ser las mismas.')
    .required('Vuelve a ingresar la contraseña'),
})

type Props = {}

const RegisterPage = (props: Props) => {
  const dispatch = useAppDispatch()
  const { status, errorMessage } = useAppSelector((state) => state.auth)

  const isAuthenticating = useMemo(() => status === 'checking', [status])

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      password2: '',
    },
    onSubmit: (values) => {
      if (!formik.isValid) return
      if (!!isAuthenticating) return

      dispatch(
        startCreatingUserWithEmailPassword({
          email: values.email,
          password: values.password,
          displayName: values.name,
        })
      )
    },
    validationSchema: LoginFormSchema,
  })
  return (
    <AuthLayout>
      <form onSubmit={formik.handleSubmit}>
        <Grid container gap={2} p={2}>
          <Grid item xs={12}>
            <Typography variant="h4" sx={{ mb: 1 }}>
              Crear cuenta
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Nombre completo"
              type="text"
              placeholder="Nombre completo"
              fullWidth
              {...formik.getFieldProps('name')}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.errors.name}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Correo"
              type="email"
              placeholder="Correo"
              fullWidth
              {...formik.getFieldProps('email')}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.errors.email}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Contraseña"
              type="password"
              placeholder="Contraseña"
              fullWidth
              {...formik.getFieldProps('password')}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.errors.password}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Escribe tu contraseña otra vez"
              type="password"
              placeholder="Escribe tu contraseña otra vez"
              fullWidth
              {...formik.getFieldProps('password2')}
              error={
                formik.touched.password2 && Boolean(formik.errors.password2)
              }
              helperText={formik.errors.password2}
            />
          </Grid>

          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={12} display={!!errorMessage ? '' : 'none'}>
                <Alert severity="error">{errorMessage}</Alert>
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  disabled={!formik.isValid || isAuthenticating}
                >
                  Registrarse
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Link component={RouterLink} color="inherit" to="/auth/login">
                  ¿Ya tienes una cuenta? Ingresa aquí
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  )
}

export default RegisterPage
