import { useContext, useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { BrowserRouter as Router, Navigate, Route, Routes, useLocation } from "react-router";

import { useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import { AuthContext } from 'react-oauth2-code-pkce'
import { Box, Typography } from '@mui/material'

const ActvitiesPage = () => {
  return (<Box sx={{ p: 2, border: '1px dashed grey' }}>
    <ActivityForm onActivitiesAdded = {() => window.location.reload()} />
    <ActivityList />
  </Box>);
}

function App() {

  const { token, tokenData, logIn, logOut, isAuthenticated } = useContext(AuthContext);
  const dispatch = useDispatch();
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    if (token) {
      dispatch(setCredentials({token, user: tokenData}));
      setAuthReady(true);
    }
  }, [token, tokenData, dispatch]);
  
  return (
      <Router>
           {!token ? (
                <Box
                    sx={{
                      height: "100vh",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      textAlign: "center",
                    }}
                  >
                    <Typography variant="h4" gutterBottom>
                      Welcome to the Fitness Tracker App
                    </Typography>

                    <Typography variant="subtitle1" sx={{ mb: 3 }}>
                      Please login to access your activities
                    </Typography>

                    <Button variant="contained" color="primary" size="large" onClick={() => {
                              logIn(); 
                    }}>
                      LOGIN
                    </Button>
                </Box>
            )  : (
                <div>
                  <pre>Token: {JSON.stringify(tokenData, null, 2)}</pre>
                  <pre>Token:{token}</pre>

                  <Box sx={{ p: 2, border: '1px dashed grey' }}>
                    <Button variant="contained" color="secondary" onClick={logOut}>
                       Logout
                    </Button>

                      <Routes>
                        <Route path="/activities" element={<ActvitiesPage />}/>
                        <Route path="/activities/:id" element={<ActivityDetail />}/>

                        <Route path="/" element={token ? <Navigate to="/activities" replace/> : <div>Welcome! Please Login.</div>} />
                      </Routes>
                  </Box>
                </div>
              )
            }
      </Router>
  );
}

export default App
