import React from 'react'

const Loader = () => {
    return (
        <div className='flex items-center justify-center h-screen flex-col gap-7'>
            <h2 data-text="Sijan..." className='loader__text'>Sijan...</h2>
            <p className='loader__subtext uppercase relative text-center text-3xl'>Software Engineer</p>
        </div>
    )
}

export default Loader