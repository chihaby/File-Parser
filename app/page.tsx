'use client'

import Papa from 'papaparse';

const acceptableFileTypes = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, .csv, .tsv';

export default function Home() {

  const handleFileUpload = (event: any) => {

    const csvFile = event.target.files[0];

    Papa.parse(csvFile, {
      header: true,
      skipEmptyLines: true,
      complete: function(results: any) {
        console.log('finished', results.data)
        console.log("Row errors:", results.errors);

        const report = results.data
        const arr: number[] = [];
        const radouaneAmount: number[] = [];
        const strArr: string[] = [];


        const writerInfo = report.map((obj: any) => {

          const keys = Object.keys(obj); 
          const writer = Object.values(obj)[19]; 
          const royaltyAmount = Number(Object.values(obj)[23]);
          const workPercentage = Number(Object.values(obj)[20]);

          if (writer === "RADOUANE CHIHABY|SIMEON PETROV KOKOV"){
            radouaneAmount.push(royaltyAmount)
          }
          console.log('strArr', strArr)
          console.log('strArr length', strArr.length)
          

          arr.push(royaltyAmount);
          // console.log('array', arr);
          const distributedAmount = Object.values(obj)[26];
          const total = radouaneAmount.reduce((accumulator:number, currentValue:number) => accumulator + currentValue, 0);
          console.log('total', total)
            return {
                keys,
                writer,
                Royalty_Amount: royaltyAmount,
                Distributed_Amount: distributedAmount
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
      </div>
    </main>
  );
}
