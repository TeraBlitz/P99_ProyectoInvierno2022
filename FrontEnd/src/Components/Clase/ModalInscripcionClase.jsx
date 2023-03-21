import React, { useState, useEffect, useMemo } from 'react';
import {
  Button,
  Modal,
  TextField,
  Box,
  Typography,
} from '@mui/material';
import { grey } from '@mui/material/colors';
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import MenuItem from '@mui/material/MenuItem';
import Actions from '../../Components/Clase/Actions';
import WaitList from '../../Components/Clase/WaitList';
import { getWaitList } from '../../api/waitList';
import { getStudents } from '../../api/students';
import { getPeriodos } from '../../api/Periodos';
import { getProfesors } from '../../api/profesors.js';
import {
  createClass, deleteClasses, getClasses, updateClass,
} from '../../api/classes.js';
import { subirClases, subirProfes } from '../../api/csv';
import {
  classAtributes, dayAtributes, niveloptions, classTemplate,
} from '../../utils/constants';
import HeaderInscripcionClase from '../../Components/Clase/HeaderInscripcionClase';

function ModalInscripcionClase() {
  
}

export default ModalInscripcionClase;