import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import React from 'react';
import ListRoundAward from '../listAward/page.jsx';

const ListAward = ({ items }) => {
  return (
    <>
      <div style={{ padding: '10px' }}>
        <Accordion>
          <AccordionSummary
            style={{ fontSize: '16px' }}
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header">
            <div>{items?.name}</div>
          </AccordionSummary>
          <AccordionDetails>
            {items?.award?.length > 0 &&
              items?.award?.map(val => (
                <ListRoundAward key={val.id} items={val} />
              ))}
          </AccordionDetails>
        </Accordion>
      </div>
    </>
  );
};

export default ListAward;
