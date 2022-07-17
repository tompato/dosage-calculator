import { useState, useEffect } from 'react';
import './result.css';

export default function Result({ current, weight, dose }) {

  // Setup our state for the 4 result values
  const [dailyDose, setDailyDose] = useState(0);
  const [bottleSize, setBottleSize] = useState(0);
  const [bottleQuantity, setBottleQuantity] = useState(0);
  const [supplyLast, setSupplyLast] = useState(0);

  // Create a multidimensional array for the lookup table so we can grab correpsonding result values
  const lookupTable = [
    [0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1, 1.1, 1.2, 1.3, 1.4, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6],
    [30, 30, 30, 30, 60, 60, 60, 60, 60, 120, 120, 120, 120, 120, 120, 250, 250, 250, 360, 360, 360, 360, 360],
    [1, 2, 2, 3, 2, 2, 2, 3, 3, 2, 2, 2, 2, 2, 3, 2, 2, 3, 2, 2, 3, 3, 3],
    [75, 100, 75, 90, 100, 86, 75, 100, 90, 109, 100, 92, 86, 80, 90, 100, 83, 107, 90, 80, 108, 98, 90]
  ];

  // Function to calculate our dosage based on prop values
	const calculate = (current, weight, dose) => {
    // Multiply the dose(mg/kg/day) by the weight provided
    let calculatedDose = dose * weight;
    if(current) { // Patient currently taking Stiripentumab
      // Cap at 20mg/day
      calculatedDose = (calculatedDose >= 20) ? 20 : calculatedDose;
    } else { // Patient not currently taking Stiripentumab
      // Cap at 30mg/day
      calculatedDose = (calculatedDose >= 30) ? 30 : calculatedDose;
    }
    // Twice daily dose in mL
    calculatedDose = calculatedDose / 5;
    // Round our result depending on the twice daily dose value
    if(calculatedDose > 1.5) {
      // Round to the nearest 0.5
      calculatedDose = Math.round(calculatedDose * 2) / 2;
    } else {
      // Round to the nearest 0.1
      calculatedDose = Math.round(calculatedDose * 10) / 10;
    }
    // Lookup our daily dose in the lookup table
    let lookupIndex = lookupTable[0].findIndex(el => el === calculatedDose);
    // Set the other results based on lookup table, this could be inferred from the
    // value anyway but I figured it would illustrate a way of using a lookup table
    setDailyDose(calculatedDose);
    setBottleSize(lookupTable[1][lookupIndex]);
    setBottleQuantity(lookupTable[2][lookupIndex]);
    setSupplyLast(lookupTable[3][lookupIndex]);
  };

  // Fire this function on initial render and when any of the prop values change
  useEffect(() => {
    calculate(current, weight, dose); 
  });

  return (
    <div>
      <table className='table table-sm'>
        <thead>
          <tr>
            <th colSpan="2">Results</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Twice daily dose (mL)</td>
            <td>{ dailyDose > 0 ? dailyDose : '---' }</td>
          </tr>
          <tr>
            <td>Bottle size (mL)</td>
            <td>{ bottleSize > 0 ? bottleSize : '---' }</td>
          </tr>
          <tr>
            <td>Bottle quantity</td>
            <td>{ bottleQuantity > 0 ? bottleQuantity: '---' }</td>
          </tr>
          <tr>
            <td>How many days will the supply last?</td>
            <td>{ supplyLast > 0 ? supplyLast : '---' }</td>
          </tr>
        </tbody>  
      </table>
    </div>
  )
}
