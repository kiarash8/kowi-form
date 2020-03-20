import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { TextField } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    card: {
      maxWidth: '800px',
      marginTop: theme.spacing(2),
      margin: '0 auto',
    },
    cardContent: {
      paddingBottom:'8px!important'
    },
    btn: {
      padding: theme.spacing(1),
      margin: theme.spacing(1,0),
    },
    textField: {
      flexBasis: 200,
    },
    header:{
      textAlign: 'center',
      marginBottom: theme.spacing(2)
    },
    title:{
      fontSize: '1.4rem',
      fontWeight: 600,
      color: theme.palette.primary.main
    },
    subHeader:{
      fontSize: '.8rem',
      fontWeight: 400,
    },
  }));
  

export default function Registration() {
    const classes = useStyles();
    const [fields, setFields] = React.useState({
        firstname:{
            value:'',
            validation: [],
            required: true,
            isInLength: true,
            minLength: 3,
            maxLength: 20
        },
        lastname:{
            value:'',
            validation: [],
            required: true,
            isInLength: true,
            minLength: 3,
            maxLength: 20
        },
        username:{
          value:'',
          validation: [],
          required: true,
          isInLength: true,
          minLength: 3,
          maxLength: 15
        },
        email:{
          value:'',
          validation: [],
          required: true,
          isEmail: true,
        },
        password:{
            value:'',
            validation: [],
            required: true,
            isInLength: true,
            minLength: 6,
            maxLength: 25,
            isMatch: true,
            matchField: 'confirmPassword'
        },
        confirmPassword:{
            value:'',
            validation: [],
            required: true,
            isInLength: true,
            minLength: 6,
            maxLength: 25,
            isMatch: true,
            matchField: 'password'
        },
    });
    const [isRegistered, setIsRegistered] = React.useState(false);

    const handleFieldChange = name => event => {
        setFields({
            ...fields,
            [name]: {
                ...fields[name],
                value: event.target.value,
                validation: [],
            }
        });
    };

    const submitForm = () => {
        const validation = fieldsValidation();
        if(validation.status){
            setIsRegistered(true);
        }
        else{ setFields(validation.fields); }
    }

    const fieldsValidation = () => {
        const isValid = [];
        const checkedField = [];
        Object.keys(fields).forEach(el => {
            const validationErr = [];
            //required
            if(fields[el].required && fields[el].value === '') {validationErr.push('required')}
            //check Email
            const emailPattern = /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if(fields[el].isEmail) { 
                if(!emailPattern.test(fields[el].value.toString().trim())) { validationErr.push('email')}
            }
            //check Length
            if(fields[el].isInLength) { 
                if(fields[el].value.length < fields[el].minLength) { validationErr.push('minLength') }
                else if(fields[el].value.length > fields[el].maxLength) { validationErr.push('maxLength') }
            }
            //check Match
            if(fields[el].isMatch) { 
                if(fields[el].value !== fields[fields[el].matchField].value){ validationErr.push('notMatch') }
            }
          
            isValid.push(validationErr.length > 0 ? false : true);
            const val = {
                ...fields[el],
                value: fields[el].value, 
                validation: validationErr,
            };
            Object.assign(checkedField, {[el]: val});
        });
        return({
            status: isValid.includes(false) ? false : true,
            fields: checkedField
        });
    }
    const validationError = (name, field) => {
        switch (field.validation[0]) {
            case 'required':
                return `Enter ${name}`;
            case 'email':
                return 'Email is not valid';
            case 'minLength':
                return `${name} must be at least ${field.minLength} characters`;
            case 'maxLength':
                return `${name} must be less than ${field.maxLength} characters`;
            case 'notMatch':
                return `${name} do not match with ${field.matchField}`;
            default:
                return '';
        }
    }

    return (
        <Box justifyContent="center">
            {!isRegistered ?
            <Card className={classes.card}>
                <CardContent className={classes.cardContent}>
                    <div className={classes.header}>
                        <Typography className={classes.title} component="h2" gutterBottom>Create your Account</Typography>
                        <Typography className={classes.subHeader} component="small" gutterBottom>simple form with validation</Typography>
                    </div>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <TextField
                                value={fields.firstname.value}
                                onChange={handleFieldChange('firstname')}
                                error={fields.firstname.validation.length > 0}
                                helperText={fields.firstname.validation.length > 0 ? validationError('firstname', fields.firstname) : ' '}
                                label="Firstname"
                                variant="outlined"
                                type="text"
                                className={classes.textField}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                value={fields.lastname.value}
                                onChange={handleFieldChange('lastname')}
                                error={fields.lastname.validation.length > 0}
                                helperText={fields.lastname.validation.length > 0 ? validationError('lastname', fields.lastname) : ' '}
                                label="Lastname"
                                variant="outlined"
                                type="text"
                                className={classes.textField}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                value={fields.username.value}
                                onChange={handleFieldChange('username')}
                                error={fields.username.validation.length > 0}
                                helperText={fields.username.validation.length > 0 ? validationError('username', fields.username) : ' '}
                                label="Username"
                                variant="outlined"
                                type="text"
                                className={classes.textField}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                value={fields.email.value}
                                onChange={handleFieldChange('email')}
                                error={fields.email.validation.length > 0}
                                helperText={fields.email.validation.length > 0 ? validationError('email', fields.email) : ' '}
                                label="Email"
                                variant="outlined"
                                type="email"
                                className={classes.textField}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                value={fields.password.value}
                                onChange={handleFieldChange('password')}
                                error={fields.password.validation.length > 0}
                                helperText={fields.password.validation.length > 0 ? validationError('password', fields.password) : ' '}
                                label="Password"
                                variant="outlined"
                                type="password"
                                className={classes.textField}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                value={fields.confirmPassword.value}
                                onChange={handleFieldChange('confirmPassword')}
                                error={fields.confirmPassword.validation.length > 0}
                                helperText={fields.confirmPassword.validation.length > 0 ? validationError('confirm password', fields.confirmPassword) : ' '}
                                label="Confirm Password"
                                variant="outlined"
                                type="password"
                                className={classes.textField}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                onClick={submitForm}
                                className={classes.btn}
                                variant="contained"
                                color="primary"
                                fullWidth
                                size="small">Register</Button>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
            :
            <Card className={classes.card}>
                <CardContent className={classes.cardContent}>
                    <div className={classes.header}>
                        <Typography className={classes.title} component="h2" gutterBottom>Welcome, {fields.firstname.value} {fields.lastname.value}</Typography>
                        <Typography className={classes.subHeader} component="small" gutterBottom>you are registered successfully</Typography>
                    </div>
                </CardContent>
            </Card>
            }
        </Box>   
    );
}