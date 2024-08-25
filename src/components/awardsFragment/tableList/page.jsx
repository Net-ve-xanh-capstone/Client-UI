import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import React, { memo, useState } from 'react';
import AddingModal from '../addingModal/page.jsx';
import ListRoundAward from '../listAward/page.jsx';

const ListAward = memo(({ items, recallData }) => {
  const [openAdd, setOpenAdd] = useState(false);

  const triggerOpenPopup = () => {
    setOpenAdd(true);
  };

  const triggerHide = () => {
    setOpenAdd(false);
  };

  return (
    <>
      <AddingModal
        modalShow={openAdd}
        onHide={triggerHide}
        roundId={items?.id}
        recallData={recallData}
      />
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
                <ListRoundAward
                  key={val.id}
                  items={val}
                  recallData={recallData}
                />
              ))}
            <div className="flex justify-content-end mt-20">
              <button
                className="btn btn-outline-primary btn-lg"
                onClick={() => triggerOpenPopup()}>
                Thêm giải thưởng
              </button>
            </div>
          </AccordionDetails>
        </Accordion>
      </div>
    </>
  );
});

export default ListAward;
