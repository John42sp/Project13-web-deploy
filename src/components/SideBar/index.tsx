
import React from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { useHistory, Link } from 'react-router-dom';

import mapMarkerImg from "../../assets/map-marker.svg";

import './styles.css';

export default function Sidebar() {
  // const { goBack } = useHistory();
  const history = useHistory();



  return (
    <aside className="sidebar">
      <img src={mapMarkerImg} alt="Happy" />

      <footer>
 

        <button type="button" onClick={() => history.goBack()}>
          <FiArrowLeft size={24} color="#FFF" />
        </button>
      </footer>
    </aside>
  );
}