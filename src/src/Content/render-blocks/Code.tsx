/**
 * markdown's builtin `pre-fromatted text`
 * @param props
 * @returns
 */
export const Code = (props: any) => {
  console.log("*** code", props);
  return (
    <span>
      <code className="before:content-[''] after:content-[''] font-normal bg-slate-500/30 text-sm p-1">
        {props.children}
      </code>
    </span>
  );
};
