import Image from "next/image";
import BlueWave from "@/images/blue wave.jpg";
import MetziumLogo from "@/images/metzium logo png colour 2.png";

export default function About() {
  return (
    <section id="about" className="relative h-dvh px-4 sm:px-6 lg:px-8 overflow-hidden flex flex-col items-center justify-center bg-black">
      <div className="absolute inset-x-4 top-6 bottom-6 rounded-[20px] overflow-hidden">
        <Image
          src={BlueWave}
          alt="About background"
          fill
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>
      <div className="relative max-w-7xl mx-auto z-10">
        <div className="flex items-center justify-center gap-3 mb-12 flex-nowrap">
          <h2 className="text-4xl font-bold text-center leading-none translate-y-[2px]">About</h2>
          <div className="relative h-16 w-56 -translate-y-[1px]">
            <Image src={MetziumLogo} alt="Metzium" fill className="object-contain" />
          </div>
        </div>
        <div className="prose prose-lg dark:prose-invert mx-auto">
          <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed mb-6">
            Metzium is dedicated to delivering exceptional web development services and innovative digital solutions. 
            With years of experience in the industry, we specialize in creating modern, responsive, and user-friendly 
            applications that help businesses achieve their goals.
          </p>
          <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed mb-6">
            Our team is passionate about staying at the forefront of web technologies, ensuring that every project 
            we undertake leverages the latest tools and best practices. We believe in building long-term partnerships 
            with our clients, providing ongoing support and guidance as their needs evolve.
          </p>
          <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
            Whether you're a startup looking to establish your online presence or an established business seeking 
            to modernize your digital infrastructure, Metzium has the expertise and dedication to bring your vision to life.
          </p>
        </div>
      </div>
    </section>
  );
}
