import React from 'react';
import {MapContainer, Marker, Popup, TileLayer} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import {IAddressWarehouse} from 'interfaces/address';

interface IModalMapProps {
    warehouse: IAddressWarehouse,
}

const ModalMap: React.FC<IModalMapProps> = ({warehouse}) => {
    const center = { lat: warehouse.latitude, lng: warehouse.longitude };
    const zoom = 13;

    return (
        <MapContainer center={center} zoom={zoom} scrollWheelZoom={true} style={{ height: '400px', width: '100%' }}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={center}>
                <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
            </Marker>
        </MapContainer>
    );
};


export default ModalMap;