import { AddStudyForm } from "Components/superAdmin/AddStudyForm";
import { MainLayout } from "UI/MainLayout";

export const AddStudy = () => {
  return (
    <MainLayout>
      <div className="w-full h-full flex flex-col gap-3">
        <div className="text-2xl font-bold">Add Study</div>
        <AddStudyForm />
      </div>
    </MainLayout>
  );
};
