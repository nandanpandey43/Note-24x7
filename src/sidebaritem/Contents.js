import React from 'react'
import { Markup } from 'interweave';

import "../index.css";


function Contents(props) {
    console.log(props.selectedNote);
    
    const articleContent = props.selectedNote.body;
    
    // const spanStyles = {
    //     // margintop: "40px",
    //     // marginBottom: "35px",
    //     marginLeft: "auto",
    //     marginRight: "auto",
    //     height: "100vh",
    //     overflowY: "scroll",
    //     paddingLeft: "20px",
    //     paddingRight: "20px"
        
    // }


    return (
        <div className="contentStyle" >
            {/* <h1>contents shown here</h1> */}
            <h1 style={{color:"blue", textAlign: "center"}}>  {props.selectedNote.title.toUpperCase()} </h1>


            {/* <motion.div initial={{ y: 100 }}
                        animate={{ y:0 }}
             > */}

                <Markup content={articleContent} />


            {/* </motion.div> */}
            
            

        </div>
    )
}

export default Contents;
