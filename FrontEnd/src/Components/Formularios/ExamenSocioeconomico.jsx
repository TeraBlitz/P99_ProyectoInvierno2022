/* eslint-disable no-restricted-syntax */
/* eslint-disable prefer-destructuring */
/* eslint-disable react/button-has-type */
import React, { useEffect, useState } from 'react';
import {
  Box, Button, CircularProgress, FormControl, FormControlLabel, FormLabel, Input, Radio, RadioGroup, Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { getFormularioById } from '../../api/formularios';
import { insertAlumnoFormulario } from '../../api/alumnoFormularios';

function ExamenSocioeconomico({ setSuccessCreateOpen, idAlumno, setFormularioCompleto }) {
  const [formulario, setFormulario] = useState(null);
  const [formData, setFormData] = useState({});
  const [otherResponsible, setOtherResponsible] = useState('no');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (otherResponsible === 'no') {
      Object.entries(formData['Otro responsable de los gastos del hogar']).forEach(([pregunta, respuesta]) => {
        formData['Otro responsable de los gastos del hogar'][pregunta] = 'No Aplica';
      });
    }
    const insertData = {
      idAlumno,
      idFormulario: '65dfb27b3777fb2a9442b5c2',
      answers: JSON.stringify(formData),
    };
    insertAlumnoFormulario(insertData)
      .then((data) => {
        if (data.status === 200) {
          setSuccessCreateOpen(false);
          setFormularioCompleto(true);
          console.log('submitted form', formData);
        }
      });
    // setSuccessCreateOpen(false);
    // You can handle form submission logic here
  };

  const handleChange = (e, section) => {
    const { name, value } = e.target;
    const newData = {
      ...formData,
      [section]: {
        ...formData[section],
        [name]: value,
      },
    };
    setFormData(newData);
  };

  useEffect(() => {
    const getFormulario = async () => {
      try {
        getFormularioById('65dfb27b3777fb2a9442b5c2')
          .then((response) => response.json())
          .then((data) => {
            setFormulario(data.questions || []);
            const formAnswers = JSON.parse(JSON.stringify(data.questions));
            for (const section in formAnswers) {
              if (Object.hasOwnProperty.call(formAnswers, section)) {
                const sectionQuestions = formAnswers[section];
                for (const question in sectionQuestions) {
                  if (Object.hasOwnProperty.call(sectionQuestions, question)) {
                    sectionQuestions[question] = sectionQuestions[question][0] === 'NUMBER' ? '0' : sectionQuestions[question][0];
                  }
                }
              }
            }
            setFormData(formAnswers);
          });
      } catch (error) {
        console.error('Error fetching formulario:', error);
      }
    };
    getFormulario();
  }, []);

  if (!formulario) {
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          height: '100vh',
          justifyContent: 'center',
          backgroundColor: 'white',
          borderRadius: 3,
          m: 2,
          p: 2,
          position: 'relative',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '35ch' },
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        backgroundColor: 'white',
        borderRadius: 3,
        m: 2,
        p: 2,
        position: 'relative',
      }}
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <Box
        sx={{
          typography: 'title',
          fontWeight: 'heavy',
          fontFamily: 'default',
          width: '100%',
          marginY: 2,
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        Examen Socioeconomico
      </Box>
      <Box sx={{ position: 'absolute', right: '0.5ch', top: '0.5ch' }}>
        <button
          style={{
            padding: 16, backgroundColor: 'transparent', border: 0, outline: 0, cursor: 'pointer',
          }}
          onClick={() => { setSuccessCreateOpen(false); }}
        >
          <CloseIcon />
        </button>
      </Box>
      <FormControl>
        {Object.entries(formulario).map(([section, questions], sectionIndex) => (
          <Box
            key={sectionIndex}
            sx={{
              my: 1, p: 2, backgroundColor: getBackgroundColor(section), borderRadius: '10px',
            }}
          >
            {section !== 'Familia1' && section !== 'Familia2' && (
            <FormLabel sx={{ color: 'black', fontSize: '16px', '&.Mui-focused': { color: 'black' } }}>
              {section}
            </FormLabel>
            )}
            {section === 'Otro responsable de los gastos del hogar' && (
            <Box sx={{ my: 1, padding: 1 }}>
              <FormLabel sx={{ color: 'black', fontSize: '16px', '&.Mui-focused': { color: 'black' } }}>
                Hay otro responsable de pago?
              </FormLabel>
              <RadioGroup
                row
                value={otherResponsible}
                onChange={(e) => { setOtherResponsible(e.target.value); }}
              >
                <FormControlLabel value="yes" control={<Radio />} label="Sí" />
                <FormControlLabel value="no" control={<Radio />} label="No" />
              </RadioGroup>
              {otherResponsible === 'yes' && (
                Object.entries(questions).map(([question, possibleAnswers], index) => (
                  <Box key={`${section}-${index}`} sx={{ my: 1, padding: 1 }}>
                    <FormLabel sx={{ color: 'black', fontSize: '16px', '&.Mui-focused': { color: 'black' } }}>
                      {question}
                    </FormLabel>
                    {possibleAnswers[0] === 'NUMBER' ? (
                      <Input
                        type="number"
                        name={question}
                        value={formData[section][question]}
                        inputProps={{ min: 0 }}
                        onChange={(e) => { handleChange(e, section); }}
                        sx={{
                          height: '20px',
                          width: '60px',
                          paddingLeft: '10px',
                          fontSize: '14px',
                        }}
                      />
                    ) : (
                      <RadioGroup
                        row
                        name={question}
                        value={formData[section][question]}
                        onChange={(e) => { handleChange(e, section); }}
                        sx={{ my: 0, py: 0, '& .MuiFormControlLabel-root': { my: 0, py: 0 } }}
                      >
                        {possibleAnswers.map((answer, idx) => (
                          <FormControlLabel
                            key={idx}
                            value={answer}
                            control={<Radio sx={{ my: 0, py: 0 }} />}
                            label={<span style={{ color: 'gray', fontSize: '14px' }}>{answer}</span>}
                            sx={{ my: 0, py: 0 }}
                          />
                        ))}
                      </RadioGroup>
                    )}
                  </Box>
                ))
              )}
            </Box>
            )}
            {section !== 'Otro responsable de los gastos del hogar'
            && Object.entries(questions).map(([question, possibleAnswers], index) => (
              <Box key={`${section}-${index}`} sx={{ my: 1, padding: 1 }}>
                <FormLabel sx={{ color: 'black', fontSize: '16px', '&.Mui-focused': { color: 'black' } }}>
                  {question}
                </FormLabel>
                {possibleAnswers[0] === 'NUMBER' ? (
                  <Input
                    type="number"
                    name={question}
                    value={formData[section][question]}
                    inputProps={{ min: 0 }}
                    onChange={(e) => { handleChange(e, section); }}
                    sx={{
                      height: '20px',
                      width: '60px',
                      paddingLeft: '10px',
                      fontSize: '14px',
                    }}
                  />
                ) : (
                  <RadioGroup
                    row
                    name={question}
                    value={formData[section][question]}
                    onChange={(e) => { handleChange(e, section); }}
                    sx={{ my: 0, py: 0, '& .MuiFormControlLabel-root': { my: 0, py: 0 } }}
                  >
                    {possibleAnswers.map((answer, idx) => (
                      <FormControlLabel
                        key={idx}
                        value={answer}
                        control={<Radio sx={{ my: 0, py: 0 }} />}
                        label={<span style={{ color: 'gray', fontSize: '14px' }}>{answer}</span>}
                        sx={{ my: 0, py: 0 }}
                      />
                    ))}
                  </RadioGroup>
                )}
              </Box>
            ))}

          </Box>
        ))}
      </FormControl>
      <Button
        variant="contained"
        color="error"
        sx={{ mr: 2 }}
        onClick={() => { setSuccessCreateOpen(false); }}
      >
        Cancelar
      </Button>
      <Button variant="contained" type="submit" size="medium">
        Guardar
      </Button>
    </Box>
  );
}

const getBackgroundColor = (section) => {
  if (section === 'Para el responsable de los gastos del hogar' || section === 'Otro responsable de los gastos del hogar') {
    return '#E1F3FB';
  }
  return 'white'; // Default background color
};
export default ExamenSocioeconomico;
