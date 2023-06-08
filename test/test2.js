const chai = require('chai');
const expect = chai.expect;

// Getting Previous Answer
describe('Test 2.0 to wait', function(){
    it('Checks if 3 * 4 = 12', (done)=>{
//        this.timeout(1000);
        expect(3*4).to.equal(12);
        done();
    });

    it('Checks if day = day', (done)=>{
        expect("day").to.equal("day");
        done();
    });
});

describe('Timeout waiting, 19=19', function(){
    it('Checks if timeout for 3 seconds', (done)=>{
//        this.timeout(30000);
        expect(9+10).to.equal(19);
        done();
    });
});