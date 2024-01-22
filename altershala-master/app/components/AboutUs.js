import React from "react";
import {
  AiOutlineLike,
  AiOutlinePlayCircle,
  AiOutlineShareAlt,
} from "react-icons/ai";
import Link from "next/link";

import { MdKeyboardArrowDown } from "react-icons/md";

const AboutUs = () => {
  return (
    <div className="bg-white min-h-screen  text-gray-800">
      <div className="max-w-3xl mx-auto px-5">
        <div className="w-[100%] h-28 rounded-md justify-center gap-1 flex-col items-center flex bg-gray-100 mb-4">
          <h2 className="md:text-5xl  text-4xl text-blue- font-bold ">
            Story of Babblr
          </h2>
          <h6 className="md:text-sm text-xs text-blue-800 font-medium">
            <h6 className="md:text-sm text-xs text-blue-800 font-medium">
              &ldquo;Empowering Expression, Celebrating Stories&rdquo;
            </h6>
          </h6>
        </div>

        <h3 className="text-xl font-semibold mb-2">The Founding of Babblr</h3>
        <p className="text-gray-700  mb-4">
          Babblr was founded on the belief that everyone deserves a space to be
          heard, regardless of their background, age, or expertise. It was born
          out of a passion for connecting people, ideas, and stories in a
          meaningful and positive way.
          <br></br>
          The journey began when we realized that while there were plenty of
          places to create and share content, there was something missing. There
          was a need for a platform that seamlessly combined the art of
          blogging, vlogging, and microblogging.
        </p>

        <h3 className="text-xl font-semibold mb-2">Mission Statement:</h3>
        <p className="text-gray-700  mb-4">
          At Babblr, our mission is to foster a vibrant and inclusive online
          community, where passionate readers, writers, and information seekers
          come together to celebrate the power of words. We are committed to
          cultivating an environment of internet positivity, where diverse
          voices are valued, creativity thrives, and meaningful connections are
          forged. Join us on our journey to make the digital world a brighter
          and more enlightened place, one story, one idea, and one positive
          interaction at a time.
        </p>

        <h3 className="text-xl font-semibold mb-2">The Vision</h3>
        <p className="text-gray-700  mb-4">
          The core objective of Babblr was clear from the start - to create a
          platform that would empower individuals to express themselves, share
          their passions, and connect with a diverse audience. It aimed to be a
          place where users could write in-depth blog posts, share captivating
          videos, or simply drop quick thoughts - all in one place.
          <br></br>
          We envisioned a community where users could collaborate, learn, and
          grow together. He wanted to break down the barriers that often
          separated content creators and their audiences. The goal was not just
          to build another social platform, but to foster a creative ecosystem
          where everyone felt welcome and inspired.
        </p>

        <h3 className="text-xl font-semibold mb-2">The Babblr Experience</h3>
        <p className="text-gray-700  mb-4">
          Today, Babblr stands as a testament to that dream. It&apos;s a platform
          that celebrates individuality and encourages self-expression. It&apos;s a
          place where bloggers, vloggers, and microbloggers come together to
          create, inspire, and engage with a vibrant community. Our commitment
          to providing a safe, inclusive, and user-friendly environment remains
          unwavering. We are dedicated to continually improving and expanding
          our platform to meet the evolving needs of our users.
        </p>

        <h3 className="text-xl font-semibold mb-2">
          &ldquo;Join Us on the Babblr Journey&rdquo;
        </h3>
        <p className="text-gray-700  mb-4">
          As we continue to grow, we invite you to join us on this exciting
          journey. Whether you&apos;re a seasoned content creator, a passionate
          storyteller, or someone just looking to share your thoughts, Babblr is
          your canvas. Let&apos;s inspire, connect, and create together. Thank you
          for being a part of the Babblr story. Together, we&apos;re making the
          internet a more expressive and vibrant place, one post at a time.
        </p>

        <br></br>

        <div className="w-[100%] pt-4">
          <div className=" flex p-4 border-t items-center justify-between content-between ">
            <div className="flex gap-10 text-sm font-normal">
              <Link href="/">
                <span className="text-zinc-900 hover:text-blue-700">Help</span>
              </Link>
              <Link href="/privacy">
                <span className="text-zinc-900 hover:text-blue-700">
                  Privacy
                </span>
              </Link>

              <Link href="/terms">
                <span className="text-zinc-900 hover:text-blue-700">Terms</span>
              </Link>

              <Link href="/AboutUs">
                <span className="text-zinc-900 hover:text-blue-700">About</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll to Top Button */}
        <div className="fixed bottom-8 right-8 bg-gray-700 text-white rounded-full p-2 cursor-pointer hover:bg-gray-800">
          <MdKeyboardArrowDown className="text-xl" />
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
