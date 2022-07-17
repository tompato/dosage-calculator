# Dosage Calculator

This is the repository for an interview test that I was given. The details of which are provided here and then the solution can be seen in my code. A demo is available on Github - [here](https://tompato.github.io/dosage-calculator/).

## Brief

A client wants us to build a website which hosts a dosage calculator for a new product which healthcare professionals (HCPs) will use when prescribing it to their patients. The result is a prescription to be given to a pharmacist detailing how much of the product to provide to the patient.

The first question to ask a HCP is – is the patient currently taking Stiripentumab? The dosage calculation changes slightly according to this (yes/no) answer. The calculation steps are detailed on the following page. The lookup table mentioned at the end of the calculation is included on the final page.

So the inputs provided by the HCP to the calculator should be:
* Is the patient currently taking Stiripentumab?
* The patient’s weight in kg
* The required dose in mg/kg/day

The outputs provided for use by a pharmacist should be:
* Twice daily dose in mL
* Bottle size in mL
* Bottle quantity
* How many days the supply will last

The styling of the website should look professional, use the colour purple and behave responsively from Desktop down to mobile screen sizes. Feel free to use any combination of technologies and libraries to build the website. Please follow any best practices you would usually follow in terms of your approach to the code.

The website is a first version to be approved by the client so browser compatibility is out of scope.

It is ok to make assumptions wherever this brief is unclear – we’d suggest including comments or adding a page to the site which detail any such assumptions or other information you want to add.

## Calculations

### Patient taking Stiripentumab

#### Step 1

---
* __[A]__ Prescriber provides required dose in mg/kg/day (0.2 to 0.5)
* __[B]__ Prescriber provides the patient weight in kg

#### Step 2

---

Pharmacist calculates theoretical daily dose in mg/day: __[C]__ = __[A]__ x __[B]__

#### Step 3

---

Pharmacist assesses theoretical daily dose against maximum.

If __[C]__ is greater than or equal to 20, set daily dose to 20mg/day.

If __[C]__ is less than 20 then __[D]__ = __[C]__

#### Step 4

---

Pharmacist calculates twice daily dose in mL: __[E]__ = __[D]__ / 5

#### Step 5

---

Pharmacist rounds the calculated twice daily dose __[E]__ as follows:

* For calculated twice daily dose __[E]__ up to and inlcuding 1.5mL, round up or down to the nearest 0.5mL
* For calculated twice daily dose __[E]__ greater than 1.5mL, round up or down to the nearest 0.5mL

#### Step 6

---

Pharmacist uses the rounded twice daily dose in mL __[F]__ and compares against the lookup table (below) to determine the bottle size and quantity for approximately 3 months supply.

### Patient not currently taking Stiripentumab

#### Step 1

---
* __[A]__ Prescriber provides required dose in mg/kg/day (0.2 to 0.8)
* __[B]__ Prescriber provides the patient weight in kg

#### Step 2

---

Pharmacist calculates theoretical daily dose in mg/day: __[C]__ = __[A]__ x __[B]__

#### Step 3

---

Pharmacist assesses theoretical daily dose against maximum.

If __[C]__ is greater than or equal to 30, set daily dose to 30mg/day.

If __[C]__ is less than 30 then __[D]__ = __[C]__

#### Step 4

---

Pharmacist calculates twice daily dose in mL: __[E]__ = __[D]__ / 5

#### Step 5

---

Pharmacist rounds the calculated twice daily dose __[E]__ as follows:

* For calculated twice daily dose __[E]__ up to and inlcuding 1.5mL, round up or down to the nearest 0.5mL
* For calculated twice daily dose __[E]__ greater than 1.5mL, round up or down to the nearest 0.5mL

#### Step 6

---

Pharmacist uses the rounded twice daily dose in mL __[F]__ and compares against the lookup table (below) to determine the bottle size and quantity for approximately 3 months supply.

### Lookup Table

| Twice Daily Dose (mL) | Bottle Size (mL) | Number of bottle(s) per delivery | Total days supply | Number months of supply | 
| :---: | :---: | :---: | :---: | :---: |
| 0.2 | 30 | 1 | 75 | 2.5 |
| 0.3 | 30 | 2 | 100 | 3.3 |
| 0.4 | 30 | 2 | 75 | 2.5 |
| 0.5 | 30 | 3 | 90 | 3.0 |
| 0.6 | 60 | 2 | 100 | 3.3 |
| 0.7 | 60 | 2 | 86 | 2.9 |
| 0.8 | 60 | 2 | 75 | 2.5 |
| 0.9 | 60 | 3 | 100 | 3.3 |
| 1 | 60 | 3 | 90 | 3 |
| 1.1 | 120 | 2 | 109 | 3.6 |
| 1.2 | 120 | 2 | 100 | 3.3 |
| 1.3 | 120 | 2 | 92 | 3.1 |
| 1.4 | 120 | 2 | 86 | 2.9 |
| 1.5 | 120 | 2 | 80 | 2.7 |
| 2 | 120 | 3 | 90 | 3.0 |
| 2.5 | 250 | 2 | 100 | 3.3 |
| 3 | 250 | 2 | 83 | 2.8 |
| 3.5 | 250 | 3 | 107 | 3.6 |
| 4 | 360 | 2 | 90 | 3.0 |
| 4.5 | 360 | 2 | 80 | 2.7 |
| 5 | 360 | 3 | 108 | 3.6 |
| 5.5 | 360 | 3 | 98 | 3.3 |
| 6 | 360 | 3 | 90 | 3.0 |

## Solution

I use create-react-app to quickly setup a little React app and then added Bootstrap. I then setup a Calculator component and a Results component. 

The Calculator components would handle the overall display and the user input and render the Results component.

The Results component would take the values provided as props and then carry out the calculations above, calculate the twice daily dose and then use the lookup table as a multidimensional array to find the other results. These would then be displayed back to the user.

To run the application just download the repo and run:

* `nvm use`
* `npm install`
* `npm start`