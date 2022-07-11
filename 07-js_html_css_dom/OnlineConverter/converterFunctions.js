//This File contains all the converter functions from previous labs


//1) Temperature Conversion Functions

function KtoC(kelvinTemp){
    return kelvinTemp - 273.15;
}

function CtoK(celciusTemp){
    return celciusTemp + 273.15;
}

function FtoK(fahrenheitTemp){
    return (((fahrenheitTemp - 32)*(5/9)) + 273.15);
}

function KtoF(kelvinTemp){
    return (((kelvinTemp - 273.15)*(9/5) + 32));
}

//2) Thorem of Pythagoras Function

function pythagoras(firstLeg, secondLeg){
    return Math.sqrt((firstLeg ** 2)+ (secondLeg ** 2));
}

//3) Length Conversions

function InchToCm(inchMeasurement){
    return inchMeasurement*2.54;
}

function CmToInch(cmMeasurement){
    return cmMeasurement/2.54;
}

function MToKm(milesDistance){
    return milesDistance*1.609;
}

function KmToM(kmDistance){
    return kmDistance/1.609;
}