function nowDate() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

function convertUnixTimeToDate(unixTimeStamp) {
  return new Date(unixTimeStamp * 1000);
}

function timeAgo(inputTime) {
  if (inputTime == null) {
    return '';
  }
  const now = new Date();
  const past = new Date(inputTime);
  const diffInSeconds = Math.floor((now - past) / 1000);

  const units = [
    { label: '년', seconds: 60 * 60 * 24 * 365 },
    { label: '달', seconds: 60 * 60 * 24 * 30 },
    { label: '주', seconds: 60 * 60 * 24 * 7 },
    { label: '일', seconds: 60 * 60 * 24 },
    { label: '시간', seconds: 60 * 60 },
    { label: '분', seconds: 60 },
  ];

  for (const unit of units) {
    const interval = Math.floor(diffInSeconds / unit.seconds);
    if (interval >= 1) {
      return `${interval}${unit.label} 전`;
    }
  }

  return '방금 전';
}

export { nowDate, convertUnixTimeToDate, timeAgo };
