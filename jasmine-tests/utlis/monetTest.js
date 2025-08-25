import {formatcurrency} from '../../scripts/utlis/money.js';

describe('test suite : formatCurrency', () => {

    it('converts cents into dollars', () => {
        expect(formatcurrency(2095)).toEqual('20.95');
    });
    
    it('Works with 0', () => {
        expect(formatcurrency(0)).toEqual('0.00');
    });

    it('Rounds up for nearest cent', () => {
        expect(formatcurrency(2000.5)).toEqual('20.01');
    });    

});
