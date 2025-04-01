import Map from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import GeocoderControl from "./geocoder-control";
import React from "react";
import { Landmark } from "lucide-react";
import { useAppStore } from "@/store/store";

// const TOKEN =
//   "pk.eyJ1Ijoia29vbGtpc2hhbiIsImEiOiJjazV3Zm41cG8wa3I1M2tydnVkcW53b2ZpIn0.mYrXogbdTrWSoJECNR1epg";

const PlaceLocation = () => {
  const { setMapData, setLocationData } = useAppStore();
  const getResult = ({ result }) => {
    const [longitude, latitude] = result?.geometry?.coordinates;

    const data = {
      landmark: result?.text,
      neighborhood: "",
      postcode: "",
      locality: "",
      place: "",
      district: "",
      country: "",
    };

    result?.context?.forEach((item) => {
      Object.keys(data)?.forEach((key) => {
        if (item?.id?.startsWith(key + ".")) {
          data[key] = item?.text;
        }
      });
    });

    setMapData({ longitude, latitude });
    setLocationData({ ...data });
  };
  return (
    <div className="flex flex-col items-center justify-center h-full gap-5 ">
      <h2 className="font-semibold text-4xl">
        Which of these best describe your place?
      </h2>
      <p>
        Your address is only shared with guests after they've made a
        reservation.
      </p>
      <div className="h-[400px] w-[700px]">
        <Map
          initialViewState={{
            longitude: -79.4512,
            latitude: 43.6568,
            zoom: 13,
          }}
          mapStyle="mapbox://styles/mapbox/streets-v9"
          mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
        >
          <GeocoderControl
            mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
            position="top-left"
            marker={true}
            onLoading={() => {}}
            onResults={() => {}}
            onResult={getResult}
            onError={() => {}}
          />
        </Map>
      </div>
    </div>
  );
};

export default PlaceLocation;
