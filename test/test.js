const chai = require('chai');
const expect = chai.expect;

// Getting Previous Answer
describe('Example Tests for Jenkins Check', function(){
    it('Checks if 1 + 1 = 2', (done)=>{
        expect(1+1).to.equal(2);
        done();
    });

    it('Checks if word = word', (done)=>{
        expect("test").to.equal("test");
        done();
    });
});

describe('Guaranteed Not-Fail Tests', function(){
    it('Checks if 9 + 10 = 19', (done)=>{
        expect(9+10).to.equal(19);
        done();
    });
});

describe('Guaranteed Fail Tests', function(){
    it('Checks if 9 + 10 = 21', (done)=>{
        expect(9+10).to.equal(21);
        done();
    });
});