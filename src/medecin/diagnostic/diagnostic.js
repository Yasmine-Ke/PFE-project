
import Navbar from '../Navbar/navbar';
import Dossier from './dossier/dossier (1)';
import styled from "styled-components";
import FichierO from './ordonnance/fichierO';
export default function Diagnostic(){



    const Color = styled.div`
    div{
    overflow-x: auto;
 
    
    }
   
  `;

    return(
        <Color>
<div>
<FichierO></FichierO>
<Dossier></Dossier>

<Navbar></Navbar>








</div>
</Color>
    );
}