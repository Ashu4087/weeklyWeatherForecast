import { Dispatch, SetStateAction } from "react";
import Select from '@mui/material/Select';
import { Checkbox, FormControl, InputLabel, ListItemText, MenuItem, SelectChangeEvent } from "@mui/material";
import { Box } from "@mui/system";

type lProps ={
    line :string[] ;
    setLine:Dispatch<SetStateAction<string[]>>;

}


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 200,
    },
  },
};

const lineData=['Temperature' , 'Windspeed' , 'Humidity' ,'Pressure' , 'WindDeg', 'Windgust'];



export default function ComboBox (props:lProps){

    const onChangeLine = (ev : SelectChangeEvent<typeof props.line>) =>{
        const {target : {value}} = ev ;
        props.setLine(typeof value === 'string' ? value.split(',') :value);
    };
    
    return(
        <>
        
        <Box sx={{minWidth:200}} marginTop={1} marginLeft={50}>
            <FormControl sx={{minWidth:150}} >
                <InputLabel id="comboLabel">Select</InputLabel>
            
            <Select
                id = 'selectOption'
                labelId="comboLabel"
                value = {props.line}
                onChange ={onChangeLine}
                label="Select"
                autoWidth
                multiple
                renderValue={(selected)=>selected.join(',')}
                MenuProps={MenuProps}
            >
            {
                lineData.map(selectedLine =>(
                    <MenuItem  key ={selectedLine} value={selectedLine}>
                        <Checkbox checked={props.line.indexOf(selectedLine) >-1} />
                        <ListItemText primary={selectedLine}/>
                    </MenuItem>
                )
                )
            }

            </Select>
            </FormControl>
        </Box>
       
       
        </>
    );


}