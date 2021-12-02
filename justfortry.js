// let str = "January,February,March,April,May"

// let arr = str.split(',');

// console.log(arr)

var b = [
    {
    name: "kyle",
    a: [ 'ram' ]
    },
    {
    name: "shaun",
    a: [ 'assign', 'ram' ]
    },
    {
    name: "mat",
    a: ['arr', 'ram' ]
    },
    {
    name: "lee",
    a: ['arr' ]
    }
    ]

var tag = "arr"
var j = new Array
b.forEach((all)=>{return all.a.forEach((h)=>{
    if(h==tag){
        j.push(all)
    }
})})
console.log(j)