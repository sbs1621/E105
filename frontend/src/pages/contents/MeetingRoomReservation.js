import {
    Button,
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup,
    TextField,
    Typography
} from "@mui/material";
import React from "react";
import {DateTimePicker, LocalizationProvider} from "@mui/lab";
import DateAdapter from '@mui/lab/AdapterDateFns';
import axios from "axios";

export default function MeetingRoomReservation(){
    const [starttime, setstarttime] = React.useState(new Date('2022-01-01T00:00:00.000Z'));
    const [endtime, setendtime] = React.useState(new Date('2022-01-01T00:00:00.000Z'));
    const [title, settitle] = React.useState('');
    const [group, setgroup] = React.useState('');
    const [num, setnum] = React.useState(1);
    return (
        <>
            <Typography typography="h2">세미나실 예약 시스템</Typography>
            <br/>
                <FormLabel id="demo-radio-buttons-group-label">사용목적</FormLabel>
                <TextField id="outlined-basic" variant="outlined" onChange={(value)=>settitle(value)}/>
                <br/>
                <FormLabel id="demo-radio-buttons-group-label">동아리 선택</FormLabel>
                <RadioGroup
                    row
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="female"
                    name="radio-buttons-group"
                    onSelect={(value)=>setgroup(value)}
                >
                    <FormControlLabel value="mega" control={<Radio />} label="메가브레인" />
                    <FormControlLabel value="dot" control={<Radio />} label="돗가비" />
                    <FormControlLabel value="aug" control={<Radio />} label="AUG" />
                </RadioGroup>
                <br/>
                <FormLabel id="demo-radio-buttons-group-label">사용 예상 인원</FormLabel>
                <TextField
                    id="standard-number"
                    label="Number"
                    type="number"
                    onChange={(value)=>setnum(value)}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="standard"
                />
                <br/>
                <LocalizationProvider dateAdapter={DateAdapter}>
                    <DateTimePicker
                        renderInput={(props) => <TextField {...props} />}
                        value={starttime}
                        label="시작시간"
                        onChange={(newValue) => {
                            setstarttime(newValue);
                            console.log(starttime);
                        }}/>
                    <br/>
                    <DateTimePicker
                        renderInput={(props) => <TextField {...props} />}
                        value={endtime}
                        label="종료시간"
                        format="YYYY-MM-DD H:i"
                        onChange={(newValue) => {
                            setendtime(newValue);
                            console.log(endtime);
                        }}
                    />
                </LocalizationProvider>
                <Button onClick={()=>{
                    axios({
                        headers: {'Access-Control-Allow-Origin': '*'},
                        method: "get",
                        url: 'http://192.168.0.5:8080/api/v1/meeting',
                        data: {
                            purpose: title,
                            team: group,
                            usingPeople: Number.valueOf(num),
                            starTime: starttime,
                            endTime: endtime,
                        }
                    })
                        .then((Response)=>{
                            console.log(Response.data)
                        })
                        .catch((Error)=>{console.log(Error)})
                }}>예약하기</Button>
        </>
    )
}