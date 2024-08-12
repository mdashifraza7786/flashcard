"use client"
import React from 'react';
import { Bars } from 'react-loader-spinner';

export default function Loading() {

    return (
        <div className='w-full h-screen absolute top-0 left-0 z-50'>
            <div className='flex justify-center items-center h-full'>
                <Bars height="100" width="100" color="#ffffff" ariaLabel="bars-loading" />
            </div>
        </div>
    )
}