import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { Avatar, TextField, Select, MenuItem, FormControl, InputLabel } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import axios from "axios"


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,

    },
    cardroot: {
        minWidth: 300,
        height: "25rem"
    },
    cardroot2: {
        minWidth: 300,
        height: "35rem"
    },
    paper: {
        height: '42rem',
        width: '42rem',
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    control: {
        padding: theme.spacing(4),
    },
    image: {
        marginLeft: 100
    },
    title: {
        fontSize: 19,
    },
    pos: {
        marginBottom: 10,
    },
    minMax: {
        fontSize: 18
    },
    formControl: {
        margin: theme.spacing(2),
        minWidth: 300,
    },
    selectEmpty: {
        marginTop: theme.spacing(),
    },

}));

export default function SpacingGrid() {

    const [spacing] = React.useState(5);
    const classes = useStyles();

    const [selectedCity, setSelectedCity] = React.useState("Bucharest");
    const [weatherDescription, setWeatherDescription] = React.useState("cer senin");
    const [temperature, setTemperature] = React.useState("20");
    const [minTemperature, setMinTemperature] = React.useState("14");
    const [maxTemperature, setMaxTemperature] = React.useState("22");
    const [feelsLike, setFeelsLike] = React.useState("30");
    const [humidity, setHumidity] = React.useState("30");
    const [iconCode, setIconCode] = React.useState("11n");
    const defaultTextValueTemplate = `Salut,\n\n Doar ce am vazut ca afara sunt ${temperature} grade si se simt de parca ar fi ${feelsLike}. Voi iesi in parcul <X> cu inca 2 amici.\n\n Te astept si pe tine.\n Prietenul tau <Nume> `
    const [currentText, setCurrentText] = React.useState(defaultTextValueTemplate);

    const [senderName, setSenderName] = React.useState("");
    const [language, setLanguage] = React.useState("");
    const [receiverMail, setReceiverMail] = React.useState("");


    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get(`${process.env.REACT_APP_API_URL}/utils/weatherInfo/${selectedCity}`);
            if (result.data) {
                setWeatherDescription(result.data.weather[0].description);
                setIconCode(result.data.weather[0].icon);
                setTemperature(result.data.main.temp);
                setMinTemperature(result.data.main.temp_min);
                setMaxTemperature(result.data.main.temp_max);
                setFeelsLike(result.data.main.feels_like);
                setHumidity(result.data.main.humidity);
            }
        }
        fetchData();
    }, [selectedCity]);
    const handleTextAreaChange = (e) => {
        e.preventDefault();
        setCurrentText(e.target.value);
    }

    const handleReceiverEmail = (e) => {
        setReceiverMail(e.target.value);
    }
    const handleSender = (e) => {
        setSenderName(e.target.value);
    }
    const handleLanguage = (e) => {
        setLanguage(e.target.value);
    }
    const handleCityChange = (e) => {
        setSelectedCity(e.target.value);
        console.log(selectedCity)
    }

    const sendEmail = async (e) => {
        e.preventDefault();
        console.log(currentText);
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/utils/send`, {
                senderName: senderName,
                language: language,
                receiverMail: receiverMail,
                messageContent: currentText
            });
            if (response.status === 200) {
                alert(response.data.translatedText);
            }

        } catch (error) {
            alert("sorry, something went wrongs");
            console.log(error);
        }

    }
    return (
        <Grid container className={classes.root} spacing={2}>
            <Grid item xs={12}>
                <Grid container justifyContent="center" spacing={spacing}>

                    <Grid key={1} item>
                        <Paper elevation={5} className={classes.paper} >
                            <FormControl className={classes.formControl}>
                                <InputLabel id="demo-simple-select-label">Alegeti orasul dorit</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={selectedCity}
                                    onChange={handleCityChange}
                                >
                                    <MenuItem value={"Bucharest"}>Bucuresti</MenuItem>
                                    <MenuItem value={'Iasi'}>Iasi</MenuItem>
                                    <MenuItem value={'Cluj'}>Cluj</MenuItem>
                                    <MenuItem value={'Tecuci'}>Tecuci</MenuItem>
                                    <MenuItem value={'Timisoara'}>Timisoara</MenuItem>
                                    <MenuItem value={'Constanta'}>Constanta</MenuItem>

                                </Select>
                            </FormControl>
                            <Avatar src={`https://openweathermap.org/img/wn/${iconCode}@2x.png`} style={{ display: "flex", margin: "auto", width: "12rem", height: "12rem" }}></Avatar>
                            <Card elevation={0} className={classes.cardroot}>
                                <CardContent>
                                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                                        {weatherDescription}
                                    </Typography>
                                    <Typography variant="h5" component="h2">
                                        Temperatura: {temperature} º Celsius
                                    </Typography>
                                    <Typography className={classes.pos} color="textSecondary">
                                        Se simte ca: {feelsLike}º
                                    </Typography>
                                    <Typography className={classes.minMax} variant="body2" component="p">
                                        Temperatura minima: {minTemperature}º
                                        <br />
                                        Temperatura maxima: {maxTemperature}º
                                    </Typography>
                                    <br></br>
                                    <Typography className={classes.pos} color="textSecondary">
                                        Umiditate: {humidity}%
                                    </Typography>
                                </CardContent>

                            </Card>
                        </Paper>
                    </Grid>

                    <Grid key={2} item>
                        <Paper elevation={0} className={classes.paper} >

                            <br></br>
                            <br></br>
                            <br></br>
                            <Card elevation={5} className={classes.cardroot2}>
                                <CardContent>
                                    <TextField onChange={handleReceiverEmail} stye={{ display: "flex", marginRight: "auto" }} id="outlined-basic" label="Email Destinatar:" variant="outlined" />
                                    <TextField onChange={handleSender} stye={{ display: "flex", marginRight: "auto" }} id="outlined-basic" label="Expeditor:" variant="outlined" />
                                    <br></br>
                                    <br></br>
                                    <FormControl className={classes.formControl}>
                                        <InputLabel id="demo-simple-select-label">Limba in care va fi tradus mesajul</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={language}
                                            onChange={handleLanguage}
                                        >
                                            <MenuItem value={"ENGLISH"}>ENGLISH</MenuItem>
                                            <MenuItem value={'SPANISH'}>SPANISH</MenuItem>
                                            <MenuItem value={'FRENCH'}>FRENCH</MenuItem>
                                            <MenuItem value={'GERMAN'}>GERMAN</MenuItem>
                                            <MenuItem value={'ITALIAN'}>ITALIAN</MenuItem>
                                            <MenuItem value={'PORTUGUESE'}>PORTUGUESE</MenuItem>
                                            <MenuItem value={'ROMANIAN'}>ROMANIAN</MenuItem>
                                            <MenuItem value={'SWEDISH'}>SWEDISH</MenuItem>
                                            <MenuItem value={'DUTCH'}>DUTCH</MenuItem>
                                            <MenuItem value={'FINNISH'}>FINNISH</MenuItem>
                                            <MenuItem value={'NORWEGIAN'}>NORWEGIAN</MenuItem>
                                            <MenuItem value={'POLISH'}>POLISH</MenuItem>
                                            <MenuItem value={'HUNGARIAN'}>HUNGARIAN</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <br></br>

                                    <TextField
                                        style={{ width: "40rem" }}
                                        id="outlined-multiline-static"
                                        label="Text:"
                                        multiline
                                        minRows={10}
                                        onChange={handleTextAreaChange}
                                        value={defaultTextValueTemplate}
                                        variant="outlined"
                                    />

                                </CardContent>
                                <Button onClick={sendEmail} style={{ display: 'flex', marginLeft: "auto", marginRight: "1rem", marginBottom: "1rem" }} variant="contained" color="primary">
                                    Trimite email!
                                </Button>
                            </Card>

                        </Paper>

                    </Grid>

                </Grid>
            </Grid>

        </Grid>
    );

}