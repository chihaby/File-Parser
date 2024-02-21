'use client'

import Papa from 'papaparse';
import { useState } from 'react';

const acceptableFileTypes = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, .csv, .tsv';

export default function Home() {

  const [radPortion, setRadPortion] = useState<number>();
  const [mediPortion, setMediPortion] = useState<number>();
  const [totalPortion, setTotalPortion] = useState<number>();

  const radArray: number[] = [];
  const mediArray: number[] = [];
  const totalArray: number[] = [];

  const handleFileUpload = (event: any) => {
    const csvFile = event.target.files[0];

    Papa.parse(csvFile, {
      header: true,
      skipEmptyLines: true,
      complete: function(results: any) {
        const report = results.data;
        const writerInfo = report.map((obj: any) => {

          const keys = Object.keys(obj); 
          const writer = Object.values(obj)[19]; 
          const royaltyAmount = Number(Object.values(obj)[26]);  

          // Radouane Share
          if (writer === "RADOUANE CHIHABY"){
            radArray.push(royaltyAmount);
          }
          const radShare: number = radArray.reduce((accumulator:number, currentValue:number) => accumulator + currentValue, 0);
          setRadPortion(Math.round(radShare));
          console.log('Radouane:', radShare);

          // Mediterranean Nights Share
          if (writer === "RADOUANE CHIHABY|SIMEON PETROV KOKOV"){
            mediArray.push(royaltyAmount);
          } 
          const mediShare = mediArray.reduce((accumulator:number, currentValue:number) => accumulator + currentValue, 0);
          setMediPortion(Math.round(mediShare))
          console.log('Mediterranean Nights:', mediShare);

          // Total Royalty Amount
          if (writer === "RADOUANE CHIHABY" || writer === "RADOUANE CHIHABY|SIMEON PETROV KOKOV"){
            totalArray.push(royaltyAmount);
          }
          const totalShare = totalArray.reduce((accumulator:number, currentValue:number) => accumulator + currentValue, 0);
          setTotalPortion(Math.round(totalShare));
          console.log('Total:', totalShare);

            return {
                keys,
                writer,
                Royalty_Amount: royaltyAmount,
            } 
          });
          // console.log('writerInfo', writerInfo)
      }
    })
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
       <h2>Parser</h2>
       <label htmlFor='csvFileSelector'>
        Select File
       </label>
       <input
        type='file'
        id='csvFileSelector'
        name='fileSelector'
        accept={acceptableFileTypes}
        onChange={handleFileUpload}
       >
       </input>
      </div><br />
      <div>
        <p>Total: ${totalPortion}</p>
        <p>Oceo: ${radPortion}</p>
        <p>MN: ${mediPortion}</p>
      </div>
    </main>
  );
}
