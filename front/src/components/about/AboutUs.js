import React from 'react';
import Title from '../Title'
import TextLoop from "react-text-loop";
import Hat from "../../images/hat.png"
import Collaborators from './Collaborators';

const About = () => {
  const springConfig = {
    stiffness: 90, 
    damping: 8
  }
  const interval = 800
  const PointLoop = () => (
  <>
    <TextLoop interval={interval} springConfig={springConfig}>
      <span>.</span>
      <span>.</span>
    </TextLoop>
    <TextLoop interval={interval+40} springConfig={springConfig}>
      <span>.</span>
      <span>.</span>
    </TextLoop>
    <TextLoop interval={interval+80} springConfig={springConfig}>
      <span>.</span>
      <span>.</span>
    </TextLoop>
  </>)
  return (
    <div className="home container-fluid">
      <div className="homepage">
        <Title title={"À propos"} />
          <div className="row justify-content-center">      
            <div className="col-10 col-sm-10 col-md-9 col-lg-8 col-xl-6 flex-direction-column presentation-block">
              <h2>Créé par les étudiants<PointLoop/></h2>
              <h3>
                Une équipe de tous les horizons de France et de Navarre, et tous les parcours
                <br></br>Passioné par le développement web et par vous !
                <br></br>Pour plus d'informations, tu peux contacter notre équipe <b>ici</b>.
              </h3>
              <button className="btn btn-orangeOut" >Découvrir les évènements</button>
            </div>
            <img src={Hat} alt="student hat" className="illustration-home col-10 col-sm-8 col-md-9 col-lg-5 col-xl-5" />
          </div>
        </div>
        <Collaborators/>
      </div>
  );
}

export default About;
