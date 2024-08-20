import React, { useEffect } from 'react';
import styles from './page.module.css';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const ListRoundAward = ({ items }) => {
  useEffect(() => {
    console.log('award each round', items);
  }, [items]);

  return (
    <>
      <div style={{ padding: '10px' }}>
        <Accordion>
          <AccordionSummary
            style={{ fontSize: '16px' }}
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header">
            <div>{items.rank}</div>
          </AccordionSummary>
          <AccordionDetails>
            <div className={styles.roundContainer}>
              <ul className={styles.roundTableResponse}>
                <li
                  className={styles.roundHeader}
                  style={{
                    gridTemplateColumns: 'repeat(5, 1fr)',
                  }}>
                  <div className={styles.col}>Giải thưởng</div>
                  <div className={styles.col}>Số lượng</div>
                  <div className={styles.col}>Hiện kim</div>
                  <div className={styles.col}>Hiện vật</div>
                  <div className={styles.col}>Tương tác</div>
                </li>

                <li
                  className={styles.tableRow}
                  style={{
                    gridTemplateColumns: 'repeat(5, 1fr)',
                  }}>
                  <div className={styles.col} data-label="Giải thưởng">
                    {items.rank}
                  </div>
                  <div className={styles.col} data-label="Số lượng">
                    <div>{items.quantity}</div>
                  </div>
                  <div className={styles.col} data-label="Hiện kim">
                    <div>{items.cash}</div>
                  </div>
                  <div className={styles.col} data-label="Hiện vật">
                    <div>{items.artifact}</div>
                  </div>
                  <div className={styles.col} data-label="Tương tác">
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <IconButton
                        aria-label="edit"
                        size="large"
                        color="primary">
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        aria-label="delete"
                        size="large"
                        color="error">
                        <DeleteIcon />
                      </IconButton>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div className="flex justify-content-end mt-20">
              <button className="btn btn-outline-primary btn-lg">
                Thêm lịch chấm
              </button>
            </div>
          </AccordionDetails>
        </Accordion>
      </div>
    </>
  );
};

export default ListRoundAward;
