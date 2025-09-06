"use client";

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import styles from './project-details.module.scss';
import Container from '@/components/UI/Layout/Layout';
import Title from '@/components/UI/Elements/Title/Title';
import FancyButton from '@/components/UI/Elements/Button/Button';
import Blobs from '@/components/UI/Elements/Blobs/Blobs';
import Particles from '@/components/UI/Cards/Particles/Particles';
import ProjectJourney from '@/database/ProjectJourney.json';

// Dynamically import IconCloud to avoid SSR issues
const IconCloud = dynamic(() => import('@/src/components/magicui/icon-cloud.jsx').then(mod => ({ default: mod.IconCloud })), {
    ssr: false,
    loading: () => <div className={styles.iconCloudLoading}>Loading 3D Icon Cloud...</div>
});

// Technology icon mapping - return JSX elements for IconCloud
const getTechnologyIcons = (technologies) => {
    const iconMap = {
        'React': (
            <svg viewBox="0 0 24 24" fill="#61DAFB">
                <path d="M12 9.861A2.139 2.139 0 1 0 12 14.139 2.139 2.139 0 1 0 12 9.861zM6.008 16.255l-.472-.12C2.018 15.246 0 13.737 0 11.996s2.018-3.25 5.536-4.139l.472-.119.133.468a23.53 23.53 0 0 0 1.363 3.578l.101.213-.101.213a23.307 23.307 0 0 0-1.363 3.578l-.133.467zM5.317 8.95c-2.674.751-4.315 1.9-4.315 3.046 0 1.145 1.641 2.294 4.315 3.046a24.95 24.95 0 0 1 1.182-3.046A24.752 24.752 0 0 1 5.317 8.95zM17.992 16.255l-.133-.469a23.357 23.357 0 0 0-1.364-3.577l-.101-.213.101-.213a23.42 23.42 0 0 0 1.364-3.578l.133-.468.473.119c3.517.889 5.535 2.398 5.535 4.14s-2.018 3.25-5.535 4.139l-.473.12zm-.491-4.259c.48 1.039.877 2.06 1.182 3.046 2.675-.752 4.315-1.901 4.315-3.046 0-1.146-1.641-2.294-4.315-3.046a24.788 24.788 0 0 1-1.182 3.046zM5.31 8.945l-.133-.467C4.188 4.992 4.488 2.494 6 1.622c1.483-.856 3.864.155 6.359 2.716l.34.349-.34.349a23.552 23.552 0 0 0-2.422 2.967l-.135.193-.235.02a23.657 23.657 0 0 0-3.785.61l-.472.119zm1.896-6.63c-.268 0-.505.058-.705.173-.994.573-1.17 2.565-.485 5.253a25.122 25.122 0 0 1 3.233-.501 24.847 24.847 0 0 1 2.052-2.544c-1.56-1.519-3.037-2.381-4.095-2.381zM16.795 22.677c-.001 0-.001 0 0 0-1.425 0-3.255-1.073-5.154-3.023l-.34-.349.34-.349a23.53 23.53 0 0 0 2.421-2.968l.135-.193.234-.02a23.63 23.63 0 0 0 3.787-.609l.472-.119.134.468c.987 3.484.688 5.983-.824 6.854a2.38 2.38 0 0 1-1.205.308zm-4.096-3.381c1.56 1.519 3.037 2.381 4.095 2.381h.001c.267 0 .505-.058.704-.173.994-.573 1.171-2.566.485-5.254a25.02 25.02 0 0 1-3.234.501 24.674 24.674 0 0 1-2.051 2.545zM18.69 8.945l-.472-.119a23.479 23.479 0 0 0-3.787-.61l-.234-.02-.135-.193a23.414 23.414 0 0 0-2.421-2.967l-.34-.349.34-.349C14.135 1.778 16.515.767 18 1.622c1.512.872 1.812 3.37.824 6.855l-.134.468zM14.75 7.24c1.142.104 2.227.273 3.234.501.686-2.688.509-4.68-.485-5.253-.988-.571-2.845.304-4.8 2.208A24.849 24.849 0 0 1 14.75 7.24zM7.206 22.677A2.38 2.38 0 0 1 6 22.369c-1.512-.871-1.812-3.369-.823-6.854l.132-.468.472.119c1.155.291 2.429.496 3.785.609l.235.02.134.193a23.596 23.596 0 0 0 2.422 2.968l.34.349-.34.349c-1.898 1.95-3.728 3.023-5.151 3.023zm-1.19-6.427c-.686 2.688-.509 4.681.485 5.254.987.563 2.843-.305 4.8-2.208a24.998 24.998 0 0 1-2.052-2.545 24.976 24.976 0 0 1-3.233-.501zM12 16.878c-.823 0-1.669-.036-2.516-.106l-.235-.02-.135-.193a30.388 30.388 0 0 1-1.35-2.122 30.354 30.354 0 0 1-1.166-2.228l-.1-.213.1-.213a30.3 30.3 0 0 1 1.166-2.228c.414-.716.869-1.43 1.35-2.122l.135-.193.235-.02a29.785 29.785 0 0 1 5.033 0l.234.02.134.193a30.006 30.006 0 0 1 2.517 4.35l.101.213-.101.213a29.6 29.6 0 0 1-2.517 4.35l-.134.193-.234.02c-.847.07-1.694.106-2.517.106zm-2.197-1.084c1.48.111 2.914.111 4.395 0a29.006 29.006 0 0 0 2.196-3.798 28.585 28.585 0 0 0-2.197-3.798 29.031 29.031 0 0 0-4.394 0 28.477 28.477 0 0 0-2.197 3.798 29.114 29.114 0 0 0 2.197 3.798z"/>
            </svg>
        ),
        'Next.js': (
            <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M11.5725 0c-.1763 0-.3098.0013-.3584.0067-.0516.0053-.2159.021-.3636.0328-3.4088.3073-6.6017 2.1463-8.624 4.9728C1.1004 6.584.3802 8.3666.1082 10.255c-.0962.659-.108.8537-.108 1.7474s.012 1.0884.108 1.7476c.652 4.506 3.8591 8.2919 8.2087 9.6945.7789.2511 1.6.4223 2.5337.5255.3636.04.1324.0441.9016.0441s.5380-.0041.9016-.0441c.9337-.1032 1.7548-.2744 2.5337-.5255 4.3496-1.4026 7.5567-5.1885 8.2087-9.6945.096-.6592.108-1.0938.108-1.7476s-.012-1.0884-.108-1.7474C22.8012 6.584 22.0810 4.8014 20.9156 3.2239 18.8929 1.1463 15.6998-.6927 12.2912.0146c-.1477.0118-.3120.0275-.3636.0328C11.8822.0013 11.7487 0 11.5725 0z"/>
            </svg>
        ),
        'Node.js': (
            <svg viewBox="0 0 24 24" fill="#68A063">
                <path d="M11.998,24c-0.321,0-0.641-0.084-0.922-0.247l-2.936-1.737c-0.438-0.245-0.224-0.332-0.08-0.383 c0.585-0.203,0.703-0.25,1.328-0.604c0.065-0.037,0.151-0.023,0.218,0.017l2.256,1.339c0.082,0.045,0.197,0.045,0.272,0l8.795-5.076 c0.082-0.047,0.134-0.141,0.134-0.238V6.921c0-0.099-0.053-0.192-0.137-0.242l-8.791-5.072c-0.081-0.047-0.189-0.047-0.271,0 L3.075,6.68C2.990,6.729,2.936,6.825,2.936,6.921v10.15c0,0.097,0.054,0.189,0.139,0.235l2.409,1.392 c1.307,0.654,2.108-0.116,2.108-0.89V7.787c0-0.142,0.114-0.253,0.256-0.253h1.115c0.139,0,0.255,0.112,0.255,0.253v10.021 c0,1.745-0.95,2.745-2.604,2.745c-0.508,0-0.909,0-2.026-0.551L2.28,18.675c-0.57-0.329-0.922-0.945-0.922-1.604V6.921 c0-0.659,0.353-1.275,0.922-1.603l8.795-5.082c0.557-0.315,1.296-0.315,1.848,0l8.794,5.082c0.570,0.329,0.924,0.944,0.924,1.603 v10.15c0,0.659-0.354,1.275-0.924,1.604l-8.794,5.078C12.643,23.916,12.324,24,11.998,24z"/>
            </svg>
        ),
        'MongoDB': (
            <svg viewBox="0 0 24 24" fill="#47A248">
                <path d="M17.193 9.555c-1.264-5.58-4.252-7.414-4.573-8.115-.28-.394-.53-.954-.735-1.44-.036.495-.055.685-.523 1.184C10.616 2.334 7.628 4.168 6.364 9.748c-1.264 5.58 1.736 10.262 1.736 10.262l.84-.002s-2.25-4.683-1.014-10.262c1.237-5.579 4.225-7.413 4.546-8.114.28-.394.53-.954.735-1.44-.036.495-.055.685-.523 1.184-.736 1.15-.8 1.607-.523 1.184.28-.394.53-.954.735-1.44.036-.495.055-.685-.523-1.184C12.138 1.334 15.126 3.168 16.39 8.748c1.264 5.58-1.736 10.262-1.736 10.262l-.84.002s2.25-4.683 1.014-10.262z"/>
            </svg>
        ),
        'Express': (
            <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 18.588a1.529 1.529 0 01-1.895-.72l-3.45-4.771-.5-.667-4.003 5.444a1.466 1.466 0 01-1.802.708l5.158-6.92-4.798-6.251a1.595 1.595 0 011.9.666l3.576 4.83 3.596-4.81a1.435 1.435 0 011.788-.668L21.708 7.9l-2.522 3.283a.666.666 0 000 .994l4.804 6.412zM.002 11.576l.42-2.075c1.154-4.103 5.858-5.81 9.094-3.27 1.895 1.489 2.368 3.597 2.275 5.973H1.116C.943 16.447 4.005 19.009 7.92 17.7a4.078 4.078 0 002.582-2.876c.207-.666.548-.78 1.174-.588a5.417 5.417 0 01-2.589 3.957c-2.864 1.607-6.509.018-7.978-2.667a6.961 6.961 0 01-.54-3.66l.002.001z"/>
            </svg>
        ),
        'JavaScript': (
            <svg viewBox="0 0 24 24" fill="#F7DF1E">
                <path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z"/>
            </svg>
        ),
        'TypeScript': (
            <svg viewBox="0 0 24 24" fill="#3178C6">
                <path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z"/>
            </svg>
        ),
        'CSS3': (
            <svg viewBox="0 0 24 24" fill="#1572B6">
                <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm17.09 4.413L5.41 4.41l.213 2.622 10.125.002-.255 2.716h-6.64l.24 2.573h6.182l-.366 3.523-2.91.804-2.956-.81-.188-2.11h-2.61l.29 3.855L12 19.288l5.373-1.53L18.59 4.414z"/>
            </svg>
        ),
        'Python': (
            <svg viewBox="0 0 24 24" fill="#3776AB">
                <path d="M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05-.05-1.23.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.26-.02.2-.01h4.22l.7-.05.58-.14.51-.23.41-.28.33-.32.27-.35.2-.36.15-.36.1-.35.07-.32.04-.27.02-.21V3.23l.01-.24.02-.26.04-.27.07-.28.08-.28.1-.26.26-.52.32-.44.38-.35.4-.26.42-.17.42-.1.4-.04.24-.01zm-6.15 14.73c-.74 0-1.34.6-1.34 1.34s.6 1.34 1.34 1.34 1.34-.6 1.34-1.34-.6-1.34-1.34-1.34z"/>
            </svg>
        ),
        'PostgreSQL': (
            <svg viewBox="0 0 24 24" fill="#336791">
                <path d="M23.2 8.4c-.1-.1-.2-.1-.3-.1-.1 0-.2 0-.3.1-.1.1-.1.2-.1.3v6.8c0 .1 0 .2.1.3.1.1.2.1.3.1.1 0 .2 0 .3-.1.1-.1.1-.2.1-.3V8.7c0-.1 0-.2-.1-.3zM12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.6 0 12 0zm0 22C6.5 22 2 17.5 2 12S6.5 2 12 2s10 4.5 10 10-4.5 10-10 10zM8.5 6.5c-.8 0-1.5.7-1.5 1.5s.7 1.5 1.5 1.5 1.5-.7 1.5-1.5-.7-1.5-1.5-1.5zm7 0c-.8 0-1.5.7-1.5 1.5s.7 1.5 1.5 1.5 1.5-.7 1.5-1.5-.7-1.5-1.5-1.5zM12 8c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/>
            </svg>
        ),
        'Vue.js': (
            <svg viewBox="0 0 24 24" fill="#4FC08D">
                <path d="M24,1.61H14.06L12,5.16,9.94,1.61H0L12,22.39ZM12,14.08,5.16,2.23H9.59L12,6.41l2.41-4.18h4.43Z"/>
            </svg>
        ),
        'Mapbox': (
            <svg viewBox="0 0 24 24" fill="#000000">
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.6 0 12 0zm0 22C6.5 22 2 17.5 2 12S6.5 2 12 2s10 4.5 10 10-4.5 10-10 10zm0-18c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm0 14c-3.3 0-6-2.7-6-6s2.7-6 6-6 6 2.7 6 6-2.7 6-6 6zm0-10c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/>
            </svg>
        ),
        'Firebase': (
            <svg viewBox="0 0 24 24" fill="#FFCA28">
                <path d="M3.89 15.673L6.255.461A.542.542 0 0 1 7.27.288L2.625 21.209c-.116.467-.725.604-1.05.267L3.89 15.673zM14.3 7.147l-3.444 2.997c-.337.293-.764.44-1.193.442-.43 0-.86-.146-1.2-.437L4.35 5.728c-.68-.59-1.85-.064-1.85.78v11.36c0 .723.84 1.163 1.525.78L14.3 7.147zM13.6 22.436l1.105-3.4 10.2-6.35c.45-.28.63-.85.42-1.34-.22-.5-.8-.73-1.3-.5l-10.2 6.35-1.105-3.4c-.15-.46-.8-.69-1.3-.5-.5.2-.73.8-.5 1.3l1.105 3.4-10.2 6.35c-.45.28-.63.85-.42 1.34.22.5.8.73 1.3.5l10.2-6.35z"/>
            </svg>
        ),
        'Socket.io': (
            <svg viewBox="0 0 24 24" fill="#010101">
                <path d="M11.936.016a11.998 11.998 0 0 0-2.332 23.817v-4.332H7.23v-4.64h2.374v-3.232c0-2.38 1.255-3.697 3.658-3.697 1.06 0 1.97.08 2.234.116v2.59h-1.53c-1.2 0-1.434.57-1.434 1.408v1.77h2.863l-.374 4.64h-2.49v4.332a11.998 11.998 0 0 0 9.996-11.801C21.934 5.37 17.564.016 11.936.016z"/>
            </svg>
        ),
        'TensorFlow': (
            <svg viewBox="0 0 24 24" fill="#FF6F00">
                <path d="M1.292 5.856L11.54 0v24l-10.248-5.856V5.856zm12.875 0L24.457 0v24l-10.29-5.856V5.856z"/>
            </svg>
        ),
        'FastAPI': (
            <svg viewBox="0 0 24 24" fill="#009688">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-17v8h2V5h-2zm0 10v2h2v-2h-2z"/>
            </svg>
        ),
        'Docker': (
            <svg viewBox="0 0 24 24" fill="#2496ED">
                <path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119v2.258zm-6.44 0h2.12v-2.258H7.543a.186.186 0 00-.186.186v1.887c0 .102.084.185.186.185zm6.44-3.25h2.119a.186.186 0 00.186-.186V5.372a.186.186 0 00-.186-.185h-2.119v2.258zm-3.31-2.258v2.258h2.12V5.372H7.543a.186.186 0 00-.186.186v1.887c0 .102.084.185.186.185zm3.31 1.036h2.119v-2.258h-2.119v2.258zm-3.31 0h2.12v-2.258H7.543v2.258zm6.44-1.036h2.119v-2.258h-2.119v2.258zm-3.31 0h2.12v-2.258H7.543v2.258zm-3.31 0H5.372v-2.258H3.253v2.258zm0 1.036H5.372v-2.258H3.253v2.258zm0 1.036H5.372V9.006H3.253v2.258zm0 1.036H5.372v-2.258H3.253v2.258zm3.31-3.092h2.12V9.006H7.543v2.258zm0 1.036h2.12v-2.258H7.543v2.258zm3.31-2.258h2.119v-2.258h-2.119v2.258zm0 1.036h2.119V9.006h-2.119v2.258zm0 1.036h2.119v-2.258h-2.119v2.258zm3.31-3.092h2.119V9.006h-2.119v2.258zm0 1.036h2.119v-2.258h-2.119v2.258zm-6.44 1.036h2.12v-2.258H7.543v2.258zm3.31 0h2.119v-2.258h-2.119v2.258zm3.31 0h2.119v-2.258h-2.119v2.258zm-6.44 1.036h2.12v-2.258H7.543v2.258zm3.31 0h2.119v-2.258h-2.119v2.258zm3.31 0h2.119v-2.258h-2.119v2.258zm-6.44 1.036h2.12v-2.258H7.543v2.258zm3.31 0h2.119v-2.258h-2.119v2.258zm3.31 0h2.119v-2.258h-2.119v2.258z"/>
            </svg>
        ),
        'Prisma': (
            <svg viewBox="0 0 24 24" fill="#2D3748">
                <path d="M21.807 6.05L13.06.42a2.26 2.26 0 0 0-2.12 0L2.193 6.05A2.26 2.26 0 0 0 1 8.12v7.76a2.26 2.26 0 0 0 1.193 2.07l8.747 5.63a2.26 2.26 0 0 0 2.12 0l8.747-5.63a2.26 2.26 0 0 0 1.193-2.07V8.12a2.26 2.26 0 0 0-1.193-2.07zM12 1.5a.75.75 0 0 1 .75.75v.75h.75a.75.75 0 0 1 0 1.5h-.75v.75a.75.75 0 0 1-1.5 0V4.5h-.75a.75.75 0 0 1 0-1.5h.75v-.75A.75.75 0 0 1 12 1.5zm-8.25 6a.75.75 0 0 1 .75-.75h.75v.75a.75.75 0 0 1-1.5 0V6.75zm0 3a.75.75 0 0 1 .75-.75h.75v.75a.75.75 0 0 1-1.5 0V9.75zm0 3a.75.75 0 0 1 .75-.75h.75v.75a.75.75 0 0 1-1.5 0V12.75zm0 3a.75.75 0 0 1 .75-.75h.75v.75a.75.75 0 0 1-1.5 0V15.75zm3-9a.75.75 0 0 1 .75-.75h.75v.75a.75.75 0 0 1-1.5 0V6.75zm0 3a.75.75 0 0 1 .75-.75h.75v.75a.75.75 0 0 1-1.5 0V9.75zm0 3a.75.75 0 0 1 .75-.75h.75v.75a.75.75 0 0 1-1.5 0V12.75zm0 3a.75.75 0 0 1 .75-.75h.75v.75a.75.75 0 0 1-1.5 0V15.75zm3-9a.75.75 0 0 1 .75-.75h.75v.75a.75.75 0 0 1-1.5 0V6.75zm0 3a.75.75 0 0 1 .75-.75h.75v.75a.75.75 0 0 1-1.5 0V9.75zm0 3a.75.75 0 0 1 .75-.75h.75v.75a.75.75 0 0 1-1.5 0V12.75zm0 3a.75.75 0 0 1 .75-.75h.75v.75a.75.75 0 0 1-1.5 0V15.75zm3-9a.75.75 0 0 1 .75-.75h.75v.75a.75.75 0 0 1-1.5 0V6.75zm0 3a.75.75 0 0 1 .75-.75h.75v.75a.75.75 0 0 1-1.5 0V9.75zm0 3a.75.75 0 0 1 .75-.75h.75v.75a.75.75 0 0 1-1.5 0V12.75zm0 3a.75.75 0 0 1 .75-.75h.75v.75a.75.75 0 0 1-1.5 0V15.75zm3-9a.75.75 0 0 1 .75-.75h.75v.75a.75.75 0 0 1-1.5 0V6.75zm0 3a.75.75 0 0 1 .75-.75h.75v.75a.75.75 0 0 1-1.5 0V9.75zm0 3a.75.75 0 0 1 .75-.75h.75v.75a.75.75 0 0 1-1.5 0V12.75zm0 3a.75.75 0 0 1 .75-.75h.75v.75a.75.75 0 0 1-1.5 0V15.75z"/>
            </svg>
        ),
        'Stripe': (
            <svg viewBox="0 0 24 24" fill="#635BFF">
                <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.52 2.314l2.141-3.18C18.252 3.822 15.697 2.97 12.96 2.97c-3.99 0-6.423 2.116-6.423 5.235 0 3.182 2.234 4.442 5.004 5.435 2.461.86 3.413 1.448 3.413 2.485 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-7.119-2.75l-2.169 3.18C4.17 20.11 8.385 21.03 12.96 21.03c4.105 0 6.68-2.141 6.68-5.435 0-3.254-2.001-4.444-4.664-5.445z"/>
            </svg>
        ),
        'GraphQL': (
            <svg viewBox="0 0 24 24" fill="#E10098">
                <path d="M12.001 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.629 0 12.001 0zm0 22C6.478 22 2 17.522 2 12S6.478 2 12.001 2s10 4.478 10 10-4.478 10-10 10zM8.5 6.5c-.8 0-1.5.7-1.5 1.5s.7 1.5 1.5 1.5 1.5-.7 1.5-1.5-.7-1.5-1.5-1.5zm7 0c-.8 0-1.5.7-1.5 1.5s.7 1.5 1.5 1.5 1.5-.7 1.5-1.5-.7-1.5-1.5-1.5zM12 8c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/>
            </svg>
        ),
        'Canvas API': (
            <svg viewBox="0 0 24 24" fill="#FF6B6B">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
        ),
        'Local Storage': (
            <svg viewBox="0 0 24 24" fill="#4CAF50">
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
            </svg>
        ),
        'Spotify API': (
            <svg viewBox="0 0 24 24" fill="#1DB954">
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 8.88 15 9.42 18.72 11.4c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z"/>
            </svg>
        )
    };

    return technologies.map(tech => iconMap[tech]).filter(Boolean);
};

export default function ProjectDetails() {
    const params = useParams();
    const router = useRouter();
    const project = ProjectJourney.find(p => p.id === params.id);

    const handleBackClick = () => {
        router.back();
    };

    // Debug: Log the technologies and generated icons
    React.useEffect(() => {
        if (project) {
            console.log('Project technologies:', project.technologies);
            console.log('Generated icons:', getTechnologyIcons(project.technologies));
        }
    }, [project]);

    if (!project) {
        return (
            <div className={styles.notFound}>
                <Container>
                    <Title>Project Not Found</Title>
                    <p>The project you're looking for doesn't exist.</p>
                    <Link href="/" className={styles.backLink}>
                        Back to Home
                    </Link>
                </Container>
            </div>
        );
    }

    return (
        <main className={styles.main}>
            {/* Background Elements */}
            <div className={styles.background}>
                <div className={styles.noise}></div>
                <div className={`${styles.line} ${styles.lineLeft}`}>
                    <svg width="962" height="995" viewBox="0 0 962 995" fill="none"
                         xmlns="http://www.w3.org/2000/svg">
                        <path d="M961 995L0 1.00093" stroke="url(#paint0_linear_2321_30777)"/>
                        <path d="M961 994.807L0 139.055" stroke="url(#paint1_linear_2321_30777)"/>
                        <path d="M961 995L0 268.279" stroke="url(#paint2_linear_2321_30777)"/>
                        <path d="M961 994.998L0 388.092" stroke="url(#paint3_linear_2321_30777)"/>
                        <path d="M961 995L0 498.692" stroke="url(#paint4_linear_2321_30777)"/>
                        <path d="M961 995L0 600.073" stroke="url(#paint5_linear_2321_30777)"/>
                        <path d="M961 994.998L0 692.236" stroke="url(#paint6_linear_2321_30777)"/>
                        <path d="M961 994.998L0 775.185" stroke="url(#paint7_linear_2321_30777)"/>
                        <path d="M961 994.998L0 851.682" stroke="url(#paint8_linear_2321_30777)"/>
                        <path d="M961 994.998L0 916.197" stroke="url(#paint9_linear_2321_30777)"/>
                        <defs>
                            <linearGradient id="paint0_linear_2321_30777" x1="960.499" y1="992.187"
                                            x2="-6.38836"
                                            y2="985.916" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#261308"/>
                                <stop offset="0.0001" stopColor="#241004" stopOpacity="0.9"/>
                                <stop offset="1" stopColor="#061D49"/>
                            </linearGradient>
                            <linearGradient id="paint1_linear_2321_30777" x1="960.499" y1="992.385"
                                            x2="-6.37415"
                                            y2="985.101" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#261308"/>
                                <stop offset="0.0001" stopColor="#241004" stopOpacity="0.9"/>
                                <stop offset="1" stopColor="#061D49"/>
                            </linearGradient>
                            <linearGradient id="paint2_linear_2321_30777" x1="960.499" y1="992.944"
                                            x2="-6.35294"
                                            y2="984.366" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#261308"/>
                                <stop offset="0.0001" stopColor="#241004" stopOpacity="0.9"/>
                                <stop offset="1" stopColor="#061D49"/>
                            </linearGradient>
                            <linearGradient id="paint3_linear_2321_30777" x1="960.499" y1="993.281"
                                            x2="-6.31993"
                                            y2="983.01" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#261308"/>
                                <stop offset="0.0001" stopColor="#241004" stopOpacity="0.9"/>
                                <stop offset="1" stopColor="#061D49"/>
                            </linearGradient>
                            <linearGradient id="paint4_linear_2321_30777" x1="960.499" y1="993.596"
                                            x2="-6.26589"
                                            y2="981.037" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#261308"/>
                                <stop offset="0.0001" stopColor="#241004" stopOpacity="0.9"/>
                                <stop offset="1" stopColor="#061D49"/>
                            </linearGradient>
                            <linearGradient id="paint5_linear_2321_30777" x1="960.499" y1="993.883"
                                            x2="-6.17141"
                                            y2="978.102" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#261308"/>
                                <stop offset="0.0001" stopColor="#241004" stopOpacity="0.9"/>
                                <stop offset="1" stopColor="#061D49"/>
                            </linearGradient>
                            <linearGradient id="paint6_linear_2321_30777" x1="960.499" y1="994.141"
                                            x2="-5.99077"
                                            y2="973.56" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#261308"/>
                                <stop offset="0.0001" stopColor="#241004" stopOpacity="0.9"/>
                                <stop offset="1" stopColor="#061D49"/>
                            </linearGradient>
                            <linearGradient id="paint7_linear_2321_30777" x1="960.499" y1="994.376"
                                            x2="-5.59793"
                                            y2="966.04" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#261308"/>
                                <stop offset="0.0001" stopColor="#241004" stopOpacity="0.9"/>
                                <stop offset="1" stopColor="#061D49"/>
                            </linearGradient>
                            <linearGradient id="paint8_linear_2321_30777" x1="960.499" y1="994.593"
                                            x2="-4.47619"
                                            y2="951.182" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#261308"/>
                                <stop offset="0.0001" stopColor="#241004" stopOpacity="0.9"/>
                                <stop offset="1" stopColor="#061D49"/>
                            </linearGradient>
                            <linearGradient id="paint9_linear_2321_30777" x1="960.499" y1="994.775"
                                            x2="0.00045284"
                                            y2="916.191" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#261308"/>
                                <stop offset="0.0001" stopColor="#241004" stopOpacity="0.9"/>
                                <stop offset="1" stopColor="#061D49"/>
                            </linearGradient>
                        </defs>
                    </svg>
                </div>
                <div className={`${styles.line} ${styles.lineRight}`}>
                    <svg width="962" height="995" viewBox="0 0 962 995" fill="none"
                         xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 995L962 1.00093" stroke="url(#paint0_linear_2321_30690)"/>
                        <path d="M1 994.807L962 139.055" stroke="url(#paint1_linear_2321_30690)"/>
                        <path d="M1 995L962 268.279" stroke="url(#paint2_linear_2321_30690)"/>
                        <path d="M1 994.998L962 388.092" stroke="url(#paint3_linear_2321_30690)"/>
                        <path d="M1 995L962 498.692" stroke="url(#paint4_linear_2321_30690)"/>
                        <path d="M1 995L962 600.073" stroke="url(#paint5_linear_2321_30690)"/>
                        <path d="M1 994.998L962 692.236" stroke="url(#paint6_linear_2321_30690)"/>
                        <path d="M1 994.998L962 775.185" stroke="url(#paint7_linear_2321_30690)"/>
                        <path d="M1 994.998L962 851.682" stroke="url(#paint8_linear_2321_30690)"/>
                        <path d="M1 994.998L962 916.197" stroke="url(#paint9_linear_2321_30690)"/>
                        <defs>
                            <linearGradient id="paint0_linear_2321_30690" x1="1.50051" y1="992.187" x2="968.388"
                                            y2="985.916" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#261308"/>
                                <stop offset="0.0001" stopColor="#241004" stopOpacity="0.9"/>
                                <stop offset="1" stopColor="#061D49"/>
                            </linearGradient>
                            <linearGradient id="paint1_linear_2321_30690" x1="1.50051" y1="992.385" x2="968.374"
                                            y2="985.101" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#261308"/>
                                <stop offset="0.0001" stopColor="#241004" stopOpacity="0.9"/>
                                <stop offset="1" stopColor="#061D49"/>
                            </linearGradient>
                            <linearGradient id="paint2_linear_2321_30690" x1="1.50051" y1="992.944" x2="968.353"
                                            y2="984.366" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#261308"/>
                                <stop offset="0.0001" stopColor="#241004" stopOpacity="0.9"/>
                                <stop offset="1" stopColor="#061D49"/>
                            </linearGradient>
                            <linearGradient id="paint3_linear_2321_30690" x1="1.50051" y1="993.281" x2="968.32"
                                            y2="983.01" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#261308"/>
                                <stop offset="0.0001" stopColor="#241004" stopOpacity="0.9"/>
                                <stop offset="1" stopColor="#061D49"/>
                            </linearGradient>
                            <linearGradient id="paint4_linear_2321_30690" x1="1.50051" y1="993.596" x2="968.266"
                                            y2="981.037" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#261308"/>
                                <stop offset="0.0001" stopColor="#241004" stopOpacity="0.9"/>
                                <stop offset="1" stopColor="#061D49"/>
                            </linearGradient>
                            <linearGradient id="paint5_linear_2321_30690" x1="1.50051" y1="993.883" x2="968.171"
                                            y2="978.102" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#261308"/>
                                <stop offset="0.0001" stopColor="#241004" stopOpacity="0.9"/>
                                <stop offset="1" stopColor="#061D49"/>
                            </linearGradient>
                            <linearGradient id="paint6_linear_2321_30690" x1="1.50051" y1="994.141" x2="967.991"
                                            y2="973.56" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#261308"/>
                                <stop offset="0.0001" stopColor="#241004" stopOpacity="0.9"/>
                                <stop offset="1" stopColor="#061D49"/>
                            </linearGradient>
                            <linearGradient id="paint7_linear_2321_30690" x1="1.50051" y1="994.376" x2="967.598"
                                            y2="966.04" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#261308"/>
                                <stop offset="0.0001" stopColor="#241004" stopOpacity="0.9"/>
                                <stop offset="1" stopColor="#061D49"/>
                            </linearGradient>
                            <linearGradient id="paint8_linear_2321_30690" x1="1.50051" y1="994.593" x2="966.476"
                                            y2="951.182" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#261308"/>
                                <stop offset="0.0001" stopColor="#241004" stopOpacity="0.9"/>
                                <stop offset="1" stopColor="#061D49"/>
                            </linearGradient>
                            <linearGradient id="paint9_linear_2321_30690" x1="1.50051" y1="994.775" x2="962"
                                            y2="916.191" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#261308"/>
                                <stop offset="0.0001" stopColor="#241004" stopOpacity="0.9"/>
                                <stop offset="1" stopColor="#061D49"/>
                            </linearGradient>
                        </defs>
                    </svg>
                </div>
                <Particles className={styles.particlesBG}/>
                <Blobs type={'v1'}/>
                <Blobs type={'v2'}/>
                <Blobs type={'v3'}/>
            </div>

            <Container>
                {/* Mobile back button - shown at top on small screens */}
                <div className={styles.mobileBackButton}>
                    <FancyButton 
                        element="button"
                        theme="button-1"
                        onClick={handleBackClick}
                    >
                        Back to Portfolio
                    </FancyButton>
                </div>
                
                <div className={styles.content}>
                    <div className={styles.imageSection}>
                        <Image
                            src={project.image}
                            alt={project.title}
                            width={800}
                            height={600}
                            className={styles.projectImage}
                        />
                    </div>

                    <div className={styles.detailsSection}>
                        {/* Desktop back button */}
                        <div className={styles.backButtonWrapper}>
                            <FancyButton 
                                element="button"
                                theme="button-1"
                                onClick={handleBackClick}
                            >
                                Back to Portfolio
                            </FancyButton>
                        </div>
                        
                        <div className={styles.projectHeader}>
                            <Title color="white">{project.title}</Title>
                            <p className={styles.company}>{project.company}</p>
                        </div>

                        {/* Mobile image - shown between header and description */}
                        <div className={styles.mobileImageSection}>
                            <Image
                                src={project.image}
                                alt={project.title}
                                width={800}
                                height={600}
                                className={styles.projectImage}
                            />
                        </div>

                        <div className={styles.description}>
                            <h3>About the Project</h3>
                            <p>{project.description}</p>
                        </div>

                        <div className={styles.technologies}>
                            <h3>Technologies Used</h3>
                            <div className={styles.iconCloudContainer}>
                                {React.useMemo(() => {
                                    const icons = getTechnologyIcons(project.technologies);
                                    console.log('Rendering IconCloud with icons:', icons);
                                    
                                    if (icons.length > 0) {
                                        return <IconCloud icons={icons} />;
                                    } else {
                                        return (
                                            <div className={styles.noIcons}>
                                                No icons available for technologies: {project.technologies.join(', ')}
                                            </div>
                                        );
                                    }
                                }, [project.technologies])}
                            </div>
                            <div className={styles.techList}>
                                {project.technologies.map((tech, index) => (
                                    <FancyButton 
                                        key={index}
                                        theme="button-4"
                                        element="button"
                                        aria-label={`Technology: ${tech}`}
                                    >
                                        {tech}
                                    </FancyButton>
                                ))}
                            </div>
                        </div>

                        <div className={styles.links}>
                            <h3>Project Links</h3>
                            <div className={styles.linkButtons}>
                                {project.links.github && (
                                    <FancyButton 
                                        element="link"
                                        link={project.links.github}
                                        target="_blank"
                                        theme="button-1"
                                        dataText="GitHub"
                                    >
                                        <span style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                                            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                                                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                                            </svg>
                                            GitHub
                                        </span>
                                    </FancyButton>
                                )}
                                {project.links.dribbble && (
                                    <FancyButton 
                                        element="link"
                                        link={project.links.dribbble}
                                        target="_blank"
                                        theme="button-1"
                                        dataText="Dribbble"
                                    >
                                        <span style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                                            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                                                <path d="M12 24C5.385 24 0 18.615 0 12S5.385 0 12 0s12 5.385 12 12-5.385 12-12 12zm10.12-10.358c-.35-.11-3.17-.953-6.384-.438 1.34 3.684 1.887 6.684 1.992 7.308 2.3-1.555 3.936-4.02 4.395-6.87zm-6.115 7.808c-.153-.9-.75-4.032-2.19-7.77l-.066.02c-5.79 2.015-7.86 6.025-8.04 6.4 1.73 1.358 3.92 2.166 6.29 2.166 1.42 0 2.77-.29 4-.814zm-11.62-2.58c.232-.4 3.045-5.055 8.332-6.765.135-.045.27-.084.405-.12-.26-.585-.54-1.167-.832-1.74C7.17 11.775 2.206 11.71 1.756 11.7l-.004.312c0 2.633.998 5.037 2.634 6.855zm-2.42-8.955c.46.008 4.683.026 9.477-1.248-1.698-3.018-3.53-5.558-3.8-5.928-2.868 1.35-5.01 3.99-5.676 7.17zM9.6 2.052c.282.38 2.145 2.914 3.822 6 3.645-1.365 5.19-3.44 5.373-3.702-1.81-1.61-4.19-2.586-6.795-2.586-.825 0-1.63.1-2.4.285zm10.335 3.483c-.218.29-1.935 2.493-5.724 4.04.24.49.47.985.68 1.486.08.18.15.36.22.53 3.41-.43 6.8.26 7.14.33-.02-2.42-.88-4.64-2.31-6.38z"/>
                                            </svg>
                                            Dribbble
                                        </span>
                                    </FancyButton>
                                )}
                                {project.links.live && (
                                    <FancyButton 
                                        element="link"
                                        link={project.links.live}
                                        target="_blank"
                                        theme="button-1"
                                        dataText="View Live"
                                    >
                                        <span style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                                            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                                                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 2c5.514 0 10 4.486 10 10s-4.486 10-10 10S2 17.514 2 12 6.486 2 12 2zm0 3c-3.866 0-7 3.134-7 7s3.134 7 7 7 7-3.134 7-7-3.134-7-7-7zm0 2c2.761 0 5 2.239 5 5s-2.239 5-5 5-5-2.239-5-5 2.239-5 5-5z"/>
                                            </svg>
                                            View Live
                                        </span>
                                    </FancyButton>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </main>
    );
}
