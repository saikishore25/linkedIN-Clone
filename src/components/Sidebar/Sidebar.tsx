import { useAuthState } from 'react-firebase-hooks/auth'
import { MdEvent } from 'react-icons/md'
import { HiOfficeBuilding } from 'react-icons/hi'
import { FiBell } from 'react-icons/fi'
import { BsPeople } from 'react-icons/bs'

import Avatar from '../UI/Avatar'
import Card from '../UI/Card'
import { auth } from '../../config/firebase'
import SidebarStar from './SidebarStar'
import SidebarHashtag from './SidebarHashtage'
import Activities from './Activities'
import { Link } from 'react-router'

export default function Sidebar() {
	const [user] = useAuthState(auth)

	return (
		<div className="flex-[0.3] min-w-[20rem] w-[20rem] max-w-[20rem] flex-col items-center pb-12 hidden lg:flex">
			<div id="fixed-position" className="fixed max-w-[30rem] min-w-[20rem] ">
				<>
					<div className="w-[20rem] flex flex-col space-y-4 overflow-hidden">
						<Link to="/profile">
							{/* User Profile Section */}
							<Card className="p-0 cursor-pointer">
								<figure className="flex flex-col items-center gap-2 p-4 rounded-xl shadow-md w-40 hover:shadow-lg transition-shadow duration-300">
  <img
    className="w-24 h-24 object-cover rounded-full border-2 border-indigo-500 shadow-sm cursor-pointer hover:scale-105 transition-transform duration-300"
    src="https://img.freepik.com/premium-vector/businessman-avatar-cartoon-character-profile_18591-50581.jpg"
    alt="Profile"
  />
  <figcaption className="text-center">
    <p className="text-sm font-semibold text-gray-700 dark:text-white">John Doe</p>
    <p className="text-xs text-gray-500 dark:text-gray-300">Software Engineer</p>
  </figcaption>
</figure>


								{/* <Avatar
									className="h-20 w-20 -mt-8 ml-7"
									url={user?.photoURL || 'https://img.freepik.com/premium-vector/businessman-avatar-cartoon-character-profile_18591-50581.jpg'}
									alt="profile image"
									isOffLine={false}
								/> */}

								<div>
									<div className="border-b dark:border-customBlack-600 p-4 py-3 flex flex-col space-y-1">
										<h2 className="text-base font-bold ">
											{user?.displayName}
										</h2>
										<h5 className="font-medium text-sm ">{user?.email}</h5>

										<p className="text-[13px]">A welcoming, friendly, and</p>
										<p className="text-[13px]">
											all-encompassing approach to enterprise software design!
										</p>
									</div>

									<div className="text-[12px] py-[5px]">
										<SidebarStar text="Who viewed your profile" />
										<SidebarStar text="Views of your post" />
									</div>
								</div>
							</Card>
						</Link>

						{/* Skills Section */}
						<Card className="text-[13px] flex flex-col p-0 py-1">
							<SidebarHashtag
								text="Skills"
								className="font-semibold text-customBlue-950 hover:bg-transparent cursor-none text-sm"
								showHashtag={false}
							/>
							<SidebarHashtag text="JavaScript" />
							<SidebarHashtag text="React" />
							<SidebarHashtag text="Node.js" />
							<SidebarHashtag text="Public Speaking" />
							<div className="text-center cursor-pointer hover:bg-customWhite-300 dark:hover:bg-customBlack-600 transition px-4 py-3 pt4 text-xs font-semibold dark:text-white border-t dark:border-customBlack-600 mt-2">
								Discover more
							</div>
						</Card>

						<Card className="flex flex-col space-y-4">
							<Activities text="Saved items" Icon={HiOfficeBuilding} />
							<Activities text="Groups" Icon={BsPeople} />
							<Activities text="Events" Icon={MdEvent} />
							<Activities text="Notifications" Icon={FiBell} />{' '}
						</Card>
					</div>
				</>
			</div>
		</div>
	)
}
