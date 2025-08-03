import { useEffect, useState } from 'react'
import Post from './Post'
import PostInput from './PostInput'
import FlipMove from 'react-flip-move'
import { PostResponseType } from '../../types'
import {collection, getDocs, limit, onSnapshot, orderBy, query} from 'firebase/firestore'
import { db } from '../../config/firebase'
import { mockPosts } from '../../lib/mockData'

const Feed = ()=>{

	const [_loading, setLoading] = useState(true)
	const [posts, setPosts] = useState<PostResponseType[] | []>([])

	useEffect(() => {

		const postsQuery = query(

			collection(db, 'posts'),
			orderBy('timestamp', 'desc'),
			limit(2),
		)

		const unsubscribe = onSnapshot(postsQuery, (querySnapshot) => {
			const updatedPosts = querySnapshot.docs.map((doc) => ({
				id: doc.id,
				...doc.data(),
			})) as PostResponseType[]

			setPosts(updatedPosts) 
		})

		setLoading(false)

		return () => unsubscribe()
	}, [])

	return (
		<div className="flex-1  shadow-lg  flex flex-col   mb-52 ">
			<PostInput />

			<FlipMove>
				{posts.map((post, index) => (
					<Post
						key={post.id || `${Math.random()}-${index}`}
						post={post}
						index={index}
						isAllowAction
					/>
				))}
			</FlipMove>

			
		</div>
	)
}


export default Feed