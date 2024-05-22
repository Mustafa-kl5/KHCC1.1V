import { CircularProgress } from '@mui/material'

export const Loading = () => {
    return (
        <div className='w-full h-full flex justify-center items-center'>
            <CircularProgress />
        </div>
    )
}
