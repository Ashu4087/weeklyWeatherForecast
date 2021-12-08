import { Dispatch, SetStateAction } from "react";

type lProps ={
    line :string ;
    setLine:Dispatch<SetStateAction<string>>;

}


export default function ComboBox (props:lProps){

    function onChangeLine(ev:string){
        props.setLine(ev);
    }
    
    return(
        <>
        <div className='comboBox' style={{height:'30px', paddingLeft:'450px' , marginBottom:'10px' }}>
            <select
                className = 'selectOption'
                value = {props.line}
                onChange = {ev =>{
                    const selectedline:string = ev.target.value;
                    onChangeLine(selectedline);

                }}
            >
            <option value="" hidden>Select Line</option>
            <option value="Temperature">Temperature</option>
            <option value="WindSpeed">WindSpeed</option>
            <option value="Humidity">Humidity</option>

            </select>

        </div>
       
        </>
    );


}