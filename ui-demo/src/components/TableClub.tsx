import React, { useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import { ClubInterface } from "../models/IClub";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {marginTop: theme.spacing(2)},
        table: { minWidth: 650},
        tableSpace: {marginTop: 20},
    })
);

export default function TableClub() {

    const classes = useStyles();
    const [clubs, setclubs] = React.useState<ClubInterface[]>([]);

const getClubs = async () => {
    const apiUrl = "http://localhost:8080/clubs";
    const requestOptions = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        },
    };

    fetch(apiUrl, requestOptions)
        .then((response) => response.json())
        .then((res) => {
        console.log(res.data);
        if (res.data) {
            setclubs(res.data);
        } else {
            console.log("else");
        }
    });
};

useEffect(() => {
    getClubs();
 }, []);
 
 return (
    <Container className={classes.container} maxWidth="md">
        <Box display="flex">
            <Box flexGrow={1}>
                <Typography
                    component="h2"
                    variant="h3"
                    color="primary"
                    gutterBottom
                >
                    CLUB
                </Typography>
            </Box>
            <Box>
                <Button
                    component={RouterLink}
                    to="/create"
                    variant="contained"
                    color="primary"
                >
                    เพิ่มชมรม
                </Button>
            </Box>
       </Box>
       <TableContainer component={Paper} className={classes.tableSpace}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="left" width="30%">
                            Name Club
                        </TableCell>
                        <TableCell align="left" width="20%">
                            Type Club
                        </TableCell>
                        <TableCell align="center" width="20%">
                            Adviser
                        </TableCell>
                        <TableCell align="center" width="20%">
                            Adder
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {clubs.map((club: ClubInterface) => (
                    <TableRow key={club.ID}>
                        <TableCell align="left">{club.Name}</TableCell>
                        <TableCell align="left" size="medium">{club.TypeClub.Name}</TableCell>
                        <TableCell align="center">{club.Adviser.Name}</TableCell>
                        <TableCell align="center">{club.Adder.Name}</TableCell>
                    </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    </Container>
    );
}
