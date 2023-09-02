
function LeftSideContainer({ children }) {
    return (
        <>
            <div className='col-span-4 py-3 pl-2 pr-5 space-y-3 overflow-scroll bg-gray-200 max-h-[100vh] container-overflow'>
                {children}
            </div>
        </>
    )
}

export default LeftSideContainer
