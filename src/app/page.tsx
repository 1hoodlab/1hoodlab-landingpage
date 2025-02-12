"use client";

import Image from "next/image";
import { Button, NextUIProvider } from "@nextui-org/react";
import SocialLink from "./components/SocialLink";
import CombinedAnim from "./components/GroupAnim";
import UpDownPoint from "./components/UpDownPoint";
import { useState, useEffect } from "react";

export default function Home() {
  const [svgSize, setSvgSize] = useState(700);

  useEffect(() => {
    const handleResize = () => {
      setSvgSize(Math.min(window.innerWidth * 0.9, 700));
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <NextUIProvider className="h-full">
      <div className="font-polySans flex flex-col min-h-screen">
        <header className="bg-black-950">
          <div className="flex px-4 sm:px-[42px] py-[20px] items-center justify-between">
            <div>
              <Image
                src="/assets/icons/brand.svg"
                alt="brand"
                width={20}
                height={20}
              />
            </div>
            <nav className="hidden sm:flex items-center gap-[35px]">
              <a className="text-white hover:text-gray-300">Projects</a>
              <a className="text-white hover:text-gray-300">About us</a>
              <Button className="bg-blue-700 text-white-50 rounded-[3px]">
                Contact
              </Button>
            </nav>
            <Button className="sm:hidden bg-blue-700 text-white-50 rounded-[3px]">
              Menu
            </Button>
          </div>
        </header>
        <main className="flex-1">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-span-3 flex flex-col">
              <div className="bg-black-950 px-4 sm:px-[42px] pt-[54px] pb-[60px] lg:pb-[121px]">
                <div>
                  <p className="font-polySans text-[24px] font-bold max-w-[210px] text-white">
                    Productive Free and Easy new.
                  </p>
                  <span className="text-[16px] text-black-300">1hoodlab</span>
                </div>
              </div>
              <div className="bg-black-50 py-[55px] px-4 sm:px-[42px] flex flex-col justify-between">
                <div>
                  <div>
                    <h2 className="text-[36px] sm:text-[48px] font-medium text-black-950 leading-10 mb-[2px]">
                      SHARKS
                    </h2>
                    <span className="uppercase text-black-950 font-medium text-[12px] font-inter">
                      project
                    </span>
                  </div>
                  <div className="mb-[17px] mt-[26px]">
                    <p className="text-black-950">
                      A thrilling Telegram game with over 1M users! Dive in to
                      play, complete missions, and refer friends for rewards.
                      Join the frenzy and dominate the leaderboard!
                    </p>
                  </div>
                  <Button className="bg-black-950 uppercase text-white font-inter rounded-[3px] text-[14px] font-semibold">
                    join now
                  </Button>
                </div>
                <div className="flex gap-2 mt-8">
                  <SocialLink
                    altText="social"
                    href="#"
                    iconSrc="/assets/icons/telegram.svg"
                  />
                  <SocialLink
                    altText="social"
                    href="#"
                    iconSrc="/assets/icons/twitter.svg"
                  />
                  <SocialLink
                    altText="social"
                    href="#"
                    iconSrc="/assets/icons/github.svg"
                  />
                </div>
              </div>
            </div>
            <div className="lg:col-span-9 flex flex-col">
              <div className="flex flex-col lg:flex-row">
                <div className="relative flex items-center justify-center lg:justify-end">
                  <CombinedAnim
                    className="w-full h-auto max-w-[700px]"
                    svgSize={svgSize}
                  />
                  <div className="absolute w-full lg:w-[462px] flex flex-col lg:translate-x-[45%] z-10 px-4 lg:px-0">
                    <div className="text-black-950 font-polySans font-extrabold text-[36px] sm:text-[48px] uppercase z-10">
                      <p className="mix-blend-difference">1hoodlab.</p>
                      <p className="mix-blend-difference">next innovation</p>
                    </div>
                    <div className="text-black-950 font-polySans font-medium text-[14px] flex justify-end">
                      <p className="max-w-[288px]">
                        at 1HOODLAB, we are at the forefront of transforming
                        digital experiences by leveraging blockchain, GameFi,
                        and Web3 technologies. Our mission is to build a
                        decentralized future that empowers communities,
                        creators, and gamers worldwide.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex-grow flex justify-center lg:justify-end p-4 lg:p-14">
                  <div>
                    <img
                      src="/assets/images/ellipse.svg"
                      alt="image"
                      className="w-full max-w-[300px] h-auto"
                    />
                  </div>
                </div>
              </div>
              <div className="px-4 sm:px-20 flex flex-col sm:flex-row justify-between relative mt-8">
                <p className="text-[36px] sm:text-[48px] font-polySans font-extrabold uppercase text-black-950">
                  new.
                </p>
                <div className="flex w-full sm:w-[500px] mt-4 sm:mt-0">
                  <div className="relative w-full sm:w-[16.5rem] h-[100px] sm:h-auto sm:bottom-[60px]">
                    <img
                      src="/assets/images/ellipse1.svg"
                      className="absolute inset-0 w-full h-full object-contain"
                    />
                  </div>
                  <div className="absolute right-[15%] hidden sm:block">
                    <UpDownPoint size={50} color="#000000" />
                  </div>
                  <div className="absolute right-[5%] bottom-[30%] hidden sm:block">
                    <UpDownPoint
                      size={20}
                      color="#000000"
                      distance={10}
                      duration={0.8}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </NextUIProvider>
  );
}
