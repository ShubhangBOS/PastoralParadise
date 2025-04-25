import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";

const page = () => {
  return (
    <div>
      <Navbar />
      <div className="h-[82.5vh] flex justify-start items-start">
        <div className="flex items-center justify-center w-full h-full">
          <h1>No Trips for current user. Add new Trips  .</h1>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default page;
