import { useState } from 'react';
import ReactMapGL, {Marker, Popup} from 'react-map-gl';
import  getCenter from 'geolib/es/getCenter';

function Map({searchResults}) {

   const [selectedLocation, setSelectionLocation] = useState({});

    const coordinates = searchResults.map(result => ({
        longitude: result.long,
        latitude: result.lat,
    }))

   const center = getCenter(coordinates);
   const [viewport, setViewport] = useState({
    width: '100%',
    height: '100%',
    latitude: center.latitude,
    longitude: center.longitude,
    zoom: 11
})

    return(
        <ReactMapGL
        mapStyle="mapbox://styles/theolaak/ckvku18od0ngl15nw179xz19a"
        mapboxApiAccessToken={process.env.mapbox_key}
        {...viewport}
        onViewportChange = {(nextViewport) => setViewport(nextViewport)} 
        >
            {searchResults?.map(result =>(
                <div key={result.long}>
                    <Marker
                    longitude={result.long}
                    latitude={result.lat}
                    offsetLeft={-20}
                    offsetTop={-10}
                    >
                        <p 
                        role="img"
                        onClick={() => setSelectionLocation(result)} 
                        className="cursor-pointer text-2xl animate-bounce"
                        aria-label="push-pin"
                        >
                         @   
                        </p>
                    </Marker>
                    {selectedLocation.long === result.long ? (
                         <Popup
                         onClose={()=> setSelectionLocation({})}
                         closeOnClick={true}
                         latitude={result.lat}
                         longitude={result.long}
                         >
                             {result.title}
                         </Popup>
                    ):(
                        false
                    )}
                </div>
            ))}
        </ReactMapGL>
    )
}

export default Map;