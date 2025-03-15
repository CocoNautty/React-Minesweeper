// Format seconds into mm:ss
export const formatTime = (milseconds) => {
    const minutes = Math.floor(milseconds / 6000);
    const remainingSeconds = Math.floor((milseconds-minutes*6000) / 100);
    const remainMilSeconds = milseconds % 100;
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');
    const formattedMilSeconds = String(remainMilSeconds).padStart(2 , '0');
    return `${formattedMinutes}:${formattedSeconds}.${formattedMilSeconds}`;
  };
