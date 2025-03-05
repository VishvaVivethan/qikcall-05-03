import React,{useState} from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CProgress, CProgressBar, CRow } from '@coreui/react'
import { DocsExample } from '../../../components'
import { Container,Grid,Typography,TextField } from '@mui/material'
import { Input as BaseInput } from '@mui/base/Input';
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import { experimentalStyled as styled } from '@mui/material/styles';


const Input = React.forwardRef(function CustomInput(props, ref) {
  return (
    <BaseInput
      slots={{
        
        root: RootDiv,
        input: 'input',
        textarea: TextareaElement,
      }}
      {...props}
      ref={ref}
    />
  );
});

const RootDiv = styled('div')`
  display: flex;
  max-width: 100%;
`;

const TextareaElement = styled(TextareaAutosize)(
  ({ theme }) => `
  width:600px;
  font-family: Anton, sans-serif;
font-style: italic;
  font-size: 0.875rem;
  
  line-height: 1.5rem;
  padding: 8px 12px;
  border-radius: 2px;
  color: ${theme.palette.mode === 'dark' ? '#2d2859' : "#2d2859"};
  background: ${theme.palette.mode === 'dark' ? '#fff' : "#fff"};
  border: 1px solid ${theme.palette.mode === 'dark' ? '#818283' : "#818283"};
  box-shadow: 0px 2px 4px ${
    theme.palette.mode === 'dark' ? 'rgba(0,0,0, 0.5)' : 'rgba(0,0,0, 0.05)'
  };
  &:hover {
    border-color: #2d2859;
  }

  &:focus {
    border-color: #2d2859;
    box-shadow: 0 0 0 3px #fff;
  } `,
);

const Progress = () => {

  const [name,setName]= useState('')
const [email,setEmail]= useState('')
const [number,setNumber]= useState('')
const [message,setMessage]= useState('')

  return (
    <Container>
       <Grid xs={5} container  direction="column"  justifyContent="center"  alignItems="flex-start">
          <Typography id="form-head" >
               <b>Send Us a Message </b>
           </Typography>
           <Typography id="form-text" >
               <b>Give us chance to serve and bring magic to your brand</b>
           </Typography>
           <Grid mt={4}  container direction="row" justifyContent="space-between" alignItems="center">
           <Grid >
           <Typography id="input-text" className='mb-2' >
               Fullname
           </Typography>
           <TextField
      id="outlined-basic"
      
      value={name}
      sx={{
        "& .MuiOutlinedInput-input": {
          color: "#000",
          height: 5,
        },
        "& .MuiOutlinedInput-root": {
          "&.Mui-focused fieldset": {
            borderColor: name ? "#2d2859" : "#2d2859", // Change border color based on value
          },
          backgroundColor: name ? "#f0f0f0" : "#fff", // Change background color based on value
        },
      }}
      variant="outlined"
      onChange={(e) => { setName(e.target.value); }}
    />
           </Grid>
    <Grid>
    <Typography className='mb-2' id="input-text">
              Email
           </Typography>
           <TextField
      id="outlined-basic"
      
      value={email}
      sx={{
        "& .MuiOutlinedInput-input": {
          color: "#000",
          height: 5,
        },
        "& .MuiOutlinedInput-root": {
          "&.Mui-focused fieldset": {
            borderColor: email ? "#2d2859" : "#2d2859", // Change border color based on value
          },
          backgroundColor: email ? "#f0f0f0" : "#fff", // Change background color based on value
        },
      }}
      variant="outlined"
      onChange={(e) => { setEmail(e.target.value); }}
    />
    </Grid>
           </Grid>
           <Grid xs={12} mt={2} container direction="row" justifyContent="flex-start"  alignItems="center">
           <Typography className='mb-2' id="input-text">
             Phone number
           </Typography>
           <TextField
      id="outlined-basic"
      fullWidth
      value={number}
      sx={{
        "& .MuiOutlinedInput-input": {
          color: "#000",
          height: 5,
        },
        "& .MuiOutlinedInput-root": {
          "&.Mui-focused fieldset": {
            borderColor: number ? "#2d2859" : "#2d2859", // Change border color based on value
          },
          backgroundColor: number ? "#f0f0f0" : "#fff", // Change background color based on value
        },
      }}
      variant="outlined"
      onChange={(e) => { setNumber(e.target.value); }}
    />
           </Grid>
           <Grid xs={12} mt={2} container direction="column" justifyContent="flex-start" alignItems="flex-start">
           <Typography className='mb-2' id="input-text">
             Message
           </Typography>
           <Input aria-label="Demo input" value={message} onChange={(e) => { setMessage(e.target.value); }} multiline placeholder="May I Help You" />
           </Grid>
           </Grid>
    </Container>
  )
}

export default Progress
