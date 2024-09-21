
const TimestampToDate = ({ timestamp }) => {
  // Convert the Unix timestamp to a JavaScript Date object
  const date = new Date(timestamp * 1000); // Multiply by 1000 to convert from seconds to milliseconds

  // Format the date (you can customize the format)
  const formattedDate = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div>
      <p>Timestamp: {timestamp}</p>
      <p>Date: {formattedDate}</p>
    </div>
  );
};

export default TimestampToDate;
