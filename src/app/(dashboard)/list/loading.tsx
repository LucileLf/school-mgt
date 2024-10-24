"use client"

import { Oval } from 'react-loader-spinner';

const Loading =  () => {

    return (
        <div className="w-full h-full flex items-center justify-center">
          <Oval color="#00BFFF" height={50} width={50} />
        </div>
    )
}

export default Loading
