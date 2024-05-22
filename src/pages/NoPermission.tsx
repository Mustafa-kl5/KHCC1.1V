import { MainLayout } from "UI/MainLayout"

export const NoPermission = () => {
    return (
        <MainLayout>
            <div className="w-full h-full flex justify-center items-center">
                <span className="text-xl">Try to contact super admin to give you privileges</span>
            </div>
        </MainLayout>
    )
}
