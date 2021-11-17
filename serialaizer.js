// import xml2json  from './node_modules/xml-js/lib/xml2json.js';

var xml =
'<?xml version="1.0" encoding="utf-8"?>' +
'<note importance="high" logged="true">' +
'    <title>Happy</title>' +
'    <todo>Work</todo>' +
'    <todo>Play</todo>' +
'</note>';
var result1 = xml2json(xml, {compact: true, spaces: 4});
console.log(result1);

function Input() {
    this.k = 0,
    this.sum = [],
    this.mult = [],
    this.serializer = function(type, obj) {
        if(type === 'json'){
            const objJson = JSON.parse(obj)
            this.k = objJson.K
            this.sum = objJson.Sums
            this.mult = objJson.Muls
        }
    }
}

const a = new Input()
a.serializer('json', '{"K":10,"Sums":[1.01,2.02],"Muls":[1,4]}')

function Output() {
    this.sumResult = 0,
    this.mulResult = 0,
    this.sorted = []
    this.deserializer = function(){
        this.sumResult = +(a.sum.reduce((prevValue, curValue) => prevValue + curValue) * a.k).toFixed(2)
        this.mulResult = +(a.mult.reduce((prevValue, curValue) => prevValue * curValue)).toFixed(2)
        this.sorted = a.sum.concat(a.mult).sort((a, b) => a - b)
        return JSON.stringify(
        {
            SumResult: this.sumResult,
            MulResult: this.mulResult,
            SortedInputs: this.sorted
        }) 
    }
}

const b = new Output()


console.log(b.deserializer());
