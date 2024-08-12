import Link from "next/link"

const SideBar = () => {
    return (
        <div className="py-5 px-4 flex flex-col gap-10 sticky top-0 left-0 ">
            <div>
                <h1 className="text-2xl uppercase font-bold text-center">
                    <span className="text-[#E90074]">EAZY</span> <span className="text-white">LEARN</span>
                </h1>
            </div>
            <nav>
                <ul className="flex gap-5 flex-col">
                    <Link href={"/user"} className="text-white bg-supporting rounded-lg hover:bg-gray-800"><li className="py-2 px-5 ">User Side</li></Link>
                    <Link href={"/admin"} className="text-white bg-supporting rounded-lg hover:bg-gray-800"><li className="py-2 px-5 ">Admin Side</li></Link>
                </ul>
            </nav>
        </div>
    )
}

export default SideBar