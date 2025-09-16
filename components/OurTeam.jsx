import React from "react";
import { PinContainer } from "../ui/3d-pin"; // adjust path as needed

const OurTeam = () => (
  <section className="py-16 px-6 bg-gradient-to-b from-purple-100 via-white to-purple-200 min-h-[600px]">
    <div className="max-w-6xl mx-auto text-center">
      <h2 className="text-4xl font-extrabold text-purple-800 mb-4">
        Our Team
      </h2>
      <div className="w-28 h-1 bg-purple-400 mx-auto mb-10 rounded-full"></div>
      <div className="flex flex-col md:flex-row justify-center gap-12">
        {/* Card 2 */}
        <PinContainer
          title="THARANY B – CO-FOUNDER & CHAIRPERSON"
          href="#"
          containerClassName="mx-auto"
          className="w-96 h-80 flex flex-col items-center bg-purple-900 border-white shadow-xl"
        >
          <img
            src="/imgs/tharanya.png" // Updated image path
            alt="Team member"
            className="rounded-full w-48 h-48 object-cover mt-10 shadow-xl border-2 border-white"
            style={{ objectPosition: "center top" }}
          />
          <div className="mt-6 text-white text-lg font-bold tracking-wide">
            Tharanya B
          </div>
          <div className="mt-2 mb-4 text-purple-500 text-md">
            CO-FOUNDER & CHAIRPERSON
          </div>
        </PinContainer>
        {/* Card 1 */}
        <PinContainer
          title="LOKESHWARAN J - CO-FOUNDER & HR"
          href="#"
          containerClassName="mx-auto"
          className="w-96 h-80 flex flex-col items-center bg-purple-900 border-white shadow-xl"
        >
          <img
            src="/imgs/lokesh.png"
            alt="Team member"
            className="rounded-full w-48 h-48 object-cover mt-10 shadow-xl border-2 border-white"
            style={{ objectPosition: "center top" }} // Adjusted position
          />
          <div className="mt-6 text-white text-lg font-bold tracking-wide">
            LOKESHWARAN J
          </div>
          <div className="mt-2 mb-4 text-purple-500 text-md">
            CO-FOUNDER & HR
          </div>
        </PinContainer>

        
      </div>
    </div>
  </section>
);

export default OurTeam;
