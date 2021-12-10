import { Dispatch, SetStateAction } from "react";
import Select from '@mui/material/Select';
import { FormControl, InputLabel, MenuItem } from "@mui/material";
import { Box, minWidth } from "@mui/system";

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
        
        <Box sx={{minWidth:200}} marginTop={1} marginLeft={50}>
            <FormControl sx={{minWidth:150}} >
                <InputLabel id="comboLabel">Select</InputLabel>
            
            <Select
                id = 'selectOption'
                labelId="comboLabel"
                value = {props.line}
                onChange = {ev =>{
                    const selectedline:string = ev.target.value;
                    onChangeLine(selectedline);

                }}

                label="Select"
                autoWidth
            >

            <MenuItem value="Temperature">Temperature</MenuItem>
            <MenuItem value="WindSpeed"> Windspeed</MenuItem>
            <MenuItem value="Humidity" > Humidity </MenuItem>
            <MenuItem value="Pressure" >Pressure</MenuItem>
            <MenuItem value="WindDeg" > WindDeg</MenuItem>
            <MenuItem value="WindGust" > WindGust </MenuItem>
            
            </Select>
            </FormControl>
        </Box>
       
       
        </>
    );


}