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
        const radArray: number[] = [];
        const mediArray: number[] = [];
        const totalArray: number[] = [];

        const writerInfo = report.map((obj: any) => {

          const keys = Object.keys(obj); 
          const writer = Object.values(obj)[19]; 
          const royaltyAmount = Number(Object.values(obj)[26]);  
          const distributedAmount = Object.values(obj)[26];
          // const workPercentage = Number(Object.values(obj)[20]);

          // Radouane Share
          if (writer === "RADOUANE CHIHABY"){
            radArray.push(royaltyAmount);
            const radShare = radArray.reduce((accumulator:number, currentValue:number) => accumulator + currentValue, 0);
            console.log('Rad Share', radShare)
          }

          // Mediterranean Nights Share
          if (writer === "RADOUANE CHIHABY|SIMEON PETROV KOKOV"){
            mediArray.push(royaltyAmount);
            const mediShare = mediArray.reduce((accumulator:number, currentValue:number) => accumulator + currentValue, 0);
            console.log('Medi Share', mediShare);
          } 


          // Total Royalty Amount
          if (writer === "RADOUANE CHIHABY" || writer === "RADOUANE CHIHABY|SIMEON PETROV KOKOV"){
            totalArray.push(royaltyAmount);
            const totalShare = totalArray.reduce((accumulator:number, currentValue:number) => accumulator + currentValue, 0);
            console.log('Total Share', totalShare);
          }

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
      </div><br />
      <div>
        {/* <label>MN Share</label> */}
      </div>
    </main>
  );
}
