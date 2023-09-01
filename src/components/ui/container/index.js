function PageContainer({ children }) {
    return (
        <div className='grid grid-cols-12 '>
            {children}
        </div>
    )
}

export default PageContainer
