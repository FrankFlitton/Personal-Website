import { mdiGithub, mdiLinkedin, mdiPalette, mdiTwitter } from "@mdi/js";
import Icon from "@mdi/react";

export const Socials = () => {
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
      icon: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
    },
    {
      name: "BeHance",
      url: "https://behance.net/frankflitton",
      icon: "M 7.108 4.447 C 7.826 4.447 8.482 4.511 9.076 4.638 C 9.669 4.764 10.175 4.972 10.598 5.262 C 11.021 5.551 11.349 5.935 11.582 6.415 C 11.815 6.895 11.931 7.487 11.931 8.192 C 11.931 8.953 11.758 9.588 11.413 10.096 C 11.067 10.604 10.555 11.02 9.879 11.344 C 10.81 11.612 11.505 12.081 11.963 12.751 C 12.422 13.42 12.651 14.228 12.651 15.173 C 12.651 15.934 12.503 16.594 12.207 17.152 C 11.911 17.709 11.513 18.164 11.011 18.516 C 10.51 18.869 9.939 19.129 9.298 19.298 C 8.653 19.468 7.988 19.553 7.321 19.552 L 0 19.552 L 0 4.447 L 7.108 4.447 Z M 6.685 10.56 C 7.277 10.56 7.764 10.419 8.145 10.137 C 8.526 9.855 8.717 9.397 8.716 8.763 C 8.716 8.411 8.652 8.121 8.525 7.896 C 8.398 7.671 8.229 7.493 8.017 7.367 C 7.805 7.24 7.562 7.152 7.288 7.103 C 7.005 7.054 6.718 7.028 6.43 7.03 L 3.323 7.03 L 3.323 10.563 L 6.685 10.56 Z M 6.876 16.969 C 7.189 16.97 7.501 16.938 7.806 16.874 C 8.102 16.81 8.364 16.705 8.589 16.557 C 8.814 16.409 8.994 16.208 9.129 15.954 C 9.262 15.701 9.33 15.376 9.33 14.981 C 9.33 14.206 9.112 13.652 8.674 13.321 C 8.237 12.989 7.658 12.824 6.94 12.824 L 3.323 12.824 L 3.323 16.97 L 6.876 16.969 Z M 16.83 16.652 C 17.28 17.089 17.93 17.308 18.776 17.308 C 19.383 17.308 19.904 17.156 20.342 16.853 C 20.779 16.55 21.047 16.229 21.146 15.89 L 23.789 15.89 C 23.367 17.202 22.717 18.14 21.843 18.704 C 20.968 19.268 19.911 19.55 18.67 19.55 C 17.81 19.55 17.034 19.413 16.343 19.138 C 15.653 18.864 15.067 18.472 14.587 17.964 C 14.107 17.456 13.737 16.85 13.477 16.145 C 13.217 15.44 13.086 14.664 13.086 13.819 C 13.086 13.001 13.219 12.24 13.487 11.535 C 13.755 10.829 14.137 10.22 14.63 9.705 C 15.123 9.191 15.713 8.785 16.396 8.489 C 17.08 8.193 17.839 8.045 18.671 8.045 C 19.602 8.045 20.412 8.225 21.104 8.585 C 21.795 8.945 22.363 9.428 22.807 10.035 C 23.251 10.641 23.572 11.332 23.769 12.108 C 23.967 12.884 24.037 13.695 23.981 14.541 L 16.091 14.541 C 16.133 15.51 16.379 16.216 16.83 16.652 Z M 20.226 10.899 C 19.866 10.504 19.319 10.307 18.586 10.307 C 18.106 10.307 17.707 10.388 17.391 10.549 C 17.074 10.712 16.82 10.912 16.63 11.152 C 16.439 11.392 16.306 11.645 16.229 11.913 C 16.151 12.181 16.105 12.421 16.091 12.632 L 20.978 12.632 C 20.835 11.872 20.584 11.293 20.226 10.899 Z M 15.577 5.214 L 21.682 5.214 L 21.682 6.907 L 15.577 6.907 L 15.577 5.214 Z",
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
        >
          <Icon className="p-1" path={social.icon} color="black" size={1.5} />
        </a>
      ))}
    </div>
  );
};
