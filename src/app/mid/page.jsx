'use client'

import axios from "axios";
import React, { useEffect, useState } from "react";

const Mid = () => {
  const [authenticated, setAuthenticated] = useState(false);
  useEffect(() => {
    async function startBackend() {
      try {
        if (!authenticated) {
          const response = await axios.get(
            "http://localhost:4000/get-youtube-authorizationurl"
          );
          const authorizationUrl = response.data; // Assuming the response contains the authorization URL
          if (authorizationUrl) {
            window.location.href = authorizationUrl; // Redirect to the authorization URL
          }
        } 
      } catch (error) {
        if (error.message === "Already Authenticated") {
          setAuthenticated(true);
        } else {
          console.error("Error fetching authorization URL:", error);
        }
      }
    }

    startBackend();
  }, [authenticated]);
  return null;
};

export default Mid;
