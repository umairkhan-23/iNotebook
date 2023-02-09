
import React from "react";
import Notes from "../componentes/Notes";

export default function Home(props) {
  const {showAlert}=props;
  return (
    <div>
     
     <Notes showAlert={showAlert} />
    
    </div>
  );
}
