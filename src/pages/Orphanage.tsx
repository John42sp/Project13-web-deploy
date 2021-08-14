import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaWhatsapp } from "react-icons/fa";
import { FiClock, FiInfo } from "react-icons/fi";
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
// import { getUser, setUserSession, removeUserSession, getToken } from "../services/auth";

import mapMarkerImg from '../assets/map-marker.svg';
import downloadingCloud from '../../src/assets/downloadingCloud.gif';
import loadingCircle from '../../src/assets/loadingCircle.gif';

import happyMapIcon from '../components/Map/happMapIcon'
import PrimaryButton from "../components/PrimaryButton";
import Sidebar from "../components/SideBar";
// import Map from "../components/Map";
import api from '../services/api';


import '../styles/pages/orphanage.css';
import OrphanagesMap from './OrphanagesMap';

// const token = getToken();
// const dev = getUser();

interface Orphanage {
  latitude: number;
  longitude: number;
  name: string;
  about: string;
  instructions: string;
  opening_hours: string;
  opened_on_weekends: string;
  images: Array<{
    id: number;
    url: string;
  }>;
  videos: Array<{
    id: number;
    url: string;
  }>;
  user_id: number;
}

interface OrphanageParams {
  id: string;   //id deve ser string, não tem como guardar na url se nao for string
}

export default function Orphanage() {

  const params = useParams<OrphanageParams>();
  const [ orphanage, setOrphanage ] = useState<Orphanage>();
  const [ activeImageIndex, setActiveImageIndex ] = useState(0);
  const [ activeVideoIndex, setActiveVideoIndex ] = useState(0);

  useEffect(() => {
      api.get(`orphanages/${params.id}`).then(response => {
          setOrphanage(response.data);
      })
  },[params.id]);


  if(!orphanage){
    // return <p className="loading">loading...just a sec.</p>
    return <img 
              style={{marginLeft: '35%', marginTop: '30%', width: '30%' }} 
              src={downloadingCloud}
            />
  }

  return (       
    <div id="page-orphanage">
       {/* {isLoggedIn ? <button>Logout</button> : <button>Login</button>} */}
    
    <Sidebar/>
    <main>
      <div className="orphanage-details">
        <h1>{orphanage.name}</h1>   

        <h3>Galeria de fotos:</h3>
        {(!orphanage.images) ? (
          <img style={{marginLeft: '35%', marginTop: '30%', width: '30%' }}  src={loadingCircle} />
          ) :
        (
        <img src={orphanage.images[activeImageIndex].url} alt={orphanage.name} />
        )}
        <p>* Selecione imagem para display. *</p>
        <div className="images">
            {orphanage.images.map((image, index) => {
              return (
                <button 
                  key={image.id} 
                  className={activeImageIndex === index ? "active" : ''} 
                  type="button"
                  onClick={() => {
                    setActiveImageIndex(index);
                  }}
                  >                    
                <img src={image.url} alt={orphanage.name} />
          
               </button>
                )       
            })}
        </div>
        
    
        <h3>Galeria de videos:</h3>
        {!orphanage.videos ? ( 
           <img style={{marginLeft: '35%', marginTop: '30%', width: '30%' }}  src={loadingCircle} />
         ) : (
          <video src={orphanage.videos[activeVideoIndex].url} controls />
         )}
        <p>* Selecione video para play. *</p>
        <div className="videos">
            {orphanage.videos.map((video, index) => {
              return (
                <button 
                  key={video.id} 
                  className={activeVideoIndex === index ? "active" : ''} 
                  type="button"
                  onClick={() => {
                    setActiveVideoIndex(index);
                  }}
                  >                    
                <video src={video.url} />
                </button>
                )       
            })}
        </div>
        
        <div className="orphanage-details-content">
        <h2>Sobre o {orphanage.name}</h2>
          <p>{orphanage.about}</p>

          <div className="map-container">
          <MapContainer center={[orphanage.latitude, orphanage.longitude]} 
                        zoom={15} 
                        style={{width: '100%', height: 280}}>
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
                  <Marker 
                      icon={happyMapIcon}
                      position={[orphanage.latitude, orphanage.longitude]}>
     
                  </Marker>
          </MapContainer>  

            <footer>
              <a target="_blank"  rel="noopener noreferrer" href={`https://www.google.com/maps/dir/?api=1&destination=${orphanage.latitude},${orphanage.longitude}`}>Ver rotas no Google Maps</a>
            </footer>
          </div>

          <hr />

          <h2>Instruções para visita</h2>
          <p>{orphanage.instructions}</p>

          <div className="open-details">
            <div className="hour">
              <FiClock size={32} color="#15B6D6" />
            Segunda a Sexta <br />
            {orphanage.opening_hours}
            </div>

          {orphanage.opened_on_weekends ? (
                <div className="open-on-weekends">
                <FiInfo size={32} color="#39CC83" />
                Atendemos <br />
                fim de semana
              </div> )
              :  (            
               <div className="open-on-weekends dont-open" >
              <FiInfo size={32} color="#FF669D" />
              Não atendemos <br />
                fim de semana
            </div>)}

          </div>

          <PrimaryButton type="button">
            <FaWhatsapp size={30} color="#FFF" />
            Entrar em contato
          </PrimaryButton>
        </div>
        
      </div>
    </main>

    </div>
  );
}
