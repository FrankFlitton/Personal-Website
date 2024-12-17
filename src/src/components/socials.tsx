import { behancePath, mediumNoPaddingPath, xComPath } from "@/const/const";
import { mdiGithub, mdiLinkedin } from "@mdi/js";
import Icon from "@mdi/react";
import { useId } from "react";

export const Socials = () => {
  const id = useId();

  const socials = [
    {
      name: "GitHub",
      url: "https://github.com/frankflitton",
      icon: mdiGithub,
    },
    {
      name: "LinkedIn",
      url: "https://linkedin.com/in/frankflitton",
      icon: mdiLinkedin,
    },
    {
      name: "X",
      url: "https://x.com/frankflitton",
      icon: xComPath,
    },
    {
      name: "BeHance",
      url: "https://behance.net/frankflitton",
      icon: behancePath,
    },
    {
      name: "Medium",
      url: "https://frankflitton.medium.com/",
      icon: mediumNoPaddingPath,
    },
  ];

  return (
    <div className="flex flex-row justify-start items-center gap-4">
      {socials.map((social) => (
        // eslint-disable-next-line react/jsx-key
        <a
          className="text-2xl hover:underline bg-white"
          href={social.url}
          target="_blank"
          title={`Frank Flitton on ${social.name}`}
          key={`${social.name}_${id}`}
        >
          <Icon className="p-1" path={social.icon} color="black" size={1.5} />
        </a>
      ))}
    </div>
  );
};
