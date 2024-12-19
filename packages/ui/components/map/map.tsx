import {
  GoogleMap,
  useLoadScript,
  MarkerF,
  InfoWindowF,
} from "@react-google-maps/api";
import { useEffect, useState } from "react";
import { getMapMarkerState } from "../../selectors/getMapMarkerState";
import { useRecoilValue } from "recoil";

export function Map() {
  const markers = useRecoilValue(getMapMarkerState);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyCNCTKyO1a8XFKWeBQLKhIhh0cw70lgUMQ",
  });

  const [activeMarker, setActiveMarker] = useState(null);

  const handleActiveMarker = (marker: any) => {
    if (marker === activeMarker) return;
    setActiveMarker(marker);
  };

  useEffect(() => {
    // console.log("markers.map", markers);
  }, [markers]);

  return (
    <div style={{ width: "100%", height: "45vh" }}>
      {isLoaded ? (
        <GoogleMap
          center={{ lat: 54.57780867115077, lng: -1.2354760049406657 }}
          zoom={11}
          onClick={() => {
            setActiveMarker(null);
          }}
          mapContainerStyle={{
            width: "100%",
            height: "100%",
          }}
        >
          {markers.map(({ id, name, position }) => {
            return (
              <MarkerF
                key={id}
                position={position}
                onClick={() => {
                  handleActiveMarker(id);
                }}
              >
                <div>
                  {activeMarker === id ? (
                    <InfoWindowF
                      onCloseClick={() => {
                        setActiveMarker(null);
                      }}
                    >
                      <div>
                        <p>{name}</p>
                      </div>
                    </InfoWindowF>
                  ) : null}
                  {name}
                </div>
              </MarkerF>
            );
          })}
        </GoogleMap>
      ) : null}
    </div>
  );
}
