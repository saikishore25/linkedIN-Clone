import {useNavigate} from 'react-router'
import {auth, googleProvider, signInWithPopup} from '../../config/firebase'
import GoogleButton from './GoogleButton'
import {FirebaseError} from 'firebase/app'
import {toast} from 'react-toastify'

export default function OAuth(){

	const navigate = useNavigate()

	const signInWithGoogleHandler = async () => {
		
        try{

			const result = await signInWithPopup(auth, googleProvider)
			const user = result?.user
			console.log(result, user)
			navigate('/')
		} 
        
        catch(error: unknown){

			const firebaseError = error as FirebaseError
			const errorMessage = firebaseError?.message
			toast.error(errorMessage || 'Something went wrong with the registration')
		}

	}

	return <GoogleButton onClick={signInWithGoogleHandler} />
}
