import {formatcurrency} from '../scripts/utlis/money.js';

console.log('test suite : formatCurrency');

console.log('converts cents into dollars');

if(formatcurrency(2095) === '20.95'){
    console.log('Passed');
}else{
    console.log('Failed');
}

console.log('Works with 0');

if(formatcurrency(0) === '0.00'){
    console.log('Passed');
}else{
    console.log('Failed');
}

console.log('Rounds up for nearest cent');

if(formatcurrency(2000.5) === '20.01'){
    console.log('Passed');
}else{
    console.log('Failed');
}