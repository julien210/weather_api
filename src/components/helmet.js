import React from 'react'
import { Helmet } from 'react-helmet'

//const engineLocalisation = require('https://raw.githubusercontent.com/julien210/thion/julien210-assets/initEngineBabylon.js') 

export default function InitEngine(){
    return(
            <Helmet>
                 {/* <script src={engineLocalisation} type="text/javascript" /> */}
                 <title>test</title>
            </Helmet>
        )
}