import { Page } from "@/components/page";
import { MDLoadDir, MDLoadFile } from "@/Content/loader";
import { MDRenderer } from "@/Content/renderer";
import { FeatureProjectData, MDXDocument } from "@/types";
import { GetStaticProps } from "next";

export const getStaticProps: GetStaticProps = async () => {
  const homeSource = await MDLoadFile("../content/pages/home.md");
  const projectSources = await MDLoadDir<FeatureProjectData>(
    "../content/projects"
  );

  return {
    props: {
      about: homeSource,
    },
  };
};

const Home = ({ about }: { about: MDXDocument }) => {
  return (
    <Page>
      <div className="w-full mb-16 max-w-screen-lg mx-auto">
        <h2 className="text-3xl my-16 text-center md:text-5xl font-bold text-black dark:text-white">
          About Me
        </h2>
        {about && (
          <MDRenderer className="w-full mb-16 mx-auto" source={about.content} />
        )}
      </div>
    </Page>
  );
};

export default Home;
