import { Header } from "Components/Header/Header";

export const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col w-full h-screen gap-3 bg-hussein-100 p-4">
      <Header />
      <div className="bg-hussein-200 w-full justify-between rounded-xl h-full">
        <div className="w-full h-full flex justify-center items-center">
          {children}
        </div>
      </div>
    </div>
  );
};
