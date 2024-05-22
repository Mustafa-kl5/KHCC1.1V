import NoDataImage from "assets/Images/No-data-cuate.png"
export const NoDataFound = () => {
    return (
        <div className='w-full h-full flex flex-col gap-4 items-center justify-center'>
            <img src={NoDataImage} alt="no data found" className=" w-1/2 h-1/2 object-cover" />
            <span className='text-2xl font-bold underline'>No Data Found</span>
        </div>
    )
}
