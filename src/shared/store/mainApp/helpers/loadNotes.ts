import { collection, getDocs } from 'firebase/firestore/lite'
import { INote } from '../../../../mainApp/types/types'
import { firebaseDB } from '../../../firebase/config'
export const loadNotes = async (uid: string) => {
  if (!uid) throw new Error('uid is required')
  const collectionRef = collection(firebaseDB, `${uid}/journal/notes`)
  const docs = await getDocs(collectionRef)

  const notes: INote[] = []

  docs.forEach((doc) => {
    // console.log(doc.data())
    notes.push({ id: doc.id, ...(doc.data() as INote) })
  })

  return notes
}
