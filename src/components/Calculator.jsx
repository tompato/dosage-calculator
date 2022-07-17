import Result from './Result';
import './calculator.css';
import { useState } from 'react';

export default function Calculator() {

	// Set some state for the form values
	const [current, setCurrent] = useState(false);
	const [weight, setWeight] = useState(0);
	const [dose, setDose] = useState(0);
	const [max, setMax] = useState(0.8);

	const handleCheckboxChange = (e) => {
		setCurrent(e.target.checked);
		if(e.target.checked) { 
			setMax(0.5);
			if(dose > 0.5) {
				setDose(0.5);
			}
		} else { 
			setMax(0.8);
		}
	};

	// Slight problem with using min/max on html number fields with decimals
	// because it won't allow user to delete the decimal as '0' will be below
	// the minimum so it doesn't allow easy editing of the value
	const handleDoseChange = (e) => {
		setDose(Math.min(Math.max(e.target.value, e.target.min), e.target.max));
	};

  return (
    <div className='wrapper'>
			<h1>Dosage Calculator</h1>
			<form className='calculator'>
				<div className="form-check form-switch">
					<input className="form-check-input" type="checkbox" id="current" checked={current} onChange={e => { handleCheckboxChange(e) }} />
					<label className="form-check-label" htmlFor="current">Is the patient currently taking Stiripentumab?</label>
				</div>
				<div className="form-floating mb-3">
					<input type="number" className="form-control" id="weight" value={weight} onChange={e => { setWeight(e.target.value) }} />
					<label htmlFor="weight">Patients weight (kg)</label>
				</div>
				<div className="form-floating mb-3">
					<input type="number" className="form-control" id="dose" min="0.2" max={max} step="0.01" value={dose} onChange={e => { handleDoseChange(e) } } />
					<label htmlFor="dose">Required dose (mg/kg/day)</label>
					<p className='mt-1 text-muted'><small>Please provide a value between 0.2 and <b>{max}</b>.</small></p>
				</div>
				{ /* Render the results components and pass in the form values */ }
				<Result current={current} weight={weight} dose={dose} />
			</form>
    </div>
  )
}
