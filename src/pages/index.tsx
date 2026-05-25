import React from 'react';
import Head from 'next/head';
import { Container } from '@chakra-ui/react';
import Gallery from '@/components/Gallery';

export default function Home() {
  // Masukin semua link foto cewek lo di dalam tanda kurung kotak ini, Bro.
  // Pisahkan pakai tanda koma, dan pastikan ujungnya .jpg atau .png
  const fotoCewekGua = [
    "https://link-foto-cewek-lo-1.jpg",
    "https://link-foto-cewek-lo-2.jpg",
    "https://link-foto-cewek-lo-3.jpg",
    "https://link-foto-cewek-lo-4.jpg",
    "https://link-foto-cewek-lo-5.jpg"
  ];

  // Format data disesuaikan biar masuk ke efek planet 3D bawaannya
  const imagesData = fotoCewekGua.map((url, index) => ({
    id: index.toString(),
    url: url,
    title: `Only For You`,
    date: "",
    media_type: "image"
  }));

  return (
    <div style={{ backgroundColor: '#000', minHeight: '100vh', position: 'relative' }}>
      <Head>
        <title>Only For You</title>
      </Head>
      <h1 style={{ 
        color: '#fff', 
        textAlign: 'center', 
        paddingTop: '40px', 
        fontFamily: 'sans-serif',
        position: 'absolute',
        width: '100%',
        zIndex: 10,
        fontSize: '24px',
        fontWeight: 'bold',
        textShadow: '0 0 10px rgba(255,255,255,0.5)'
      }}>
        Only For You Nisa darma putra
      </h1>
      <Container as="main" maxW="100vw" pt={4}>
        <Gallery images={imagesData} />
      </Container>
    </div>
  );
}
