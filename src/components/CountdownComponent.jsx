import React from 'react';
import Countdown from 'react-countdown';

const Completionist = () => <span>Đã kết thúc!</span>;

const renderer = ({ days, hours, minutes, seconds, completed }) => {
  if (completed) {
    // Render a completed state
    return <Completionist />;
  } else {
    // Render a countdown
    return (
      <span>
        {days} ngày, {hours} giờ, {minutes} phút
      </span>
    );
  }
};

const CountdownComponent = ({ endtimeString }) => {
  const now = Date.now();
  const endTime = new Date(endtimeString).getTime();

  // Tính toán thời gian còn lại
  const timeLeft = endTime - now;

  return <Countdown date={Date.now() + timeLeft} renderer={renderer} />;
};

export default CountdownComponent;
