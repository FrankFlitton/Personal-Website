export const IFrame = (
  props: React.DetailedHTMLProps<
    React.IframeHTMLAttributes<HTMLIFrameElement>,
    HTMLIFrameElement
  >
) => {
  return (
    <p>
      <iframe
        width="100%"
        height="600"
        frameBorder="0"
        style={{ maxWidth: 800, margin: "0 auto" }}
        {...props}
      />
    </p>
  );
};
