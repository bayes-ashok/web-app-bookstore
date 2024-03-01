import React from "react";
import { styled } from "styled-components";
import Navbar from "../components/navbar";

const AboutHeading = styled.h2`
  font-size: 36px;
  color: #333;
  margin-bottom: 20px;
`;
const Image = styled.img`
  width: 600px; /* Adjust width as needed */
  height: auto; /* Maintain aspect ratio */
`;
const Home: React.FC = () => {
  return (
    <>
      <Navbar />

      <section className="flex justify-between Books-center py-20 px-10 bg-purple-100 min-h-screen">
  <div className="flex flex-col justify-center max-w-md">
    <h1 className="text-4xl font-bold mb-4 text-gray-800">
      Welcome to our Bookstore
    </h1>
    <p className="text-lg text-gray-700 mb-6">
      Discover a world of imagination and knowledge through our vast
      collection of books.
    </p>
    <button className="bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700 transition duration-300 ease-in-out">
      Explore Books
    </button>
  </div>
  <div>
  <Image
          src="src\images\book1.jpeg"
          alt="Books"
        />

  </div>
</section>


      <section className="flex justify-between Books-center py-20 px-10 bg-white">
        <div>
          <img
            src="src\images\book2.jpeg"
            alt="Reading"
            className="w-96"
          />
        </div>
        <div className="flex flex-col justify-center max-w-md">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">
            Expand Your Mind
          </h2>
          <p className="text-lg text-gray-700 mb-6">
            Immerse yourself in the captivating world of books and let your mind
            wander to new and exciting places.
          </p>
          <button className="bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700 transition duration-300 ease-in-out">
            Start Reading
          </button>
        </div>
      </section>

      <section className="py-20 px-10 bg-purple-100">
        <div className="max-w-4xl mx-auto">
          <AboutHeading>About Us</AboutHeading>
          <p className="text-lg text-gray-700 mb-6">
            At our bookstore, we believe in the power of literature to transform
            lives. Our mission is to provide access to a diverse range of books
            that entertain, educate, and inspire readers of all ages. Whether
            you're seeking a thrilling adventure, a heartwarming romance, or an
            insightful piece of non-fiction, we have something for you.
          </p>
          <p className="text-lg text-gray-700">
            Step into our store and embark on a journey through the pages of
            some of the greatest literary works ever written. Our knowledgeable
            staff is here to assist you in finding the perfect book to ignite
            your imagination and expand your horizons.
          </p>
        </div>
      </section>

      <div className="ml-0 mr-0">
        <div className="flex justify-center Books-center bg-white mt-10 mb-10">
          <div className="text-center ">
            <div className="flex justify-center">
              <h1 className="text-3xl font-bold mb-10">
                Find The Book of Your Preference
              </h1>
            </div>

            <div className="grid grid-cols-4 gap-4">
              <a
                href="/fiction"
                className="cursor-pointer w-full h-38 object-cover scale-100 hover:scale-105"
              >
                <div className="border border-gray-300 p-4">Fiction</div>
              </a>
              <a
                href="/nonfiction"
                className="cursor-pointer w-full h-38 object-cover scale-100 hover:scale-105"
              >
                <div className="border border-gray-300 p-4">Nonfiction</div>
              </a>
              <a
                href="/novel"
                className="cursor-pointer w-full h-38 object-cover scale-100 hover:scale-105"
              >
                <div className="border border-gray-300 p-4">Novels</div>
              </a>
              <a
                href="/academics"
                className="cursor-pointer w-full h-38 object-cover scale-100 hover:scale-105"
              >
                <div className="border border-gray-300 p-4">Academics</div>
              </a>
              <a
                href="/drama"
                className="cursor-pointer w-full h-38 object-cover scale-100 hover:scale-105"
              >
                <div className="border border-gray-300 p-4">Dramas</div>
              </a>
              <a
                href="/poem"
                className="cursor-pointer w-full h-38 object-cover scale-100 hover:scale-105"
              >
                <div className="border border-gray-300 p-4">Poems</div>
              </a>
              <a
                href="/comics"
                className="cursor-pointer w-full h-38 object-cover scale-100 hover:scale-105"
              >
                <div className="border border-gray-300 p-4">Comics</div>
              </a>
              <a
                href="#"
                className="cursor-pointer w-full h-38 object-cover scale-100 hover:scale-105"
              >
                <div className="border border-gray-300 p-4">More</div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
