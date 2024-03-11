import axios from "axios";
import { useState, useFormState } from "react";
import { Link } from 'react-router-dom'

import emailIcon from "../assets/mail.png";
import passwordIcon from "../assets/padlock.png";
import "./Login.css";

const loginURL = "http://localhost:8000/api/v1/user/login";

function LoginForm() {
  //React state
  const [isAction, setIsAction] = useState("Login");

  // const [formData, setFormData] = useState({
  //   email: "",
  //   password: "",
  // });

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // const errors = {
  //   loginError: "Invalid username or password",
  // }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const loginForm = {
      email,
      password
    }

    // const email = formData.email("email")

    console.log("Form: ", loginForm);

    try {
      axios
        .post(loginURL, {
          email: loginForm.email,
          password: loginForm.password
        })
        .then((response) => {
          console.log(response);

          if (response.data.status === 200) {
            // setIsError(true);
            console.log("Login Success");
            localStorage.setItem("token", response.data.token);
            window.location.href = "/book";
          } else {
            // setIsError({ name: "pass", message: errors.loginError })
            console.log("Login Failed");
          }
        });
    } catch (error) {
      console.log(error);
    }
  };


  // const [message, formAction] = useFormState(LoginForm, null);

  const renderForm = (
    <form onSubmit={handleSubmit}>
      <div className="container">
        <div className="header">
          <div className="text">{isAction}</div>
          <div className="underline"></div>
        </div>

        <div className="inputs">
          {/* {isAction === "Login" ? <div></div> : */}
          <div className="input">
            <img src={emailIcon} alt="" style={{ width: "75px" }} />
            <input required type="email" placeholder="Email" id="email" value={email} onChange={() => {
              setEmail(event.target.value)
            }} />
          </div>
          {/* } */}

          <div className="input">
            <img src={passwordIcon} alt="" style={{ width: "75px" }} />
            <input required type="password" placeholder="Password" id="password" value={password} onChange={() => {
              setPassword(event.target.value)
            }} />
          </div>



          {isAction === "Sign Up" ? <div></div> :
            <div className="forgot-password">
              Lost Password? <span>Click Here!</span>
            </div>}

          <div className="submit-container">
            <div >
              <Link to={`/register`}>
                <button className={isAction === "Login" ? "submit gray" : "submit"} >Sign Up</button>
              </Link>
            </div>
            <div >
              <Link to={`/login`}>
                <button className={isAction === "Sign Up" ? "submit gray" : "submit"} onClick={handleSubmit} >Login</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </form>
  );

  return (
    <>
      {renderForm}
    </>
  )
}
export default LoginForm;

// TODO remove, this demo shouldn't need to reset the theme.

// const defaultTheme = createTheme();

// export default function SignInSide() {

//   return (
//     <ThemeProvider theme={defaultTheme}>
//       <Stack alignItems="center" justifyContent="center" sx={{ height: "100vh", margin: "auto" }}>
//         <Card
//           sx={{
//             p: 0,
//             width: "100%",
//             maxWidth: 1200,
//             borderRadius: 8,
//             boxShadow: 24,
//           }}
//         >
//           <Grid container component="main" sx={{ height: "80vh" }}>
//             <CssBaseline />
//             <Grid
//               item
//               xs={false}
//               sm={4}
//               md={7}
//               sx={{
//                 backgroundImage:
//                   "url(https://source.unsplash.com/random?wallpapers)",
//                 backgroundRepeat: "no-repeat",
//                 backgroundColor: (t) =>
//                   t.palette.mode === "light"
//                     ? t.palette.grey[50]
//                     : t.palette.grey[900],
//                 backgroundSize: "cover",
//                 backgroundPosition: "center",
//               }}
//             />
//             <Grid
//               item
//               xs={12}
//               sm={8}
//               md={5}
//               component={Paper}
//               elevation={6}
//               square
//               sx={{
//                 display: "flex",
//                 flexDirection: "column",
//                 alignItems: "center",
//               }}
//             >
//               <Box
//                 sx={{
//                   my: 8,
//                   mx: 4,
//                   display: "flex",
//                   flexDirection: "column",
//                   alignItems: "center",
//                 }}
//               >
//                 <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
//                   <LockOutlinedIcon />
//                 </Avatar>
//                 <Typography component="h1" variant="h4" color={"black"}>
//                   Sign in
//                 </Typography>
//                 <Box
//                   component="form"
//                   noValidate
//                   onSubmit={handleSubmit}
//                   sx={{ mt: 1 }}
//                 >
//                   <TextField
//                     margin="normal"
//                     required
//                     fullWidth
//                     id="email"
//                     label="Email Address"
//                     name="email"
//                     autoComplete="email"
//                   />
//                   <TextField
//                     margin="normal"
//                     required
//                     fullWidth
//                     name="password"
//                     label="Password"
//                     type="password"
//                     id="password"
//                     autoComplete="current-password"
//                   />
//                   <FormControlLabel
//                     control={<Checkbox value="remember" color="primary" />}
//                     label="Remember me"
//                   />
//                   <Button
//                     type="submit"
//                     fullWidth
//                     variant="contained"
//                     sx={{ mt: 3, mb: 2 }}
//                   >
//                     Sign In
//                   </Button>
//                   <Grid container>
//                     <Grid item xs>
//                       <Link href="#" variant="body2">
//                         Forgot password?
//                       </Link>
//                     </Grid>
//                     <Grid item>
//                       <Link href="#" variant="body2">
//                         {"Don't have an account? Sign Up"}
//                       </Link>
//                     </Grid>
//                   </Grid>
//                   <Copyright sx={{ mt: 5 }} />
//                 </Box>
//               </Box>
//             </Grid>
//           </Grid>
//         </Card>
//       </Stack>
//     </ThemeProvider>
//   );
// }
