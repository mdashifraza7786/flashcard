"use client"
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { useState } from "react";

const Header = () => {


    return (
        <div className="sticky top-0 left-0">
            <div className="flex items-center justify-end px-10 h-[5rem] w-full border-b-2 border-[#212121]">
                <div className="py-5 cursor-pointer">
                    <FaUserCircle className="text-[40px]" />
                </div>
            </div>
        </div>
    );
};

export default Header;
