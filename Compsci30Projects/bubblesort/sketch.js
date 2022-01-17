// bubble sort

let someList = [5,15,3,8,9,1,20,7];

function bubbleSort(list){
  let swaps = true;
  while(swaps){
    swaps=false;
    for(let i=0; i<list.length-1; i++){

      if(list[i] > list[i+1]){
        swaps=true;
        let temp = list[i]
        list[i] = list[i+1];
        list[i+1] = temp;
      }
    }
    //console.log(someList);
  }
  return list;
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  console.log('input')
  console.log(someList)
  console.log('output')
  console.log(bubbleSort(someList))
}