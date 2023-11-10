// Displays a rating out of 5 stars. the value prop should
// be an integer from 0 to 5.
export default function RatingDisplay(value) {

    // Silly way to do this but we only promised hanlding integers
    // and this is very simple so... here we are

    // TODO: Add assets for filled and empty stars
    return (
        <>
            <img src={value > 0 ? "starFill" : "starEmpty"}></img>
            <img src={value > 1 ? "starFill" : "starEmpty"}></img>
            <img src={value > 2 ? "starFill" : "starEmpty"}></img>
            <img src={value > 3 ? "starFill" : "starEmpty"}></img>
            <img src={value > 4 ? "starFill" : "starEmpty"}></img>
        </>
    );
}