import { useState } from "react";
import { Button, Container } from "react-bootstrap";
import { HexColorPicker } from "react-colorful";
import './ColorWidget.css';

export default function ColorWidget(props) {

    const [active, setActive] = useState(false);
    const [tempColor, setTempColor] = useState(props.color);

    const picker = active ?
    (
        <>
            <HexColorPicker color={props.color} onChange={setTempColor}/>
            <Button onClick={() => 
                {
                    props.onChange(tempColor);
                    setActive(false);
                }}
                >Confirm</Button>
        </>
    ) 
    : (<></>);

    return (
        <>
            <Container onClick={() => setActive(true)} className="widget">
                Color
                <div  
                    className="preview"           
                    style={{width:"20px", height:"20px", backgroundColor: props.color}}>
                </div>

            </Container>
            {picker}
        </>
    );
}