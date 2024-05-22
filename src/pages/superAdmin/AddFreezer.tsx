import { AddFreezerForm } from "Components/superAdmin/AddFreezerForm";
import { MainLayout } from "UI/MainLayout";

export const AddFreezer = () => {
  return (
    <MainLayout>
      <div className="w-full h-full flex flex-col gap-3">
        <span className="text-2xl font-bold">Add Freezer</span>
        <AddFreezerForm />
      </div>
    </MainLayout>
  );
};
