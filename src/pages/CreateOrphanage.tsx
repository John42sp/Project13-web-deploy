
import React, { useState, useEffect, FormEvent, ChangeEvent } from "react";
import { useMapEvents, Marker } from 'react-leaflet';
import { FiPlus, FiDelete, FiTrash2 } from 'react-icons/fi';

import loadingCircle from "../../src/assets/loadingCircle.gif"
import loadingCloud from "../../src/assets/loadingCloud.gif"

import happyMapIcon from "../components/Map/happMapIcon";
import PrimaryButton from "../components/PrimaryButton";
import Sidebar from "../components/SideBar";
import Map from "../components/Map/index";
import { getUser, setUserSession, removeUserSession, getToken } from "../services/auth";

import 'leaflet/dist/leaflet.css';
import '../styles/pages/create-orphanage.css';

import apiFile from '../services/apiFile';
import { useHistory } from 'react-router-dom';
import { createEmitAndSemanticDiagnosticsBuilderProgram } from "typescript";

interface Preview {
  selectedImagesPreview: string[]
}


export default function CreateOrphanage() {
const history = useHistory();

 const [ position, setPosition ] = useState({ latitude: 0, longitude: 0 })
 const [ orphName, setOrphName ] = useState('');
 const [ about, setAbout ] = useState('');
 const [ instructions, setInstructions ] = useState('');
 const [ openingHours, setOpeningHours ] = useState('');
 const [ openOnWeekends, setOpenOnWeekends ] = useState(true);
 const [ images, setImages ] = useState<File[]>([]);
 const [ previewImages, setPreviewImages ] = useState<string[]>([]);
 const [ videos, setVideos ] = useState<File[]>([]);
 const [ previewVideos, setPreviewVideos ] = useState<string[]>([]);
 const [ loading, setLoading ] = useState(false);
 const [ userName, setUserName ] = useState('');

 const token = getToken();
 const user = getUser(); 
 
//  console.log(user)
 const { id, name  } = user; 

 function AddMarkerToClick() {  
   useMapEvents({
    click(event) {
      const { lat, lng } = event.latlng;
      setPosition({
        latitude: lat,
        longitude: lng,
      });
    },
  });
  
  return (
    position.latitude !== 0 ? (
      <Marker
        position={[position.latitude, position.longitude]}
        interactive={false}
        icon={happyMapIcon}
      />
    ) : null
  )}

 async function handleSubmit(e: FormEvent) {
  e.preventDefault()

  const { latitude, longitude } = position;

  const data = new FormData();

  data.append('name', orphName);
  data.append('about', about);
  data.append('latitude', String(latitude));
  data.append('longitude', String(longitude));
  data.append('instructions', instructions);
  data.append('opening_hours', openingHours);
  data.append('open_on_weekends', String(openOnWeekends));
  // data.append('user_name', String(userName));


  images.forEach(image => {
    data.append('images', image)
  })
 
  videos.forEach(video => {
    data.append('videos', video)
  })

 const response = await apiFile.post('orphanages/create', data, {
   headers: { user_id: user.id , user_name: user.name }
  // headers: { id }
 });
  alert(response.data);
  setUserSession(token, user);  
  history.push('/app');
 }


//Library ver react-images-upload: provides image preview and validation upload (done below manually)

function handleSelectImages(event: ChangeEvent<HTMLInputElement>) {
  if(!event.target.files) {  //VALIDA????O CONTRA NULO
    return;
  }
  //SAVE FILES IN STATE FOR REGISTRATION
  //select files and turn filelist to array
  const fileArray = Array.from(event.target.files);  //changes filelist to array of files

  //save array of files in function variable saveImages: function parameter saveImgs will play as an array to store new fileArray items again and again through concat method 
  //concat returns a new array comprised of this array joined with other array(s) and/or value(s).
  let saveImages = (saveImgs:File[]) => saveImgs.concat(fileArray);
  if(saveImages.length <= 5){
    setImages(saveImages);
  } else {
   return;
  }


  //FOR PREVIEW OF UPLOADED FILES AS IMAGES 
  //same as above, but converts Array of files in separate strings of images with URL.createObjectURL
  const fileArrayPrev = fileArray.map((file) => URL.createObjectURL(file))  
  //validation to not exceed capturing 5 files at once
  if(fileArrayPrev.length > 5) {
    alert("No more than 5 files please.")
    return;
  }

 
 let prevImagesVar = (prevImages:string[]) =>   prevImages.concat(fileArrayPrev);
   //valida????o com o estado, para limitar 5 files no preview display. a var acima n??o ?? array, ?? fun????o
   if(previewImages.length >= 4){
    alert('Limit 5 files')
    return;
  }
  setPreviewImages(prevImagesVar);    
  
// valida????o pela quantidade de itens p/ estado 'previewImage', n??o funciona comvar 'prevImagesVar' = fun????o
}

function delPicPreview(i:number) {
  // console.log(i)

  const newItems = [...previewImages]
  newItems.splice(i, 1)
  setPreviewImages(newItems)  
}

 function handleSelectVideos(event: ChangeEvent<HTMLInputElement>) {
  if(!event.target.files) { 
    return;
  }
  //SAVE STATE
  const selectedVideos = Array.from(event.target.files)  //changes filelist to array of files

  const saveVideos = (saveImgs:File[]) => saveImgs.concat(selectedVideos) 

  setVideos(saveVideos);

//PREVIEW
  const videoArrayPrev = Array.from(event.target.files).map((file) => URL.createObjectURL(file)) 
//valida????o para limitar 3 files
  if(previewVideos.length > 2){
    alert('Limit 3 files')
    return;
  }
  const prevVideos = (prevVideos:string[]) => prevVideos.concat(videoArrayPrev)   
  setPreviewVideos(prevVideos);
  setLoading(true);

}

function delVidPreview(index:number) {
  // console.log(i)

  const newVids = [...previewVideos]
  newVids.splice(index, 1)
  setPreviewVideos(newVids)  
}

  return (
    <div id="page-create-orphanage">
      <Sidebar />

      <main>
        <form  onSubmit={handleSubmit}  className="create-orphanage-form">
          <fieldset>
            <h3>{user.name}</h3>
            <legend>Data</legend>                 
            <Map  style={{ width: '100%', height: 280 }} className="map">
              <AddMarkerToClick />
            </Map>
       
            <div className="input-block">
              <label htmlFor="name">Name</label>
              <input id="name" value={orphName} onChange={e =>setOrphName(e.target.value)} 
              placeholder="Orphanage name" />
            </div>

            <div className="input-block">
              <label htmlFor="about" >About</label>
              <textarea id="name" value={about} onChange={e =>setAbout(e.target.value)} maxLength={300} 
              placeholder="300 caracters limit"/>
            </div>
            
            <div className="input-block">
              <label htmlFor="images">Photo upload</label>
              <p>* Limit of 5 files of 1 megabyte in landscape format *</p>

              <div className="images-container">
                

              {/* https://bezkoder.com/react-hooks-file-upload/   */}

              {/* https://www.youtube.com/watch?v=MAw0lQKqjRA */}
              {/* React File Upload Tutorial with Drag-n-Drop and ProgressBar */}
                {previewImages.map((image, idx) => {  
                    return (                                       
                      <div key={idx} className="img-container">    
                        {image ? ( 
                            <><img  src={image} alt={name}/>
                            <button type="button" onClick={() => delPicPreview(idx as number)}>
                              <FiTrash2 size={18} color="red" />
                            </button> </>          
                         ) : <img src={loadingCircle} /> }
                     </div>                                    
                      )                            
                  
                })}

                <label htmlFor="image[]" className="new-image">
                  <FiPlus size={24} color="#15b6d6" />
                </label>
              </div>
              <input 
                multiple 
                onChange={handleSelectImages} 
                accept="image/png, image/jpeg, image/jpg, image/gif" 
                max-size="1mb" 
                max-files="5"
                type="file" 
                id="image[]"
              />
             
            </div>


            <div className="input-block">
              <label htmlFor="videos">Videos</label>
              <p>* Limit of 3 files of 200 megabytes, in landscape format. *</p>

              <div className="videos-container">
                {previewVideos.map((video, itx) => {   
                              
                  return (     
                    <div key={itx} className="vid-container">  
                      {video ? ( 
                            <>
                            <video  src={video} />
                             <button type="button" onClick={() => delVidPreview(itx as number)}>
                                <FiTrash2 size={18} color="red" />
                            </button> 
                            </>
                      ) : (   <img src={loadingCircle}/> )
                      }    
                                               
                    </div>                  
                  )
                        })}
                <label htmlFor="video[]" className="new-image">
                  <FiPlus size={24} color="#15b6d6" />
                </label>
              </div>
              <input 
                multiple 
                onChange={handleSelectVideos} 
                accept="video/mp4, video/mov, video/avi" 
                max-size="200mb" 
                max-files="3"
                type="file" 
                id="video[]"
              />
             
            </div>

            
          </fieldset>

          <fieldset>
            <legend>Visitation</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instructions</label>
              <textarea id="instructions" value={instructions} onChange={e =>setInstructions(e.target.value)}placeholder="Describe instructions" />
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Hours</label>
              <input id="opening_hours" value={openingHours} onChange={e =>setOpeningHours(e.target.value)}
              placeholder="Opening hours"/>
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Opne on the weekends?</label>

              <div className="button-select">
                <button 
                  type="button" 
                  className={openOnWeekends ? "active" : ''}
                  onClick={() =>{setOpenOnWeekends(true)}}>
                    Yes
                </button>
                <button 
                  type="button" 
                  className={!openOnWeekends ? "active" : ''}
                  onClick={() =>{setOpenOnWeekends(false)}}>
                    No
                </button>
              </div>
            </div>
          </fieldset>

          <PrimaryButton type="submit">Confirm</PrimaryButton>
        </form>
      </main>
    </div>
  )};
