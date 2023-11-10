import Spinner from 'react-bootstrap/Spinner';

/// Component which handles rendering a map in the application.
/// Takes a valid GeoJSON object in the Geometry prop, and a custom
/// JSON object for one of the applications map types in the
/// GraphicData prop.
export default function MapRenderer(props) {

    const spinner = props.mapFile ? <></> : <Spinner/>;

    return (
        <div style={{width: props.width, height: props.height}}>
            <img style={{width: props.width, height: props.height}} src="https://i.pinimg.com/originals/88/8d/fb/888dfbad84f3f490c2b54204a48be09a.jpg"></img>
            {/* Nothing here yet... implement leaflet */}
        </div>
    );
}