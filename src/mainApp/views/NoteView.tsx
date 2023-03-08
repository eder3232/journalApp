import React, { useMemo, useEffect } from 'react'

import { Grid, Typography, Button, TextField, IconButton } from '@mui/material'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined'
import DeleteIcon from '@mui/icons-material/Delete'

import ImageGallery from '../components/ImageGallery'

import {
  useAppDispatch,
  useAppSelector,
} from '../../shared/store/hooks/reduxHooks'

import { useFormik } from 'formik'
import * as yup from 'yup'

import moment from 'moment'
import 'moment/locale/es'

import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'

import { setActiveNote } from '../../shared/store/mainApp/mainAppSlice'
import {
  startDeleetingNote,
  startSaveNote,
  startUploadingFiles,
} from '../../shared/store/mainApp/thunks'

moment.locale('es')

const NoteFormSchema = yup.object().shape({
  title: yup.string().required('El título es requerido'),
  body: yup.string().required('El título es requerido'),
})

type Props = {}

const NoteView = (props: Props) => {
  const dispatch = useAppDispatch()

  const { active, messageSaved, isSaving } = useAppSelector(
    (state) => state.mainApp
  )
  if (!active) throw new Error('No hay nota activa')
  const { body, title, id, imageUrls, date } = active

  let validImageUrls: string[]
  if (imageUrls !== undefined) {
    validImageUrls = [...imageUrls]
  } else {
    validImageUrls = []
  }

  const dateString = useMemo(() => {
    return moment(date).calendar()
  }, [date])

  const formik = useFormik({
    initialValues: {
      title: title,
      body: body,
    },
    onSubmit: (values) => {
      dispatch(startSaveNote())
    },
    validationSchema: NoteFormSchema,
    enableReinitialize: true,
  })

  const { body: formikBody, title: formikTitle } = formik.values

  useEffect(() => {
    dispatch(
      setActiveNote({
        ...active,
        title: formik.values.title,
        body: formik.values.body,
      })
    )
  }, [formikBody, formikTitle])

  useEffect(() => {
    if (messageSaved.length > 0) {
      Swal.fire('Guardado!', messageSaved, 'success')
    }
  }, [messageSaved])

  const onFileInputChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    if (!target.files) throw new Error('No hay archivos')
    if (target.files.length === 0) throw new Error('No hay archivos')
    dispatch(startUploadingFiles(target.files))
  }

  const onDelete = () => {
    dispatch(startDeleetingNote())
  }

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        sx={{ mb: 1 }}
      >
        <Grid item>
          <Typography>{dateString}</Typography>
        </Grid>

        <Grid item>
          <IconButton color="primary" disabled={isSaving} component="label">
            <input type="file" multiple onChange={onFileInputChange} hidden />
            <CloudUploadIcon sx={{ mx: 1 }} />
            <Typography>Subir Imagen</Typography>
          </IconButton>
        </Grid>

        <Grid item>
          <Button color="primary" type="submit" disabled={isSaving}>
            <SaveOutlinedIcon sx={{ fontSize: 30, mr: 1 }} />
            Guardar
          </Button>
        </Grid>

        <Grid container>
          <TextField
            type="text"
            variant="filled"
            fullWidth
            placeholder="Ingrese un título"
            label="Título"
            sx={{ border: 'none', mb: 1 }}
            {...formik.getFieldProps('title')}
            // name="title"
            // value={formik.values.title}
            // onChange={(e) => {
            //   formik.handleChange(e)
            //   dispatch(setActiveNote({ ...active, title: e.target.value }))
            // }}
            // onBlur={formik.handleBlur}
          />

          <TextField
            type="text"
            variant="filled"
            fullWidth
            multiline
            placeholder="Que hay que hacer?"
            minRows={5}
            {...formik.getFieldProps('body')}
            // name="body"
            // value={formik.values.body}
            // onChange={(e) => {
            //   formik.handleChange
            //   dispatch(setActiveNote({ ...active, body: e.target.value }))
            // }}
            // onBlur={formik.handleBlur}
          />
        </Grid>
        <Grid container justifyContent="end">
          <IconButton onClick={onDelete} sx={{ mt: 2 }}>
            <DeleteIcon />
            <Typography>Borrar</Typography>
          </IconButton>
        </Grid>

        {/* Galeria de imagenes */}
        <ImageGallery imageUrls={validImageUrls} />
      </Grid>
    </form>
  )
}

export default NoteView
