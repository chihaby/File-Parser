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
        const payee = results.data
        // const keys = Object.values(payee)
        // console.log('keys', keys)

        const radouane = 'Radouane Chihaby';

        const mappedArray = payee.map((obj: any) => {
        const persons = Object.values(obj)[19]; 
        // const writer = persons.filter((person: any) => person == radouane);   
        // console.log('writer', writer);   
          return {
              place:  obj.Territory,
              personName: persons
          } 
        });
        console.log('mappedArray', mappedArray)
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
