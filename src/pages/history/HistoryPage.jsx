import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FaHistory } from 'react-icons/fa';
import Header from '../../components/common/header/HeaderVersion2';
import Footer from '../../components/common/footer/Footer';
import useFetchData from '../../hooks/useQueryData.js';
import DotLoaderCustom from '../../components/dotLoader/DotLoader.jsx';
import { formatDate } from '../../utils/formatDate.js';
import { userAvatar } from '../../constant/imageDefault.js';
import {
  Timeline,
  TimelineConnector, TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
} from '@mui/lab';
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  Typography,
} from '@mui/material';

const TRACKING_PAINTING = 'paintings/tracking';
const HistoryPage = () => {
  const { paintingId } = useParams();
  const [history, setHistory] = useState(null);
  const [created, setCreated] = useState(null);
  const [reviewed, setReviewed] = useState(null);
  const [submitted, setSubmitted] = useState(null);
  const [updated, setUpdated] = useState(null);
  const [finalDecision, setFinalDecision] = useState(null);

  const { isLoading, isError, data, error } = useFetchData(TRACKING_PAINTING, paintingId);

  useEffect(() => {
    if (data) {
      const response = data?.data?.result;
      const event = data?.data?.result?.history;
      setHistory(response);
      setCreated(event?.created);
      setReviewed(event?.reviewed);
      setSubmitted(event?.submitted);
      setUpdated(event?.updated);
      setFinalDecision(event?.finalDecision);
    }
    console.log(history);
  }, [data]);

  if (isLoading) return <span><DotLoaderCustom /></span>;

  if (isError) return <p>Error: {error.message}</p>;

  return (
    <div>
      <Header />
      <section className="flat-title-page inner">
        <div className="overlay"></div>
        <div className="themesflat-container">
          <div className="row">
            <div className="col-md-12">
              <div className="page-title-heading mg-bt-12">
                <h1 className="heading text-center">LỊCH SỬ</h1>
              </div>
              <div className="breadcrumbs style2">
                <ul>
                  <li><Link to="/">Trang chủ</Link></li>
                  <li>Lịch sử</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="tf-activity s1 tf-section">
        <div className="themesflat-container">
          <Grid container flex>
            <Grid container flex justifyContent="center" xs={12} md={12}>
              <Card sx={{ maxWidth: '500px', p: '10px' }}>
                <CardHeader
                  sx={{
                    '& .MuiCardHeader-title': {
                      fontWeight: 700,
                      fontSize: '14px',
                      color: '#14141F',
                    },
                    '& .MuiCardHeader-subheader': {
                      fontSize: '20px',
                      fontWeight: 700,
                      color: '#14141F',
                    },
                  }}
                  avatar={
                    <Avatar aria-label="recipe">
                      <img src={userAvatar} alt="avatar" />
                    </Avatar>
                  }
                  title={'Tác giả: ' + history?.ownerName}
                  subheader={'Tên tranh: ' + history?.name}
                />
                <CardMedia
                  component="img"
                  sx={{
                    height: '40rem',
                    width: '100%',
                    objectFit: 'contain',
                  }}
                  image={history?.image}
                  alt="Bức tranh"
                />
                <CardContent>

                </CardContent>
              </Card>
              <Timeline position="alternate">
                {created?.time && (
                  <TimelineItem>
                    <TimelineSeparator>
                      <TimelineConnector />
                      <TimelineDot>
                        <FaHistory size="30px" />
                      </TimelineDot>
                      <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent sx={{ py: '22px', px: 2, fontSize: 14 }}>
                      <Typography variant="h5" component="span">
                        {created?.message} vào ngày
                      </Typography>
                      <Typography color="text.primary">{formatDate(created?.time)}</Typography>
                    </TimelineContent>
                  </TimelineItem>
                )}
                {reviewed?.time && (
                  <TimelineItem>
                    <TimelineOppositeContent
                      sx={{ m: 'auto 0' }}
                      variant="body2"
                      fontSize={14}
                      color="text.secondary"
                    >
                      {formatDate(reviewed?.time)}
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                      <TimelineConnector />
                      <TimelineDot color="primary">
                        <FaHistory size="30px" />
                      </TimelineDot>
                      <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent sx={{ py: '22px', px: 2, fontSize: 14 }}>
                      <Typography variant="h6" component="span">
                        {reviewed?.message} vào ngày
                      </Typography>
                      <Typography color="text.primary">{formatDate(reviewed?.time)}</Typography>
                    </TimelineContent>
                  </TimelineItem>
                )}
                {submitted?.time && (
                  <TimelineItem>
                    <TimelineSeparator>
                      <TimelineConnector />
                      <TimelineDot color="primary" variant="outlined">
                        <FaHistory size="30px" />
                      </TimelineDot>
                      <TimelineConnector sx={{ bgcolor: 'secondary.main' }} />
                    </TimelineSeparator>
                    <TimelineContent sx={{ py: '22px', px: 2, fontSize: 14 }}>
                      <Typography variant="h6" component="span">
                        {submitted?.message} vào ngày
                      </Typography>
                      <Typography color="text.primary">{formatDate(submitted?.time)}</Typography>
                    </TimelineContent>
                  </TimelineItem>
                )}
                {updated?.time && (
                  <TimelineItem>
                    <TimelineSeparator>
                      <TimelineConnector sx={{ bgcolor: 'secondary.main' }} />
                      <TimelineDot color="secondary">
                        <FaHistory size="30px" />
                      </TimelineDot>
                      <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent sx={{ py: '22px', px: 2, fontSize: 14 }}>
                      <Typography variant="h6" component="span">
                        {updated?.message} vào ngày
                      </Typography>
                      <Typography color="text.primary">{formatDate(updated?.time)}</Typography>
                    </TimelineContent>
                  </TimelineItem>
                )}
                {finalDecision?.time && (
                  <TimelineItem>
                    <TimelineSeparator>
                      <TimelineConnector />
                      <TimelineDot color="primary" variant="outlined">
                        <FaHistory size="30px" />
                      </TimelineDot>
                      <TimelineConnector sx={{ bgcolor: 'secondary.main' }} />
                    </TimelineSeparator>
                    <TimelineContent sx={{ py: '22px', px: 2, fontSize: 14 }}>
                      <Typography variant="h6" component="span">
                        {finalDecision?.message} vào ngày
                      </Typography>
                      <Typography color="text.primary">{formatDate(finalDecision?.time)}</Typography>
                    </TimelineContent>
                  </TimelineItem>
                )}
              </Timeline>
            </Grid>

          </Grid>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default HistoryPage;
