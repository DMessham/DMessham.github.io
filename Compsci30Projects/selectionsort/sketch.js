// bubble sort

let someList = [5,15,3,8,9,1,20,7];

function selectionSort(list){
  let swapPos = list.length-1
  let maxVal = 0;
  let maxPos = 0
  let iteration=0
  while(swapPos!=0){
    //pass
    for(let p=0; p<swapPos; p++){
      if(list[p]>maxVal){
        maxVal=list[p]; 
        maxPos=p};
        console.log("Highest:"+maxVal+"@pos:"+maxPos);
    }
    
    //swap
    let swapVal = list[swapPos];
    list[swapPos] = list[maxPos];
    list[maxPos] = swapVal;

    //move wap location
    swapPos--
    //display progress
    iteration++
    console.log("pass:"+iteration);
    console.log(list);

    
  }
  return list;
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  console.log('input')
  console.log(someList)
  console.log('output')
  console.log(selectionSort(someList))
}