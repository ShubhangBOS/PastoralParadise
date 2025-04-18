import { AmenetiesType } from "@/data/Amenities";
import { useAppStore } from "@/store/store";

const ProcessAmeneties = () => {
  const { amenities, setAmenities } = useAppStore();

  const toggleAmenity = (id) => {
    const updated = [...amenities];
    updated[0] = {
      ...updated[0],
      [id]: !updated[0]?.[id],
    };
    setAmenities(updated);
  };
  
  return (
    <div className="flex items-center justify-center px-5 mt-10 md:mt-0">
      <div className="flex flex-col gap-3">
        <h2 className="font-semibold text-4xl ">
          Tell guests what your place has to offer
        </h2>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Error
          aspernatur voluptatibus ipsa doloremque praesentium quis.
        </p>
        <div className="flex flex-col gap-4 max-h-[60vh] overflow-auto scroll no-scrollbar">
          {AmenetiesType.map(({ type, data }) => (
            <div key={type} className="flex flex-col gap-5">
              {type === "advanced" && (
                <span className="text-lg font-medium">
                  Do you have any standout amenities?
                </span>
              )}
              {type === "safety" && (
                <span className="text-lg font-medium">
                  Do you have any safety items?
                </span>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                {data.map(({ name, svgPath, id }) => (
                  <button
                    key={id}
                    className={`flex flex-col justify-start font-semibold cursor-pointer border border-gray-300 rounded-md p-3 hover:border-gray-950 transition-all duration-300 ${
                      amenities[0]?.[id] && "border-gray-950 bg-slate-100"
                    }`}
                    onClick={() => toggleAmenity(id)}
                  >
                    {svgPath}{" "}
                    <span className="text-pastoral-light-black font-medium text-left">
                      {name}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProcessAmeneties;
