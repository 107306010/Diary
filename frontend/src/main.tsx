import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App.tsx'
import { DiaryProvider } from "./hooks/useDiary.tsx";
import './index.css'

import CssBaseline from "@mui/material/CssBaseline";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <DiaryProvider>
      <CssBaseline />
      <App />
    </DiaryProvider>
  </React.StrictMode>,
)
