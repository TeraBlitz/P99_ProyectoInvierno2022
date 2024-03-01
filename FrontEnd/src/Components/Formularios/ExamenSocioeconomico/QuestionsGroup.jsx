import {
  Box, Checkbox, FormControlLabel, FormLabel, Input, Radio, RadioGroup,
} from '@mui/material';
import React from 'react';

function QuestionsGroup({
  section, questions, formData, handleChange,
}) {
  return (
    <>
      {
  Object.entries(questions).map(([question, typeAndOptions], index) => (
    <Box key={`${section}-${index}`} sx={{ my: 1, padding: 1 }}>
      <FormLabel sx={{ color: 'black', fontSize: '16px', '&.Mui-focused': { color: 'black' } }}>
        {question}
      </FormLabel>
      {typeAndOptions.type === 'number' ? (
        <Input
          type="number"
          name={question}
          value={formData[section][question].answer}
          inputProps={{ min: 0 }}
          onChange={(e) => { handleChange(e, section); }}
          sx={{
            height: '20px',
            width: '60px',
            paddingLeft: '10px',
            fontSize: '14px',
          }}
        />
      ) : typeAndOptions.type === 'checkbox' ? (
        typeAndOptions.options.map((answer, idx) => (
          <FormControlLabel
            key={idx}
            control={(
              <Checkbox
                value={answer}
                checked={formData[section][question][answer]}
                onChange={(e) => handleChange(e, section)}
                name={question}
                sx={{ my: 0, py: 0 }}
              />
                )}
            label={<span style={{ color: 'gray', fontSize: '14px' }}>{answer}</span>}
            sx={{ my: 0, py: 0 }}
          />
        ))
      ) : (
        <RadioGroup
          row
          name={question}
          value={formData[section][question].answer}
          onChange={(e) => { handleChange(e, section); }}
          sx={{ my: 0, py: 0, '& .MuiFormControlLabel-root': { my: 0, py: 0 } }}
        >
          {typeAndOptions.options.map((answer, idx) => (
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
  }
    </>
  );
}

export default QuestionsGroup;
