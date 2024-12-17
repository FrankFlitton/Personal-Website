export const YouTube = ({ id }: { id: string }) => {
  return (
    <p>
      <iframe
        src={"https://www.youtube.com/embed/" + id}
        width="100%"
        height="480"
        frameBorder="0"
        allowFullScreen
        style={{ maxWidth: 800, margin: "0 auto" }}
      ></iframe>
    </p>
  );
};