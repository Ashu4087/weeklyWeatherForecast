import { useState , useEffect } from "react" ;
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip,ResponsiveContainer,Legend } from 'recharts'; 


interface loc{
    lat:number;
    lon:number;
}

let location:loc ={
    lat: 18.5196, 
    lon: 73.8553,
};

//props
interface state{
    line:string;
}

//weather data to be stored 
interface weatherDatatype{
    time:number;
    temperature:number;
    windspeed:number;
    humidity:number;
    pressure:number;
    winddeg:number;
    windgust:number;
}


//hourly data

interface iwdatatype {
    hourly : iHourly[];
    daily : iDaily[];
}

interface iHourly{
    dt:number ;
    temp:number;
    wind_speed:number;
    humidity:number;
    pressure:number;
    wind_deg:number;
    wind_gust:number;
}
interface Temp{
    day:number;
}

//override hourly interface to daily data

interface iDaily extends Omit<iHourly,'temp'>{
    temp:Temp;
}

//check the selected line

interface icheckLine{
    isTemp:boolean;
    isWind:boolean;
    isHumid:boolean;
    isPres:boolean;
    isWdeg:boolean;
    isWgust:boolean;
}

//create an object for icheckLine



//final data contains weatherdata and ticks array;

interface idataAndticks{
    combinedData:weatherDatatype[];
    ticksData:number[];
}




//
const combinedDatafun = (wdata:iwdatatype) : idataAndticks =>{
    
    const combinedDataObj:idataAndticks={
        combinedData:[],
        ticksData:[],
    }
    
    
    let checkDate = new Set();
    
    combinedDataObj.combinedData = wdata.hourly.map(data =>{

        const wdataobj:weatherDatatype = {
            time: data.dt,
            temperature: data.temp,
            humidity: data.humidity,
            windspeed: data.wind_speed,
            pressure: data.pressure,
            winddeg: data.wind_deg,
            windgust: data.wind_gust,
        }

        if(!checkDate.has( new Date (data.dt*1000).getUTCDate())){
            checkDate.add(new Date (data.dt*1000).getUTCDate());
            combinedDataObj.ticksData.push(data.dt);
        }
        
        return wdataobj;
    })

    wdata.daily.map(data =>{
        
        
        if(!checkDate.has( new Date (data.dt*1000).getUTCDate())){
            checkDate.add(new Date (data.dt*1000).getUTCDate());
            combinedDataObj.ticksData.push(data.dt);
        
            const wdataobj:weatherDatatype= {
                time: data.dt,
                temperature: data.temp.day,
                humidity: data.humidity,
                windspeed: data.wind_speed,
                pressure: data.pressure,
                winddeg: data.wind_deg,
                windgust: data.wind_gust,

            }
            combinedDataObj.combinedData.push(wdataobj);
        }
        
    });

    return combinedDataObj;
}
let count:number=0;
console.log(`out of fun  ${count}`);



export default function Chart(props:state){
   
    const [checkLine , setCheckLine] = useState<icheckLine>({
        isTemp:false,
        isWind:false,
        isHumid:false,
        isPres:false,
        isWdeg:false,
        isWgust:false,
    });


    useEffect(()=>{
        updateCheckLine(props.line)
    } ,
    [props.line]);

    //update the selected line as selcet if not selected and unselect if selected.

    function updateCheckLine(cline:string):void{
        if(cline=== 'Temperature'){
            if(checkLine.isTemp !== true){
                setCheckLine({...checkLine , isTemp:true});
            }
            else if(checkLine.isTemp === true){
                setCheckLine({...checkLine , isTemp:false});
            }
        }
        if(cline === 'WindSpeed'){
            if(checkLine.isWind !== true){
                setCheckLine({...checkLine , isWind:true});
            }
            else if(checkLine.isWind === true){
                setCheckLine({...checkLine , isWind:false});
            }
        }
        if(cline === 'Humidity'){
            if(checkLine.isHumid !== true){
                setCheckLine({...checkLine , isHumid :true});
            }
            else if(checkLine.isHumid === true){
                setCheckLine({...checkLine , isHumid:false});
            }
        }
        if(cline=== 'Pressure'){
            if(checkLine.isPres !== true){
                setCheckLine({...checkLine , isPres:true});
            }
            else if(checkLine.isPres === true){
                setCheckLine({...checkLine , isPres:false});
            }
        }
        if(cline === 'WindDeg'){
            if(checkLine.isWdeg !== true){
                setCheckLine({...checkLine , isWdeg:true});
            }
            else if(checkLine.isWdeg === true){
                setCheckLine({...checkLine , isWdeg:false});
            }
        }
        if(cline === 'WindGust'){
            if(checkLine.isWgust !== true){
                setCheckLine({...checkLine , isWgust :true});
            }
            else if(checkLine.isWgust === true){
                setCheckLine({...checkLine , isWgust:false});
            }
        }
    }
    
    const [combinedWdata , setCombinedWdata] = useState<idataAndticks>({
        combinedData:[],
        ticksData:[],
    });
    // const selectedLine = props.line;
    // console.log('temp ',checkLine.isTemp , 'humid ' ,checkLine.isHumid ,'wind' ,checkLine.isWind);
    // console.log(`in chart ${selectedLine}`);

    useEffect(()=>{
        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${location.lat}&lon=${location.lon}&units=metric&appid=74382af856f0d02d7f684c901b965614`)
        .then(res => res.json())
        .then(rawWeatherData =>{
            setCombinedWdata(combinedDatafun(rawWeatherData)); 
        })
          
        .catch(err => console.log(err));
  
      },[]);
    
      combinedWdata.combinedData.map(d=> console.log(d));

      return(
          <>
          {/* {create chart} */}
          <div>
              <h1>Weather in Pune </h1>
          <ResponsiveContainer  width="100%" height={400} aspect={3}>
        <LineChart
          width={500}
          height={300}
          data={combinedWdata.combinedData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
          >
          
          
          
          <CartesianGrid  strokeDasharray="3 3" />
          <XAxis type="number" dataKey="time" scale='time' domain={['auto' , 'auto']}  ticks={combinedWdata.ticksData} tickFormatter={date => new Date(date*1000).toDateString().substring(4,10)} axisLine={false} dy={10}/>
          
          <Tooltip labelFormatter={(label) => new Date(label*1000).toLocaleTimeString() }/>
          <Legend />
          
          { checkLine.isHumid ===true ? (
            <>
            <YAxis yAxisId="humidy" orientation= "left" domain={[0,100]} tickFormatter={num =>`${num}%`} stroke="green"/>
            <Line yAxisId="humidy" type="monotone" dataKey="humidity" name="Humidity" unit="%" stroke='green' dot={false}/>
          </>
          ):("")}
          { checkLine.isPres ===true ? (
            <>
            <YAxis yAxisId="pressure" orientation= "left" domain={[0,1500]} tickFormatter={num =>`${num}hPa `} stroke="yellow"/>
            <Line yAxisId="pressure" type="monotone" dataKey="pressure" name="Pressure" unit="hPa" stroke='yellow' dot={false}/>
          </>
          ):("")}
          
          { checkLine.isWdeg ===true ? (
            <>
            <YAxis yAxisId="winddeg" orientation= "left" domain={[0,360]} tickFormatter={num =>`${num}°`} stroke="brown"/>
            <Line yAxisId="winddeg" type="monotone" dataKey="winddeg" name="windDegree" unit="°" stroke='brown' dot={false}/>
          </>
          ):("")}
          
          { checkLine.isWgust ===true ? (
            <>
            <YAxis yAxisId="windgust" orientation= "left" domain={[0,50]} tickFormatter={num =>`${num}m/s`} stroke="pink"/>
            <Line yAxisId="windgust" type="monotone" dataKey="windgust" name="WindGust" unit="m/s"  stroke='pink' dot={false}/>
          </>
          ):("")}
          
          {checkLine.isWind===true ? (
          <>
          
            <YAxis yAxisId="windy" orientation="left" domain={[0 , 50]} tickFormatter={num =>`${num}m/s`} stroke="blue"/>
            <Line yAxisId="windy" type="monotone" dataKey="windspeed" name="WindSpeed" unit="m/s" stroke="blue" dot={false}/>
          </>
          ):("")}

          {checkLine.isTemp===true ? (
            <>
            
                <YAxis yAxisId="tempy" type="number" domain={[-100 , 100] } tickFormatter={num => `${num}°C`}stroke="red"/>
                <Line yAxisId="tempy" type="monotone" dataKey="temperature"  name = "Temperature" unit="°C" stroke="red" activeDot={{ r: 5 }} dot={false}/>
            </>
          ):("")}
          
        </LineChart>
      </ResponsiveContainer>
          </div>
          </>
      );

}