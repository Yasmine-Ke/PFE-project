import NavbarR from "./navbarR";
import styled from "styled-components";
import Profil from "./profil";
import FichierL from "../medecin/diagnostic/lettre/fichierL";
import AjouterR from "./ajouterR";
export default function Acceuil (){

  
  
    return(
      <>
<NavbarR></NavbarR>


   <Profil></Profil>
<AjouterR></AjouterR>


</> 
    );
}