"use client"
import avatar from "@/ui/avatar.jpg";
import Link from "next/link";
import project from "@/ui/project.webp";
import certs from "@/ui/certs.jpg";
import Icon from "@mdi/react";
import {mdiMapMarker,mdiAccountSchool, mdiCertificateOutline,mdiHeadCogOutline,mdiInformationOutline,mdiTextAccount,} from "@mdi/js";
import { useEffect, useState } from "react";
import ModalProject from "@/components/Modal/ModalProject";
import ModalInfo from "@/components/Modal/ModalInfo";
import { DropdownProject } from "@/components/Dropdown/DropdownProject";
import useMatchMedia from "@/components/ui/matchMedia";
import useHeaderStore from "@/lib/store/headerStore";
import Image from "next/image";


function PublicProfile() { 
  const active =
    "flex gap-1 h-12 items-center px-3 border-b-4 text-prBlue font-bold border-prBlue";
  const noActive =
    "flex gap-1 h-12 items-center px-3 border-b-4 border-slate-100";
  const [showNav, setShowNav] = useState(false);
  const [isScrolling,setIsScrolling] = useState(false)
  const [activeSection, setActiveSection] = useState("");
  const isTablet = useMatchMedia('(max-width: 1023px)')
  const isScrollingHeader = useHeaderStore((state) => state.setIsScrollingHeader);

  useEffect(() =>{
    if(isTablet) {
      setShowNav(true)
    } else {
      setShowNav(false)
    }
  },[isTablet])

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      // Ajusta el valor (100 en este ejemplo) al punto en el que deseas que el encabezado aparezca
      if (isTablet && scrollPosition > 50) { // Ajusta el valor (300 en este ejemplo) al punto en el que deseas que el encabezado desaparezca
        isScrollingHeader(false);
      } else {
        isScrollingHeader(true);
      }
      setIsScrolling(scrollPosition > 220);
    };

    window.addEventListener('scroll', handleScroll);

    // Limpiar el evento de escucha al desmontar el componente
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isTablet]);

  useEffect(() => {
      const location = window.location.hash;
      if (location !== '') {
        const sectionName = location.substring(1);
        setActiveSection(sectionName);        
      } else{
        setActiveSection('sobre-mi');
      }
  }, []);

  return (
    <div className="relative container-sticky text-[12px]">
      <div id="sticky-element" className="lg:sticky md:top-0 z-10 bg-slate-100 md:pt-6 lg:pl-2 lg:h-[249px]">
        <div className="flex flex-col md:flex-row gap-4 md:gap-8 pt-4 lg:pl-5 md:mt-14 md:pl-7 lg:mt-16">
          <div className="mx-auto md:mx-0">
            <Image
              width={80}
              height={30}
              alt=""
              src={avatar}
              className=" rounded-full  "
            />
          </div>

          <div className="p-2 bg-slate-100 w-[70%] mx-auto md:mx-0 md:w-[30vw] rounded-md shadow-xl border-2 border-gray-300">
            <div className="flex justify-between">
              <h2 className="text-xl font-semibold">Juan Perez</h2>
            </div>
            <div className="flex items-center gap-10 pt-1.5">
              <div className="flex items-center">
              <Icon path={mdiMapMarker} size={1} />
              <p className="text-slate-400">Ubicacion</p>
            </div>
            <div className="flex items-center">
              <Icon path={mdiAccountSchool} size={1} />
              <p className="text-slate-400">Profesión</p>
            </div>
            </div>
            
          </div>
        </div>

        <div 
          className={`flex h-16 lg:ml-6 pt-4 justify-between sm:justify-start sm:gap-1  ${
            showNav && isScrolling
              ? "fixed top-0 z-50 mt-0 w-screen !pt-0 !h-12 bg-slate-100 transition-all"
              : ""
          }`}
        >
          <Link
              href={`/profile?q=#sobre-mi`}
              onClick={() =>{setActiveSection("sobre-mi");}}
              className={activeSection === "sobre-mi" ? active : noActive}
          >
            <Icon path={mdiTextAccount} size={1} />
            <span className="hidden sm:block">Sobre Mi</span>
          </Link>
          <Link
             href={`/profile?q=#proyectos`}
             onClick={() => {setActiveSection("proyectos")}}
             className={activeSection === "proyectos" ? active : noActive}
          >
            <Icon path={mdiInformationOutline} size={1} />
            <span className="hidden sm:block">Proyectos</span>
          </Link>
          <Link
            href={`/profile?q=#habilidades`}
            onClick={() =>{setActiveSection("habilidades")}}
            className={activeSection === "habilidades" ? active : noActive}
          >
            <Icon className="w-6 h-6" path={mdiHeadCogOutline} />
            <span className="hidden sm:block">Habilidades</span>
          </Link>
          <Link
            href={`/profile?q=#certificaciones`}
            onClick={() => {setActiveSection("certificaciones")}}
            className={activeSection === "certificaciones" ? active : noActive}
          >
            <Icon className="pt-1 h-7" path={mdiCertificateOutline} />
            <span className="hidden sm:block">Certificaciones</span>
          </Link>
        </div>
      </div>

      <div className="fixed z-20 h-40 md:right-5 md:top-56 hidden md:block w-[30vw] pb-20">
        <div className=" w-full max-w-md px-8 py-4 mt-16 bg-white rounded-lg shadow-lg dark:bg-gray-800">
          <h2 className="mt-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white md:mt-0">
            Design Tools
          </h2>

          <p className="mt-2 text-sm text-gray-600 dark:text-gray-200 pb-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae
            dolores deserunt ea doloremque natus error.
          </p>
          <div className="flex justify-center items-center mx-auto">
            <button className=" px-8 py-3 font-semibold rounded bg-violet-600 text-gray-50 hover:bg-violet-500">
              Quiero mi certificado
            </button>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 bg-white w-screen flex justify-center items-center h-16  md:hidden ">
        <button className=" px-8 py-2 font-semibold rounded bg-violet-600 text-gray-50 hover:bg-violet-500">
          Quiero mi certificado
        </button>
      </div>
      <div className={`block animate-tilt md:w-[60vw] m-8 p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 ${showNav && isScrolling ? "mt-28" : ""} `}>
        <div id="sobre-mi" className="flex justify-between">
          <h2   
            className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white"
          >
            Sobre Mi
          </h2>
        </div>

        <p className="font-normal text-gray-700 dark:text-gray-400">
          Here are the biggest enterprise technology acquisitions of 2021 so
          far, in reverse chronological order.
        </p>
      </div>

      <div id="proyectos">
        <h2  className="ml-8 text-xl font-bold tracking-tight text-gray-900">
          Proyectos
        </h2>
      </div>

      <div  className="flex flex-col items-center m-8 bg-white border border-gray-200 rounded-lg shadow md:w-[60vw] md:flex-row  hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
        <Image
          unoptimized
          className="object-cover w-full rounded-t-lg h-full md:h-auto md:w-48 md:rounded-none md:rounded-s-lg "
          src={project}
          alt=""
        />
        <div className="flex flex-col justify-between p-4 leading-normal w-full">
          <div className="flex justify-between">
            <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white">
              Noteworthy technology acquisitions 2021
            </h5>
          </div>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            Here are the biggest enterprise technology acquisitions of 2021 so
            far, in reverse chronological order.
          </p>
          <div>
            <ModalProject />
          </div>
        </div>
      </div>
      <div  className="flex flex-col items-center m-8 bg-white border border-gray-200 rounded-lg shadow md:w-[60vw] md:flex-row  hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
        <Image
          unoptimized
          className="object-cover w-full rounded-t-lg h-full md:h-auto md:w-48 md:rounded-none md:rounded-s-lg "
          src={certs}
          alt=""
        />
        <div className="flex flex-col justify-between p-4 leading-normal w-full">
          <div className="flex justify-between">
            <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white">
              Noteworthy technology acquisitions 2021
            </h5>
          </div>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            Here are the biggest enterprise technology acquisitions of 2021 so
            far, in reverse chronological order.
          </p>
          <div>
            <ModalProject />
          </div>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row md:w-[60vw] gap-y-4 md:gap-x-4 m-8">
        <div id="habilidades" className="block   p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          <div className="flex justify-between">
            <h5        
              className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white"
            >
              Habilidades
            </h5>
          </div>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            Here are the biggest enterprise technology acquisitions of 2021 so
            far, in reverse chronological order.
          </p>
        </div>
        <div
          id="idiomas"
          className="block  p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
        >
          <div className="flex justify-between">
            <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
              Idiomas
            </h5>
          </div>

          <p className="font-normal text-gray-700 dark:text-gray-400">
            Here are the biggest enterprise technology acquisitions of 2021 so
            far, in reverse chronological order.
          </p>
        </div>
      </div>

      <div 
      id="certificaciones"
        className="block md:w-[60vw] m-8 p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
      >
        <div className="flex justify-between">
          <h5
            
            className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white"
          >
            Certificaciones
          </h5>
        </div>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          Here are the biggest enterprise technology acquisitions of 2021 so
          far, in reverse chronological order.
        </p>
      </div>
    </div>
  );
}
export default PublicProfile;