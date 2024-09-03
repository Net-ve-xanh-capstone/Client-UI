import React from 'react';
import Swal from 'sweetalert2';

const ShowAlert = (message, content, timer, onCloseCallback) => {
  return (
    <div>
      {showAlert(message, content, timer, onCloseCallback)}
    </div>
  );
};


const showAlert = (message, content, timer, onCloseCallback) => {
  let timerInterval;
  Swal.fire({
    title: message,
    html: content,
    timer: timer,
    timerProgressBar: true,
    didOpen: () => {
      Swal.showLoading();
      const timer = Swal.getPopup().querySelector('b');
      timerInterval = setInterval(() => {
        const secondsLeft = Math.round(Swal.getTimerLeft() / 1000);
        timer.textContent = `${secondsLeft}`;
      }, 100);
    },
    willClose: () => {
      clearInterval(timerInterval);
    },
    customClass: {
      timerProgressBar: 'custom-progress-bar',
    },
  }).then((result) => {
    if (result.dismiss === Swal.DismissReason.timer) {
      onCloseCallback();
    }
  });
};

export default ShowAlert;
