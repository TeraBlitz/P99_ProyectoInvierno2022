/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-syntax */
/* eslint-disable prefer-destructuring */
/* eslint-disable react/button-has-type */
import React, { useEffect, useState } from 'react';
import {
  Box, Button, CircularProgress, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { getFormularioById } from '../../../api/formularios';
import { insertAlumnoFormulario, updateAlumnoFormulario } from '../../../api/alumnoFormularios';
import { EXAMEN_SOCIOECONOMICO_ID } from '../../../utils/constants';
import QuestionsGroup from './QuestionsGroup';

const getBackgroundColor = (section) => {
  if (section === 'Para el responsable de los gastos del hogar' || section === 'Otro responsable de los gastos del hogar') {
    return '#E1F3FB';
  }
  return 'white'; // Default background color
};

function ExamenSocioeconomico({ setSuccessCreateOpen, idAlumno, setFormularioCompleto, formularioData }) {
  const [formulario, setFormulario] = useState(null);
  const [formData, setFormData] = useState({});
  const [otherResponsible, setOtherResponsible] = useState('no');


  const parseFormularioData = (data) => {
    const newFormData = data;
      for(let section in formularioData) {
        let sectionResponse = formularioData[section];
        let index = 0;
        for(let question in newFormData[section]) {
          if(newFormData[section][question].type !== 'checkbox') {
            newFormData[section][question].answer = sectionResponse[index]
          } else {
            for(let answer in newFormData[section][question].answer) {
              let answersSet = new Set(sectionResponse[index]);
              newFormData[section][question].answer[answer] = answersSet.has(answer);
            }
          }
          index++;
        }
      }
      setFormData(newFormData);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (otherResponsible === 'no') {
      Object.entries(formData['Otro responsable de los gastos del hogar']).forEach(([pregunta]) => {
        formData['Otro responsable de los gastos del hogar'][pregunta].answer = 'No Aplica';
      });
    }
    Object.entries(formData).forEach(([section, questions]) => {
      Object.entries(questions).forEach(([question, typeAndAnswer]) => {
        const type = typeAndAnswer.type;
        const answer = typeAndAnswer.answer;
        if (type === 'checkbox') {
          const answers = Object.entries(answer).reduce((acc, [key, value]) => {
            if (value) {
              acc.push(key);
            }
            return acc;
          }, []);
          formData[section][question] = answers;
        } else if (type === 'number' && answer === '') {
          formData[section][question] = '0';
        } else {
          formData[section][question] = answer;
        }
      });
    });

    const insertData = {
      idAlumno,
      idFormulario: EXAMEN_SOCIOECONOMICO_ID,
      answers: JSON.stringify(formData),
    };
    if (!formularioData) {
      insertAlumnoFormulario(insertData)
        .then((data) => {
          if (data.status === 200) {
            setSuccessCreateOpen(false);
            setFormularioCompleto(true);
          }
      });
    } else {
      updateAlumnoFormulario(idAlumno, EXAMEN_SOCIOECONOMICO_ID, insertData)
        .then((data) => {
          if (data.status === 200) {
            setSuccessCreateOpen(false);  
            setFormularioCompleto(true);
          }
      });
    }


    // setSuccessCreateOpen(false);
    // You can handle form submission logic here
    window.location.reload();
    
  };

  const handleChange = (e, section) => {
    const { name: question, value: answer, checked } = e.target;
    let newData = {};
    if (formData[section][question].type === 'checkbox') {
      newData = {
        ...formData,
        [section]: {
          ...formData[section],
          [question]: {
            ...formData[section][question],
            answer: {
              ...formData[section][question].answer,
              [answer]: checked,
            },
          },
        },
      };
    } else {
      newData = {
        ...formData,
        [section]: {
          ...formData[section],
          [question]: {
            ...formData[section][question],
            answer,
          },
        },
      };
    }
    setFormData(newData);
  };

  useEffect(() => {
    const getFormulario = async () => {
      try {
        getFormularioById(EXAMEN_SOCIOECONOMICO_ID)
          .then((response) => response.json())
          .then((data) => {
            setFormulario(data.questions || []);
            const formAnswers = JSON.parse(JSON.stringify(data.questions));
            Object.entries(formAnswers).forEach(([section, questions]) => {
              Object.entries(questions).forEach(([question, typeAndOptions]) => {
                const possibleAnswers = typeAndOptions.options;
                const type = typeAndOptions.type;
                if (type === 'checkbox') {
                  const answersObject = possibleAnswers.reduce((acc, answer) => {
                    acc[answer] = false;
                    return acc;
                  }, {});
                  typeAndOptions.answer = answersObject;
                } else {
                  typeAndOptions.answer = possibleAnswers[0];
                }
                delete typeAndOptions.options;
              });
            });
            if (formularioData)
              parseFormularioData(formAnswers);
            else
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
            {section === 'Otro responsable de los gastos del hogar' ? (
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
                <QuestionsGroup
                  section={section}
                  questions={questions}
                  formData={formData}
                  handleChange={handleChange}
                />
                )}
              </Box>
            ) : (
              <QuestionsGroup
                section={section}
                questions={questions}
                formData={formData}
                handleChange={handleChange}
              />
            )}
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

export default ExamenSocioeconomico;
