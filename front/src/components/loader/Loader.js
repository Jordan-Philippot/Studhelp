import React from 'react'
import Logo from '../../images/hat.png'

export default function Loader() {
    return (
        <div className="loader container-fluid">
            <div className="content row justify-content-center flex-direction-column">
                    <img src={Logo} alt="student hat" />
                    <p>Stud'help</p>
      
            </div>
        </div>
    )
}
