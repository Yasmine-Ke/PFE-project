import React from 'react';
import { BrowserRouter,Route,Routes} from 'react-router-dom'

import PaymentForm from './patient/PaymentForm';

import Patient from './secretaire/patient/patient'
import Profil from './secretaire/profil/profil'
import Bilan from './secretaire/bilan/bilanP/bilan'
import BilanM from './secretaire/bilan/bilanM/bilan'
import Rdv from './secretaire/rdv/rdv'
import Login from './secretaire/login';
import Pdf from './pdf/pdf';
import P from './pdf/p';
import PdfUploadForm from './pdf/insertpdf';

import LoginMedecin from './loginMedecin';


import LoginPageM from './testprofilm/profilm';
import UserInfoPagem from './testprofilm/test3';
//import DossierM from './medecin/diagnostic/diag';

//----------------medecin 


//import ListePatientest from './medecin/patienttest/listePatient';
//import Testp from './medecin/patienttest/testd';



//----------------------directeur 
import LoginD from './Directeur/login';
//----secretaire ;
import Secretaire from './Directeur/secretaire/secretaire';

//------medecin ;

import Medecin from './Directeur/Medecin/Medecin';


import NavbarD from './Directeur/navbar/navbar';
import RdvD from './Directeur/rdv/rdv';
import RdvM from './medecin/rdv/rdv';
import PatientM from './medecin/patient/patient';
import PatientMB from './medecin/listepatient/patient';
import LoginM from './medecin/login';
import Diagnostic from './medecin/diagnostic/diagnostic';
//----------------patient 
import PatientD from './Directeur/patient/patient';
import SignUpForm from './patient/signup';

//patient 
//import NavbarR from './patient/navbarR';
//import LoginP from './patient/login';
//import ProfilP from './patient/profil';
import Acceuil from './patient/acceuil';
import Calendar from './patient/calender';
import LoginP from './patient/login';

import DoctorDashboard from './Directeur/dashboard/circle';

import InsertionC from './patient/InsertionC';

import Medecintest from './test/Medecin';

import User from './Login';



import Dashboard from './Directeur/dashboard/dashboard';
import BilanI from './biologiste/bilanI';

import Showlettre from './biologiste/shiwlettre';

import Page from'./page/page'
import Mdpoublie from './patient/mdpoublier';
export default function App() {
  return(
  <div>
  <BrowserRouter>
  <Routes>
   
  <Route path="/acceuil" element={<Page/>}/>
    <Route path="/patient" element={<Patient/>}/>
    <Route path="/profil" element={<Profil/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/rdv" element={<Rdv/>}/>
    <Route path="/bilan" element={<Bilan/>}/>
    <Route path="/bilan/medecin" element={<BilanM/>}/>

    <Route path="/dashboard" element={<DoctorDashboard/>}/>

    <Route path="/loginmedecin" element={<LoginMedecin/>}/>

    <Route path="/pdf" element={<Pdf/>}/>
    <Route path="/insertp" element={<PdfUploadForm/>}/>
    <Route path="/p" element={<P/>}/>
    <Route path="/user" element={<UserInfoPagem/>}/>
    <Route path="/log" element={<LoginPageM/>}/>


    <Route path="/showlettre" element={<Showlettre/>}/>
  {/*  <Route path="/dossier" element={<DossierM/>}/>
    <Route path="/listetest" element={<ListePatientest/>}/>
        <Route path="/test" element={<Testp/>}/>*/}
  
  <Route path="/medecin/rdv" element={<RdvM/>}/>
    <Route path="/medecin/patient" element={<PatientM/>}/>
    <Route path="/medecin" element={<LoginM/>}/>
    <Route path="/medecin/diagnostic" element={<Diagnostic/>}/>

    <Route path="/medecin/rdv" element={<RdvM/>}/>
    <Route path="/medecin/patient" element={<PatientM/>}/>
    <Route path="/medecin" element={<LoginM/>}/>
    <Route path="/medecin/patient2" element={<PatientMB/>}/>


    
    <Route path="/directeur/medecin" element={<Medecin/>}/>
    <Route path="/directeur/secretaire" element={<Secretaire/>}/>
    <Route path="/directeur/Rdv"element={<RdvD/>}/>
    <Route path="/directeur/acceuil" element={<NavbarD/>}/>
    <Route path="/directeur/patient" element={<PatientD/>}/>
    <Route path="/directeur" element={<LoginD/>}/>

  
 {/* 
    <Route path="/patient/patient" element={<NavbarR/>}/>
    <Route path="/patient/login" element={<LoginP/>}/>
    <Route path="/patient/profil" element={<ProfilP/>}/>*/}
    <Route path="/patient/Acceuil" element={<Acceuil/>}/>
    <Route path="/patient/calender" element={<Calendar/>}/>
    <Route path="/patient/login" element={<LoginP/>}/>
    <Route path="/patient/signup" element={<SignUpForm/>}/>
    <Route path="/patient/mdpoublie" element={<Mdpoublie/>}/>


    <Route path="/telecons" element={<PaymentForm/>}/>
    <Route path="/formC" element={<InsertionC/>}/>


    <Route path="/directeur/dashboard" element={<Dashboard/>}/>



    <Route path="/signin" element={<User/>}/>

    <Route path="/test" element={<Medecintest/>}/>
    



    <Route path="/directeur/dashboard" element={<Dashboard/>}/>



    <Route path="/biologiste" element={<BilanI/>}/>
  </Routes>
  </BrowserRouter>
</div>
  );}