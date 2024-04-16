import { BackgroundSlider } from "@/components/BackgroundSlider";
import { companyLists } from "@/libs/data";

const page = ({ params }) => {
  const { companyName } = params;
  // console.log(companyName);
  const value = companyLists.filter(
    (val) => val.companyName.toLowerCase() === companyName
  );
  // console.log(value);
  return (
    <main>
      <BackgroundSlider data={value[0]} />;
    </main>
  );
};

export default page;
