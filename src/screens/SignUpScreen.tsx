import { Link, useNavigate } from 'react-router-dom'
import { signupSchemaValidation } from '../utils'
import { yupResolver } from '@hookform/resolvers/yup'
import { AuthRequestType } from '../types'
import { SubmitHandler, useForm } from 'react-hook-form'
import Button from '../components/UI/Button'
import { SlArrowRight } from 'react-icons/sl'
import CustomInput from '../components/UI/CustomInput'
import { auth, createUserWithEmailAndPassword, updateProfile, db  } from '../config/firebase'
import {doc, setDoc}  from 'firebase/firestore'
import { FirebaseError } from 'firebase/app'
import OAuth from '../components/UI/OAuth'
import { toast } from 'react-toastify'

const SignUpScreen = () => {

	const navigate = useNavigate()

	const {register, handleSubmit, reset, formState: { errors }} = useForm<AuthRequestType>({
		resolver: yupResolver(signupSchemaValidation),
	})

	const signInWithEmailAndPasswordHandler: SubmitHandler<AuthRequestType> = async (data) => {

		console.log(JSON.stringify(data, null, 2))

		try{

			const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password)

            if(auth.currentUser){

                await updateProfile(auth.currentUser, {
                    displayName: data.name,
                    photoURL: data.imageUrl || 'https://img.freepik.com/premium-vector/businessman-avatar-cartoon-character-profile_18591-50581.jpg',
                });
            }
			const user = userCredential.user;

            await setDoc(doc(db, 'users', user.uid), {

                uid: user.uid,
                name: data.name,
                email: data.email,
                photoURL: data.imageUrl || 'https://img.freepik.com/premium-vector/businessman-avatar-cartoon-character-profile_18591-50581.jpg',
                createdAt: new Date()
            });

			console.log('Signed in', userCredential)

			toast.success('Sign up was successful')
			reset()
			navigate('/')

		} 
        
        catch(error: unknown){

			const firebaseError = error as FirebaseError
			console.error(firebaseError.message)
			toast.error(firebaseError.message || 'Something went wrong with the registration')
		}

	}

	return (

        <>
            <div className="text-base p-[5%] text-center">

                <div>
                    <img
                        className="w-[150px] md:w-[210px] mx-auto h-[150px] object-contain"
                        src="/images/LinkedIn-Logo.wine.png"
                        alt="logo"
                    />

                    <form
                        onSubmit={handleSubmit(signInWithEmailAndPasswordHandler)}
                        className="overflow-hidden rounded  bg-white shadow-lg max-w-xl mx-auto p-5 dark:bg-customBlack-700  dark:text-white mt-6 flex flex-col gap-8"
                        autoComplete="off"
                    >
                        <h3 className="text-3xl font-medium">Sign-Up</h3>

                        <CustomInput
                            label="Name"
                            type="text"
                            id="name"
                            register={register}
                            error={errors.name}
                        />

                        <CustomInput
                            label="Email"
                            type="email"
                            id="email"
                            register={register}
                            error={errors.email}
                        />

                        <CustomInput
                            label="Password"
                            type="password"
                            id="password"
                            register={register}
                            error={errors.password}
                        />

                        <CustomInput
                            label="Confirm Password"
                            type="password"
                            id="confirmPassword"
                            register={register}
                            error={errors.confirmPassword}
                        />

                        <CustomInput
                            label="Profile Image URL (optional)"
                            type="text"
                            id="imageUrl"
                            register={register}
                            error={errors.imageUrl}
                        />

                        <Button type="submit">
                            Agree & Join
                        </Button>

                        <div>
                            <p className="text-sm">
                                By clicking Agree & Join, you agree to the LinkedIn
                                <span className="text-customBlue-950 hover:underline transition dark:text-white">
                                    {' '}User Agreement{' '}
                                </span>
                                <span className="text-customBlue-950 hover:underline transition dark:text-white">
                                    Privacy Policy,{' '}
                                </span>
                                and{' '}
                                <span className="text-customBlue-950 hover:underline transition dark:text-white">
                                    Cookie Policy.
                                </span>
                            </p>

                            <div className="flex items-center mt-5 gap-4">
                                <div className="h-[1px] bg-gray-500 flex-grow"></div>
                                <p className=" text-gray-500 dark:text-white">Or</p>
                                <div className="h-[1px] bg-gray-500 flex-grow"></div>
                            </div>
                        </div>

                        <OAuth />

                        <p className="text-base flex items-center justify-center mt-2">
                            Already on LinkedIn?&nbsp;
                            <Link to={'/login'}>
                                <span className="text-customBlue-950 hover:underline transition dark:text-white font-bold">
                                    Sign-In
                                </span>
                            </Link>
                            <span className="cursor-pointer">
                                <SlArrowRight className="text-customBlue-950 hover:underline text-base transition dark:text-white font-bold ml-4 cursor-pointer" />
                            </span>
                        </p>
                    </form>
                </div>

            </div>
        </>
	)
}

export default SignUpScreen
