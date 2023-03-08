export const fileUpload = async (file: File) => {
  const cloudUrl = 'https://api.cloudinary.com/v1_1/eder3232/image/upload'

  const formData = new FormData()

  formData.append('upload_preset', 'react-journal')
  formData.append('file', file)

  try {
    const resp = await fetch(cloudUrl, { method: 'POST', body: formData })
    if (!resp.ok) throw new Error('Could not upload file')

    const cloudResp = await resp.json()
    return cloudResp.secure_url
  } catch (error) {
    if (typeof error === 'string') {
      throw new Error(error)
    } else if (error instanceof Error) {
      throw error
    }
  }
}
