import {
  AccessTimeFilled,
  ArrowBack,
  CalendarMonth,
  ColorLens,
  Paid,
  School,
  Topic,
} from '@mui/icons-material';
import {
  IconButton,
  Stack,
  Step,
  StepConnector,
  stepConnectorClasses,
  StepLabel,
  Stepper,
  styled,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { getById } from '../../api/contestStaffApi';
import LoadingSkeleton from '../../components/loading/LoadingSkeleton';
import ContestFragment from '../ContestFragment';
import LevelFragment from '../LevelFragment';
import ResourceFragment from '../ResourceFragment';
import RoundFragment from '../RoundFragment';
import ScheduleFragment from '../ScheduleFragment';
import CompetitorFragment from '../competitorsFragment';
import AwardsFragment from '../awardsFragment/page..jsx';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import PaintingPage from '../../pages/paintingPage/page.jsx';
import TopicFragment from '../TopicFragment';
import styles from './style.module.css';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { AccountCircle } from '@mui/icons-material';

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage: 'linear-gradient(227.3deg, #8a208c 0%, #181b81 100.84%)',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage: 'linear-gradient(227.3deg, #8a208c 0%, #181b81 100.84%)',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor: '#eaeaf0',
    borderRadius: 1,
    ...theme.applyStyles('dark', {
      backgroundColor: theme.palette.grey[800],
    }),
  },
}));

const ColorlibStepIconRoot = styled('div')(({ theme }) => ({
  backgroundColor: '#ccc',
  zIndex: 1,
  color: '#fff',
  width: 50,
  height: 50,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...theme.applyStyles('dark', {
    backgroundColor: theme.palette.grey[700],
  }),
  variants: [
    {
      props: ({ ownerState }) => ownerState.active,
      style: {
        backgroundImage:
          'linear-gradient(227.3deg, #8a208c 0%, #181b81 100.84%)',
        boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
      },
    },
    {
      props: ({ ownerState }) => ownerState.completed,
      style: {
        backgroundImage:
          'linear-gradient(227.3deg, #8a208c 0%, #181b81 100.84%)',
      },
    },
  ],
}));

function ColorlibStepIcon(props) {
  const { active, completed, className } = props;
  const icons = {
    1: <ColorLens />,
    2: <School />,
    3: <AccessTimeFilled />,
    4: <Topic />,
    5: <Paid />,
    6: <CardGiftcardIcon />,
    7: <CalendarMonth />,
    8: <AccountCircle />,
    9: <MenuBookIcon />,
  };

  return (
    <ColorlibStepIconRoot
      ownerState={{ completed, active }}
      className={className}>
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

function ContestDetail({ contest, handleBack }) {
  const [contestDes, setContestDes] = useState();
  const [statusOfRound, setStatusRound] = useState(null);
  const [activeStep, setActiveStep] = React.useState(2);
  useEffect(() => {
    getContestDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getContestDetail = async () => {
    try {
      const { data } = await getById(contest.id);
      setStatusRound(data?.result.status);
      setContestDes(data?.result);
    } catch (e) {
      console.log('err', e);
    }
  };

  const steps = [
    {
      title: 'Cuộc thi',
      component: (
        <ContestFragment
          contestFrag={contestDes}
          getContestDetail={getContestDetail}
          statusOfRound={statusOfRound}
        />
      ),
    },
    {
      title: 'Đối tượng',
      component: (
        <LevelFragment
          levelFrag={contestDes}
          getContestDetail={getContestDetail}
          statusOfRound={statusOfRound}
        />
      ),
    },
    {
      title: 'Vòng thi',
      component: (
        <RoundFragment
          scheduleFrag={contestDes}
          roundFrag={contestDes}
          getContestDetail={getContestDetail}
          statusOfRound={statusOfRound}
        />
      ),
    },
    {
      title: 'Chủ đề',
      component: (
        <TopicFragment
          topicFrag={contestDes}
          getContestDetail={getContestDetail}
          statusOfRound={statusOfRound}
        />
      ),
    },

    {
      title: 'Tài trợ',
      component: (
        <ResourceFragment
          resourceFrag={contestDes}
          getContestDetail={getContestDetail}
          statusOfRound={statusOfRound}
        />
      ),
    },
    {
      title: 'Giải thưởng',
      component: (
        <AwardsFragment
          scheduleFrag={contestDes}
          getContestDetail={getContestDetail}
          statusOfRound={statusOfRound}
        />
      ),
    },
    {
      title: 'Bài thi',
      component: (
        <PaintingPage
          scheduleFrag={contestDes}
          getContestDetail={getContestDetail}
          contestId={contest.id}
          statusOfRound={statusOfRound}
        />
      ),
    },
    {
      title: 'Lịch chấm',
      component: (
        <ScheduleFragment
          scheduleFrag={contestDes}
          getContestDetail={getContestDetail}
          statusOfRound={statusOfRound}
        />
      ),
    },
    {
      title: 'Thí Sinh',
      component: (
        <CompetitorFragment
          resourceFrag={contestDes}
          getContestDetail={getContestDetail}
          statusOfRound={statusOfRound}
        />
      ),
    },
    // Add more tabs here as needed
  ];

  const totalSteps = () => {
    return steps.length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const handleStep = step => () => {
    setActiveStep(step);
  };

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBackStep = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  return contestDes ? (
    <div className={styles.containerDetail}>
      <div className={styles.heading}>
        <div className={styles.iconBox}>
          <IconButton onClick={handleBack}>
            <ArrowBack className={styles.backIcon} />
          </IconButton>
        </div>
        <div>
          <h2 className={styles.titleHeader}>{contestDes?.name}</h2>
        </div>
      </div>

      <div className={styles.tabs} data-tab-count={steps.length}>
        <Stack sx={{ width: '100%' }} spacing={4}>
          <Stepper
            alternativeLabel
            activeStep={activeStep}
            connector={<ColorlibConnector />}>
            {steps.map((item, index) => (
              <Step
                className={styles.stepperBtn}
                key={item.title}
                onClick={handleStep(index)}>
                <StepLabel
                  StepIconComponent={ColorlibStepIcon}
                  sx={{
                    ' & .MuiStepLabel-label': {
                      fontSize: '1.8rem',
                      fontWeight: '700',
                    },
                    ' & .MuiStepLabel-label.Mui-active': {
                      fontWeight: 'bold',
                      paddingBottom: '10px',
                      borderBottom: '3px solid #8a208c',
                    },
                  }}>
                  {item.title}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </Stack>

        {/*ending bottom slider animation */}
        {/*ending bottom slider animation */}
        <div>
          <React.Fragment>
            <section className={styles.contentSection}>
              <h2
                style={{
                  marginTop: '2rem',
                }}>
                {steps[activeStep].title}
              </h2>
              {steps[activeStep].component}
            </section>

            {/**
             <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
             <Button
             color="inherit"
             disabled={activeStep === 0}
             onClick={handleBackStep}
             sx={{ mr: 1 }}>
             Quay lại
             </Button>
             <Box sx={{ flex: '1 1 auto' }} />
             <Button onClick={handleNext} sx={{ mr: 1 }}>
             Tiếp theo
             </Button>
             </Box>
             */}
          </React.Fragment>
        </div>
      </div>
    </div>
  ) : (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        padding: '30px',
      }}>
      <LoadingSkeleton height="50px" radius="5px" />
      <LoadingSkeleton height="200px" radius="10px" />
    </div>
  );
}

export default ContestDetail;
