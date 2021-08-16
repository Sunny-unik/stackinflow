import React from 'react'
import './css/followedtags.css'

export default function Followedtagsq() {
    return (
        <div class="row">
            {/* Only visible after login  */}
            <h2>Questions According tags you followed</h2>
            <div class="col-lg-6 col-md-6 col-sm-12" id="fqcontainer">
                <p class="ft">Lorem ipsum dolor, sit amet consectetur, adipisicing elit. Deserunt ab quia eum possimus debitis illo consequuntur cum impedit! Non hic ratione minus reiciendis esse laboriosam rem fugit, quam ut iure!</p>
                <p id="p1" class="ft">Juice</p>
            </div>
            <div class="col-lg-4 col-md-6 col-sm-12" id="fqcontainer">
                <p class="ft">Lorem !</p>
                <p class="ft" id="p2">Fruits</p>
            </div>
        </div >
    )
}
