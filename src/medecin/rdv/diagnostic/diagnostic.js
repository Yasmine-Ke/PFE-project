

import Dossier from './dossier/dossier ';
import styled from "styled-components";
import FichierO from './ordonnance/fichierO';
export default function Diagnostic(){



    const Color = styled.div`
   background-color:red;
  `;

    return(
<>
<Dossier></Dossier>
<FichierO></FichierO>









</>
    );
}