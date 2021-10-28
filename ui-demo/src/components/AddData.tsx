import React ,{ Component, useState, useEffect } from 'react';
import Container from '@material-ui/core/Container';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import { Box } from '@material-ui/core';
import Typography from "@material-ui/core/Typography";
import { FormControl } from '@material-ui/core';
import { FormHelperText } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { NativeSelect } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { Snackbar } from '@material-ui/core';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { Link as RouterLink } from "react-router-dom";

import { ClubInterface } from '../models/IClub'; 
import { StudentCouncilInterface } from '../models/IStudentCouncil';
import { TeacherInterface } from '../models/ITeacher';
import { TypeClubInterface } from '../models/ITypeClub';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
        flexGrow: 1,
        '& > *': {
              margin: theme.spacing(1),
              width: '30ch',
        },
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 240,
    },
    Container: {
        marginTop: theme.spacing(2),
    },
    paper: {
        padding: theme.spacing(2),color: theme.palette.text.secondary
    },
    button: {
        margin: theme.spacing(1),
    },
    }),
);

export default function AddData(){
    const classes = useStyles();
    const loginUser = localStorage.getItem("stdid");
    const apiUrl = "http://localhost:8080";
    const requestOptions = {
        method: "GET",
        headers: {
             Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        },
    }
    console.log(localStorage);
    const Alert = (props: AlertProps) => {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    };
    const [typeClubs, setTypeClubs] = useState<TypeClubInterface[]>([]);
    const [studentCouncils, setStudentCouncil] = useState<StudentCouncilInterface>();
    const [teachers, setTeachers] = useState<TeacherInterface[]>([]);
    const [clubs, setClub] = useState<Partial<ClubInterface>>({});

    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);

    //console.log("status: "+success)

    /*const [name, setName] = React.useState(Committee.Name);
    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setName(Committee.Name as string);
    };
    const [typeClub, setTypeClub] = React.useState(Committee.Name);
    const [state, setState] = React.useState<{ name: string ; typeClub : string ; teacher : string}>({
        typeClub: '',
        name: '',
        teacher: '', 
      });*/
      const [nameClub, setNameClub] = React.useState('');

      const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNameClub(event.target.value);
      };

    // const handleInputChange = (
    //     event: React.ChangeEvent<{ id?: string; value: any }>
    // ) => {
    //     const id = event.target.id as keyof typeof clubs;
    //     const { value } = event.target;
    //     setClub({ ...clubs, [id]: value });
    // };
    
    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
          return;
        }
        setSuccess(false);
        setError(false);
    };

    const handleChange = (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
        const name = event.target.name as keyof typeof clubs;
        setClub({
          ...clubs,
          [name]: event.target.value,
        });
        console.log("Adder: "+clubs.AdderID +", Adviser: "+clubs.AdviserID+", Type: "+clubs.TypeClubID)
        getStudentCouncil()
    };

    const getTypeClubs = async () => {
        fetch(`${apiUrl}/typeClubs`, requestOptions)
          .then((response) => response.json())
          .then((res) => {
            if (res.data) {
                setTypeClubs(res.data);
            } else {
              console.log("else");
            }
        });
    };

    const getTeachers = async () => {
        fetch(`${apiUrl}/teachers`, requestOptions)
          .then((response) => response.json())
          .then((res) => {
            if (res.data) {
                setTeachers(res.data);
            } else {
              console.log("else");
            }
        });
    };

    const getStudentCouncil = async () => {
        fetch(`${apiUrl}/studentCouncil/find_with_studentID/${loginUser}`, requestOptions)
          .then((response) => response.json())
          .then((res) => {
            if (res.data) {
                setStudentCouncil(res.data);
            } else {
                console.log("else");
            }
        });
        //console.log("---ok---")
    };

    useEffect(() =>{
        getStudentCouncil();
        getTypeClubs();
        getTeachers();
    }, []);

    const convertType = (data: string | number | undefined) => {
        let val = typeof data === "string" ? parseInt(data) : data;
        return val;
      };
    
    function submit() {
        let data = {
            AdderID: convertType(studentCouncils?.ID),
            AdviserID: convertType(clubs.AdviserID),
            TypeClubID: convertType(clubs.TypeClubID),
            Name: nameClub ?? "" ,
        };
    
        const requestOptionsPost = {
            method: "POST",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        };
        //error check
        //console.log("studentCouncils.ID: " + studentCouncils.ID)
        //console.log("AdviserID: " + data.AdderID)
        //console.log("name Club: " + data.Name)

        fetch(`${apiUrl}/clubs`, requestOptionsPost)
          .then((response) => response.json())
          .then((res) => {
            if (res.data) {
              setSuccess(true);
              console.log("status: "+success)
            } else {
              setError(true);
            }
          });
    }
    //error check
    //console.log(clubs.Name)

    return(
        
        <Container className={classes.Container} maxWidth="md">
            <Snackbar open={success} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                    บันทึกข้อมูลสำเร็จ
                </Alert>
            </Snackbar>
            <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error">
                    บันทึกข้อมูลไม่สำเร็จ
                </Alert>
            </Snackbar>
            {/* {studentCouncils.map((item: StudentCouncilInterface) => (*/}
                <Box p={3}>
                    <Typography variant="h6">
                        กรรมการสภานักศึกษา: {studentCouncils?.ID_Student} {studentCouncils?.Name}
                    </Typography>
                </Box>
            {/*))} */}
            <Paper className={classes.paper}>
                <Box p={2}>
                    <Typography variant="h4">
                        ชมรม
                    </Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={3}>
                            <p>ผู้เพิ่มข้อมูล</p>
                        </Grid>
                        <Grid item xs={9}>
                            <FormControl className={classes.formControl} disabled>
                                <NativeSelect
                                    value={clubs.AdderID}
                                    onChange={handleChange}
                                    inputProps={{
                                        name: 'AdderID',
                                        id: 'Adder-native-disabled',
                                    }}
                                >
                                    {/* {studentCouncils.map((item: StudentCouncilInterface) => (
                                        <option value={item.ID} key={item.ID}>
                                            {item.Name}
                                        </option>
                                    ))} */}
                                    <option value={studentCouncils?.ID}>{studentCouncils?.Name}</option>
                                </NativeSelect>
                                <FormHelperText>Disabled</FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item xs={3}>
                            <p>ชื่อชมรม</p>
                        </Grid>
                        <Grid item xs={9}>
                            <FormControl fullWidth variant="outlined">
                                <TextField 
                                    id="Name-Club-Text" 
                                    label="ชื่อชมรม" 
                                    type = "string"
                                    value= {nameClub}
                                    variant="outlined" 
                                    onChange = {handleInputChange}
                                    />
                            </FormControl>
                        </Grid>
                        <Grid item xs={3}>
                            <p>ประเภทชมรม</p>
                        </Grid>
                        <Grid item xs={9}>
                            <FormControl className={classes.formControl}>
                                <NativeSelect
                                    value={clubs.TypeClubID}
                                    onChange={handleChange}
                                    inputProps={{
                                        name: 'TypeClubID',                                            
                                        id: 'typeClub-native-label-placeholder',
                                    }}
                                >
                                    <option value=""></option>
                                    {typeClubs.map((item: TypeClubInterface) => (
                                        <option value={item.ID} key={item.ID}>
                                            {item.Name}
                                        </option>
                                    ))}
                                </NativeSelect>
                            </FormControl>
                        </Grid>
                        <Grid item xs={3}>
                            <p>อาจารย์ที่ปรึกษาชมรม</p>
                        </Grid>
                        <Grid item xs={9}>
                            <FormControl className={classes.formControl}>
                            <NativeSelect
                                    value={clubs.AdviserID}
                                    onChange={handleChange}
                                    inputProps={{
                                        name: 'AdviserID',
                                        id: 'teacher-native-label-placeholder',
                               }}
                            >
                                <option value=""></option>
                                {teachers.map((item: TeacherInterface) => (
                                    <option value={item.ID} key={item.ID}>
                                        {item.Name}
                                    </option>
                                    ))}
                                </NativeSelect>
                            </FormControl>
                        </Grid>
                    </Grid>
                </Box>
                <br />
                <Button
                    variant="contained"
                    color="secondary"
                    className={classes.button}
                    component={RouterLink} to="/"
                >
                    ยกเลิก
                </Button>
                <Button
                    variant="contained"
                    className={classes.button}
                    onClick={submit}
                >
                    ตกลง
                </Button>
            </Paper>
            <br />
        </Container>
    );
}