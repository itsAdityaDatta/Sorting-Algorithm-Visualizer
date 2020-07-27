document.addEventListener("DOMContentLoaded", function(event) {

    let count = parseInt(screen.width/13);

    let sortingGoingOn = 0;
    let numComparisons = 0;
    let numSwaps = 0;
    barContainer = document.getElementById('barsContainer');
    timeouts = [];

    for(let i = 0; i < count; i++){
        barContainer.innerHTML+='<div class="bars"></div>';
    }

    for(let i=0; i<count;i++){
        let randValue = (Math.random()/2)*1000;
        document.getElementsByClassName('bars')[i].style.height = randValue;
    }

//_________________________________________________________Reset____________________________________________________________________

    document.getElementById('reset').addEventListener('click',()=>{
        numComparisons = 0;
        numSwaps = 0;
        sortingGoingOn = 0;
        document.getElementById('numComparisons').innerHTML = 0;
        document.getElementById('numSwaps').innerHTML = numSwaps;
        for(let i=0; i<count;i++){
            let randValue = (Math.random()/2)*1000;
            document.getElementsByClassName('bars')[i].style.backgroundColor = 'black';
            document.getElementsByClassName('bars')[i].style.height = randValue;
        }
        timeouts.forEach((element) => {
            clearTimeout(element);
        });
    });


//_________________________________________________________BubbleSort____________________________________________________________________

    let bubbleTimeout = null;
    document.getElementById('bubble').addEventListener('click',()=>{
        if(sortingGoingOn){
            M.toast({html: 'sorting is already taking place', classes: 'toast'});
            return;
        }
        sortingGoingOn = 1;
        bubbleSort(count-1,0);
        numComparisons = 0;
        numSwaps = 0;
        document.getElementById('numComparisons').innerHTML = numComparisons;
        document.getElementById('numSwaps').innerHTML = numSwaps;
    });

    function bubbleSort(num,j){
        if(num == 0) {
            M.toast({html: 'number of comparisons : ' + numComparisons, classes: 'toast'});
            M.toast({html: 'number of swaps : ' + numSwaps, classes: 'toast'});
            document.getElementsByClassName('bars')[num].style.backgroundColor = 'green';
            sortingGoingOn = 0;
            return;
        }
        if(j == num){
            document.getElementsByClassName('bars')[num].style.backgroundColor = 'green';
            bubbleSort(num-1,0);
            return;
        } 
        document.getElementsByClassName('bars')[j].style.backgroundColor = 'red';
        document.getElementsByClassName('bars')[j+1].style.backgroundColor = 'blue';
        bubbleTimeout = setTimeout(function(){
            numComparisons++;
            document.getElementById('numComparisons').innerHTML = numComparisons;
            
            if(parseInt(document.getElementsByClassName('bars')[j].style.height) > parseInt(document.getElementsByClassName('bars')[j+1].style.height)){
                numSwaps++;
                document.getElementById('numSwaps').innerHTML = numSwaps;

                [document.getElementsByClassName('bars')[j].style.height, document.getElementsByClassName('bars')[j+1].style.height] = [document.getElementsByClassName('bars')[j+1].style.height,document.getElementsByClassName('bars')[j].style.height];
            }

            document.getElementsByClassName('bars')[j].style.backgroundColor = 'black';
            document.getElementsByClassName('bars')[j+1].style.backgroundColor = 'black';

            bubbleSort(num,j+1);

        },1000-document.getElementById('speed').value);

        timeouts.push(bubbleTimeout);
    }


//_________________________________________________________InsertionSort____________________________________________________________________

    
    let insertionTimeout = null;
    document.getElementById('insertion').addEventListener('click',()=>{
        if(sortingGoingOn){
            M.toast({html: 'sorting is already taking place', classes: 'toast'});
            return;
        }
        sortingGoingOn = 1;
        insertionSort(0);
        numComparisons = 0;
        numSwaps = 0;
        document.getElementById('numComparisons').innerHTML = numComparisons;
        document.getElementById('numSwaps').innerHTML = numSwaps;
    });

    function insertionSort(i){
        if(i==0){
            document.getElementsByClassName('bars')[i].style.backgroundColor = 'green';
            insertionSort(1);
            return;
        }
        if(i == count){
            M.toast({html: 'number of comparisons : ' + numComparisons, classes: 'toast'});
            M.toast({html: 'number of swaps : ' + numSwaps, classes: 'toast'});
            sortingGoingOn = 0;
            return;
        }
        document.getElementsByClassName('bars')[i].style.backgroundColor = 'red';
        val = document.getElementsByClassName('bars')[i].style.height;
        insertionTimeout = setTimeout(()=>{
            if(i+1 < count) document.getElementsByClassName('bars')[i+1].style.backgroundColor = 'orange';
            findPos(val,i,i);
        },1000 - document.getElementById('speed').value);
        timeouts.push(insertionTimeout);
    }

    function findPos(val, j, i){
            if(j<=0){
                document.getElementsByClassName('bars')[0].style.backgroundColor = 'green';
                insertionSort(i+1);
                return;
            }
            numComparisons++;
            document.getElementById('numComparisons').innerHTML = numComparisons;

            if(parseInt(document.getElementsByClassName('bars')[j].style.height) < parseInt(document.getElementsByClassName('bars')[j-1].style.height)){
                [document.getElementsByClassName('bars')[j].style.height, document.getElementsByClassName('bars')[j-1].style.height] = [document.getElementsByClassName('bars')[j-1].style.height,document.getElementsByClassName('bars')[j].style.height];
                
                numSwaps++;
                document.getElementById('numSwaps').innerHTML = numSwaps;

                document.getElementsByClassName('bars')[j-1].style.backgroundColor = 'red';
                document.getElementsByClassName('bars')[j].style.backgroundColor = 'green';
                findPosTimeout = setTimeout(()=>{
                    findPos(val,j-1,i);
                },1000-document.getElementById('speed').value);
            }
            else{
                document.getElementsByClassName('bars')[j].style.backgroundColor = 'green';
                insertionSort(i+1);
                return;
            }    
        timeouts.push(findPosTimeout);
    }

//_________________________________________________________SelectionSort____________________________________________________________________
    
    let selectionTimeout = null;
    document.getElementById('selection').addEventListener('click',()=>{
        if(sortingGoingOn){
            M.toast({html: 'sorting is already taking place', classes: 'toast'});
            return;
        }
        sortingGoingOn = 1;
        selectionSort(0,0,0);
        numComparisons = 0;
        numSwaps = 0;
        document.getElementById('numComparisons').innerHTML = numComparisons;
        document.getElementById('numSwaps').innerHTML = numSwaps;
    });

    function selectionSort(i,j,minj){
        if(i == count-1){
            M.toast({html: 'number of comparisons : ' + numComparisons, classes: 'toast'});
            M.toast({html: 'number of swaps : ' + numSwaps, classes: 'toast'});
            sortingGoingOn = 0;
            document.getElementsByClassName('bars')[i].style.backgroundColor ='green';
            return;
        }
        if(i == j) document.getElementsByClassName('bars')[j].style.backgroundColor = "orange";
        if(j==count){
            [document.getElementsByClassName('bars')[i].style.height, document.getElementsByClassName('bars')[minj].style.height] = [document.getElementsByClassName('bars')[minj].style.height,document.getElementsByClassName('bars')[i].style.height];
            
            numSwaps++;
            document.getElementById('numSwaps').innerHTML = numSwaps;
            
            document.getElementsByClassName('bars')[minj].style.backgroundColor ='black';
            document.getElementsByClassName('bars')[i].style.backgroundColor ='green';
            selectionTimeout = setTimeout(()=>{
                selectionSort(i+1,i+1,i+1);
            },1000 - document.getElementById('speed').value);
            timeouts.push(selectionTimeout);
            return;
        }
        if(i!=j) document.getElementsByClassName('bars')[j].style.backgroundColor = 'blue';
        if(j!=i) numComparisons++;
        document.getElementById('numComparisons').innerHTML = numComparisons;
        if(parseInt(document.getElementsByClassName('bars')[j].style.height) < parseInt(document.getElementsByClassName('bars')[minj].style.height)){
            if(minj != i) document.getElementsByClassName('bars')[minj].style.backgroundColor = 'black';
            minj = j;
            document.getElementsByClassName('bars')[minj].style.backgroundColor = 'red';
        }
        selectionTimeout = setTimeout(()=>{
            if(j != minj && j!=i) document.getElementsByClassName('bars')[j].style.backgroundColor = 'black';
            selectionSort(i,j+1,minj);
        },1000 - document.getElementById('speed').value);
        timeouts.push(selectionTimeout);
    }

//    _________________________________________________________MergeSort____________________________________________________________________
  

    let mergeTimeout = null;
    document.getElementById('merge').addEventListener('click',()=>{
        if(sortingGoingOn){
            M.toast({html: 'sorting is already taking place', classes: 'toast'});
            return;
        }
        sortingGoingOn = 1;
        mergeSort(0,count-1);
        numComparisons = 0;
        numSwaps = 0;
        document.getElementById('numComparisons').innerHTML = numComparisons;
        document.getElementById('numSwaps').innerHTML = numSwaps;
    });

});
