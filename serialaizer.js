
function Input() {
    this.k = 0,
    this.sum = [],
    this.mult = [],
    this.type = "",
    this.serializer = function(type, obj) {
        this.type = type
        if(type === 'json'){
            const objFromJson = JSON.parse(obj)
            this.k = objFromJson.K
            this.sum = objFromJson.Sums
            this.mult = objFromJson.Muls
        }
        if(type === 'xml') {
            const objFromXml = xml2js(obj)
            this.k = objFromXml.elements[0].elements[0].elements[0].text
            this.sum = objFromXml.elements[0].elements[1].elements.map(item => +item.elements[0].text)
            this.mult = objFromXml.elements[0].elements[2].elements.map(item => +item.elements[0].text)
        }
    }
}

const a = new Input()
a.serializer('xml', `<Input>
 <K>10</K>
 <Sums>
 <decimal>1.01</decimal>
 <decimal>2.02</decimal>
 </Sums>
 <Muls>
 <int>1</int>
 <int>4</int>
 </Muls>
</Input>`)

function Output() {
    this.sumResult = 0,
    this.mulResult = 0,
    this.sorted = []
    this.deserializer = function(){
        this.sumResult = +(a.sum.reduce((prevValue, curValue) => prevValue + curValue) * a.k).toFixed(2)
        this.mulResult = +(a.mult.reduce((prevValue, curValue) => prevValue * curValue)).toFixed(2)
        this.sorted = a.sum.concat(a.mult).sort((a, b) => a - b)
        if(a.type === 'json'){
            return JSON.stringify(
                {
                    SumResult: this.sumResult,
                    MulResult: this.mulResult,
                    SortedInputs: this.sorted
                }) 
        }
        if(a.type === 'xml') {
            console.log(1);
            console.log(js2xml({
                name: 'John',
                surname: 'LOLO'
            },{}));
            return js2xml({
                    SumResult: this.sumResult,
                    MulResult: this.mulResult,
                    SortedInputs: this.sorted
                })
        }
    
    }
}

const b = new Output()


console.log(b.deserializer());
