"use client";

import HomeBanner from "@/components/home/HomeBanner";
import HomeBoxContent from "@/components/home/HomeBoxContent";
import HomeHero from "@/components/home/HomeHero";
import HomeNews from "@/components/home/HomeNews";
import HomeProjects from "@/components/home/HomeProject";
import HomeProperties from "@/components/home/HomeProperties"

export default function Page() {
  return (
    <>
    <HomeBanner/>
    <HomeNews/>
    <HomeProperties/>
    <HomeProjects/>
    <HomeBoxContent/>
    <HomeHero/>
    </>
  );
}
