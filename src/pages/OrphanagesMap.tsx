import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPlus, FiArrowRight} from 'react-icons/fi';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import Leaflet from 'leaflet';
import happyIcon from '../components/Map/happMapIcon'
import { getUser, setUserSession, removeUserSession, getToken } from "../services/auth";

import 'leaflet/dist/leaflet.css';
import MapMarkerImg from '../assets/map-marker.svg';
import '../styles/pages/orphanages-map.css';
import api from '../services/api';

interface Orphanage {
    id: number;
    latitude: number;
    longitude: number;
    name: string;

}

export default function OrphanagesMap() {
    const history = useHistory();
    const [ orphanages, setOrphanages ] = useState<Orphanage[]>([]);

    const token = getToken();
    const user = getUser();
    // console.log(user)

    useEffect(() => {
        api.get('orphanages').then(response => {
            setOrphanages(response.data);
        })
    },[]);

    const createOrphNav = () => {    
       setUserSession(token, user);   
       history.push('/orphanages/create'); 
     }  

    //  const orphNav = () => {    
    //     setUserSession(token, user);   
    //     history.push('/orphanages/........'); 
    //   } 


    const handleLogout = () => {    
        removeUserSession();
        // localStorage.removeItem('token');
        history.push('/');
      }  
    
    return (
        <div id="page-map">
            <aside>
                <header>
                    <img src={MapMarkerImg} alt="Happy"/>
                    <h1> Hello {user.name}!</h1>  
                    <h2>Choose an orphanage in the map.</h2>
                    <p>Many kids are waiting for your visit :)</p>
                </header>

                <footer>
                    <strong>Baln. Camboriu</strong>
                    <span>Santa Catarina</span>

                    <button onClick={handleLogout}>Logout</button>
                </footer>
            </aside>

         
            <MapContainer center={[-26.9951682,-48.6294723]} 
                          zoom={15} 
                          style={{width: '100%', height:'100%'}}>
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
            {orphanages.map(orphanage => {
                return (
                    <Marker 
                        key={orphanage.id}
                        icon={happyIcon}
                        position={[orphanage.latitude, orphanage.longitude]}                        
                    >
                        <Popup closeButton={false} minWidth={200} maxWidth={200} className="map-popup">
                            {orphanage.name}    
                            <Link to={`/orphanages/${orphanage.id}`}>
                                <FiArrowRight size={20} color="#FFF"/>
                            </Link>                      
                        </Popup>
                    </Marker>
                )

            })}
            </MapContainer>                 

            <button onClick={createOrphNav} className="create-orphanage">
                <FiPlus size={32} color="#FFF"/>
                
            </button>
        </div>
    )
}

