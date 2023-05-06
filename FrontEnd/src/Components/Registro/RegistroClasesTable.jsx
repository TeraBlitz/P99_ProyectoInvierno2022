import Box from '@mui/material/Box';
import React, { useState } from 'react';
import {
  Typography,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import Modal from '@mui/material/Modal';
import ClaseModal from '../Clase/ClaseModal';
import Clase from '../Clase/Clase';
import RegistroClasesSearchbar from './RegistroClasesSearchbar';

function RegistroClasesTable({
  handleClick, filteredClasses, classNames, columns
}) {
  const [items, setItems] = useState([]);
  const [currentClase, setCurrentClase] = useState();
  const [openMoreInfo, setOpenMoreInfo] = useState(false);

  const handleMoreInfo = (clase) => {
    setCurrentClase(clase);
    setOpenMoreInfo(!openMoreInfo);
  };

  return (
    <>
      <Box
        sx={{
          textAlign: 'center',
          width: '100%',
          paddingX: '20px',
          paddingBottom: '10px',
          overflowY: 'scroll',
          display: { xs: 'block', md: 'none' },
        }}
      >
        {filteredClasses.length !== 0 ? (
          filteredClasses.map((e) => (
            <Clase
              handleClick={handleClick}
              handleMoreInfo={handleMoreInfo}
              key={e._id}
              clase={e}
            />
          ))
        ) : (
          <Box
            sx={{
              height: '100vh',
              display: 'flex',
              alignContent: 'center',
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            <Typography variant="h3" component="div" textAlign="center">
              No hay clases disponibles por el momento.
            </Typography>
          </Box>
        )}
      </Box>
      <Box
        sx={{
          display: { xs: 'none', md: 'flex' },
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <RegistroClasesSearchbar 
          classNames={classNames}
          setItems={setItems}
        />
        <Box
          sx={{
            m: 2,
            display: 'flex',
            width: '90%',
            height: 600,
            minWidth: '548px',
            '& .theme--ListaEspera': {
              bgcolor: 'lightyellow',
            },
            '& .theme--Inscrito': {
              bgcolor: 'lightgreen',
            },
          }}
        >
          <DataGrid
            sx={{ flexGrow: 1 }}
            rows={filteredClasses}
            columns={columns}
            disableSelectionOnClick
            getRowId={(row) => row._id}
            getRowHeight={() => 'auto'}
            filterModel={{
              items,
            }}
            getRowClassName={(params) => `theme--${params.row.status}`}
          />
        </Box>
        <Modal
          open={openMoreInfo}
          onClose={() => setOpenMoreInfo(!openMoreInfo)}
          sx={{ overflowY: 'scroll' }}
        >
          <ClaseModal clase={currentClase} />
        </Modal>
      </Box>
    </>
  );
}

export default RegistroClasesTable;
