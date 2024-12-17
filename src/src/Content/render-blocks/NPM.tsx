import { mdiNpm } from "@mdi/js";
import Icon from "@mdi/react";

export const NPM = ({
  id,
  text,
}: {
  id: string;
  text: string;
}) => {
  return (
    <div>
      <a
        href={`https://npmjs.org/package/${id}`}
        target="_blank"
        className="grid grid-cols-4 no-underline justify-center"
      >
        <div className="col-span-3 border border-solid border-red-600 justify-center flex">
          <div className="p-3">
            <b>{id}</b>
            {text && <p className="m-0 line-clamp-2 leading-tight">{text}</p>}
            <small>www.npmjs.org</small>
          </div>
        </div>
        <div className="bg-red-600 col-span-1 content-center">
          <Icon className="p-1 mx-auto" path={mdiNpm} color="black" size={4} />
        </div>
      </a>
    </div>
  );
};
