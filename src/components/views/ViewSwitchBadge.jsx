import { useAppStore } from "@/store/store";
import { Map, List } from "lucide-react";

const ViewSwitchBadge = () => {
  const { isMapView, setIsMapView } = useAppStore();
  return (
    <div
      className="fixed flex justify-center items-center bottom-16 left-0 right-0 cursor-pointer"
      onClick={() => setIsMapView()}
    >
      <div className="bg-black p-4 text-white rounded-full">
        <span className="flex items-center gap-2 text-sm">
          {!isMapView ? (
            <>
              Show Map <Map />
            </>
          ) : (
            <>
              {" "}
              Show List <List />
            </>
          )}
        </span>
      </div>
    </div>
  );
};

export default ViewSwitchBadge;
