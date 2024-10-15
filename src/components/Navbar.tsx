import { UserButton } from "@clerk/nextjs"
import { currentUser } from "@clerk/nextjs/server"
import Image from "next/image"

const Navbar = async () => {
  const user = await currentUser()
  const role = user?.publicMetadata.role as string
  
  return (
    <div className="flex items-center justify-between p-4">

      {/* SEARCHBAR */}
      <div className="hidden md:flex items-center gap-2 text-xs rounded-full ring-[1.5px] ring-gray-300 px-2">
        <Image src="/search.png" alt="search icon" width={14} height={14}/>
        <input type="text" placeholder="Search..." className="w-[200px] p-2 bg-transparent outline-none text-sm"/>
      </div>

      {/* ICONS AND USER */}
      <div className="flex items-center gap-6 justify-end w-full">
        <div className="bg-white rounded-full w-7 h-7 flex items-center justify-center cursor-pointer">
            <Image src="/message.png" alt="message icon" width={20} height={20}/>
        </div>
        <div className="bg-white rounded-full w-7 h-7 flex items-center justify-center cursor-pointer relative">
            <Image src="/announcement.png" alt="announcement icon" width={22} height={22}/>
            <div className="absolute -top-3 -right-3 w-5 h-5 flex items-center justify-center rounded-full bg-purple-500  text-white text-xs">1</div>
        </div>
        <div className="flex flex-col">
          <span className="text-xs leading-3 font-medium">Name</span>
          <span className="text-[10px] text-gray-500 text-right">{user?.publicMetadata.role as string}</span>
        </div>
        <UserButton/>
        {/* <Image src="/avatar.png" alt="profile picture" width={36} height={36} className="rounded-full"/> */}
      </div>

    </div>
  )
}

export default Navbar
