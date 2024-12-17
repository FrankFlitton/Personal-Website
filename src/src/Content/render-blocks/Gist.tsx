export const Gist = ({ id }: { id: string }) => {
  return (
    <p>
      <iframe
        id={`gist-${id}`}
        src={`/gist/?gist=${id}`}
        className="gist-iframe dark:outline dark:outline-black/50 dark:outline-1"
        width="600"
        height="auto"
        frameBorder="0"
      ></iframe>
    </p>
  );
};