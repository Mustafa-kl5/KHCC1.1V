import { Loading } from "Components/Shared/Loading";
import { NoDataFound } from "Components/Shared/NoDataFound";
import { FreezerCard } from "Components/superAdmin/FreezerCard";
import { MainLayout } from "UI/MainLayout";
import { ScrollableContainer } from "UI/ScrollableContainer";
import { useData } from "hooks/useData";
import { getFreezers } from "services/superAdmin";
import { iFreezerlist } from "types/freezer";

export const Freezers = () => {
  const {
    data,
    isLoading,
    fetchData,
  }: {
    data: iFreezerlist;
    isLoading: any;
    fetchData: any;
  } = useData(getFreezers);
  return (
    <MainLayout>
      <div className="w-full h-full flex flex-col gap-3">
        <span className="text-2xl font-bold">Freezers :</span>
        {isLoading ? (
          <Loading />
        ) : (data?.freezers.length ?? 0) === 0 ? (
          <NoDataFound />
        ) : (
          <ScrollableContainer>
            {data.freezers.map((freezer: any) => {
              return (
                <FreezerCard
                  key={freezer._id}
                  freezer={freezer}
                  reloadData={fetchData}
                />
              );
            })}
          </ScrollableContainer>
        )}
      </div>
    </MainLayout>
  );
};
