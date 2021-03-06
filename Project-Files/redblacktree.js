/**
 * Created by Aren on 10/14/2017.
 */
// Global Variables
let redBlack = new RBT();
const red = 'red'; //changed from var
const black = 'black'; //changed from var

// Two.js init
let elem = document.getElementById('draw-shapes');
let getWidth = document.getElementById("draw-shapes").offsetWidth;
let params = { width: getWidth, height: 1500 };
let two = new Two(params).appendTo(elem);

//On document load
$(document).ready(function(){
    $('#insert').on('input', function(){ //html insert function
        let text = $('#insert').val();
        let displayButton = $('#output');
        text = parseInt(text, 10); //remove leading zeros
        if(isNaN(text)){ //check if input is not a number
            displayButton.text(0);
        }
        else{
            displayButton.text(text);
        }
    });

    $('#go').on('click',function(){
        let input = $('#insert').val();
        input = parseInt(input, 10); //remove leading zeros
        if(isNaN(input)){ //check if input is not a number
            console.log("Not a number..." + input);
        }
        else{
            redBlack.insert(input);
        }
    });

    $('#display').on("click",function(){
        display(redBlack.root);
        //inOrder(redBlack.root);
    });
});

//Display InOrder Traversal
function inOrder(node){
    if(node){
        inOrder(node.left);
        if(node.parent === null){
            // node.parent = {
            //     value: "root"
            // }
            console.log("the value of node is: " + node.value + ", color is: " + node.color + ", parent of node is: no parent, it's root");
        }
        else{
            console.log("the value of node is: " + node.value + ", color is: " + node.color + ", parent of node is: "+ node.parent.value );
        }
        inOrder(node.right);
    }
}

//Get size of RBT
function getSize(node){
    let count = 0;
    function getSizeHelper(node){
        if(node){
            getSizeHelper(node.left);
            if(node.parent === null){
                count++;
            }
            else{
                count++;
            }
            getSizeHelper(node.right);
        }
    }
    getSizeHelper(node);
    return count;
}

//Find node depth level
function getDepth(node){
    let depth = 0;
    while(node.parent !== null){
        node = node.parent;
        depth++;
    }
    return depth;
}

//BFS Traversal
function BFS(node){
    let bfs = [];
    let res = [];
    let size = getSize(node);
    if(size !== 0 ){
        res.push([node, getDepth(node)]);
        while(res.length !== size){
            if(node.left !== null){
                bfs.push(node.left);
            }
            if(node.right !== null){
                bfs.push(node.right);
            }
            node = bfs.shift();
            res.push([node, getDepth(node)]);
        }
    }
    return res;
}

//Node Object
function Node(value){
    this.value = value;
    this.left = null;
    this.right = null;
    this.color = red;
    this.parent = null;
}

//RBT "Class"
function RBT(){
    this.root = null;
}

//RBT Insertion
RBT.prototype.insert = function(value){
    let root = this.root;
    if(!root){
       this.root = new Node(value);
       this.root.color = black;
       this.root.parent = null;
       return;
    }
    let temp = root;
    let newNode = new Node(value);
    while(true){
        if(value < temp.value){ //if value is smaller than current add to left
            newNode.parent = temp;
            if(!temp.left){
                temp.left = newNode;
                break;
            }
            else{
                temp = temp.left; //if current.left is not null traverse to this node
            }
        }
        else{
            newNode.parent = temp;
            if(!temp.right){ //if value is larger or equal than current add to right
                temp.right = newNode;
                break;
            }
            else{
                temp = temp.right; //if current.right is not null traverse to this node
            }
        }
    }
    redBlack.insertionHelper(newNode);
    this.root.color = black;
};

//RBT Recheck
RBT.prototype.reCheck = function(grand){
    if(grand.parent !== null) {
        while (true) {
            let parent = grand.parent;
            if (red === grand.color && red === parent.color){
                redBlack.insertionHelper(grand);
            }
            else
                break;
        }
    }
};

RBT.prototype.insertionHelper = function(currentNode){
    let parent = currentNode.parent;
    let uncle;
    let gpa;
    let side;
    if(parent.parent !== null ){
        gpa = parent.parent;
        if(parent.value < gpa.value){
            uncle = gpa.right;
            side = 0;
        }
        else{
            uncle = gpa.left;
            side = 1;
        }
    }
    if( (red === parent.color && null === uncle) || (red === parent.color && black === uncle.color) ){
        if(side === 0){
            if(currentNode.value > parent.value){       //case 1
                redBlack.leftRotate(currentNode);
                redBlack.rightRotate(currentNode.left);
                currentNode = currentNode.left;
            }
            else if (currentNode.value < parent.value){     //case 2
                redBlack.rightRotate(currentNode);
            }
            let tempColor = currentNode.parent.color;
            currentNode.parent.color = currentNode.parent.right.color;
            currentNode.parent.right.color = tempColor;
            redBlack.reCheck(gpa);
        }
        else if(side === 1){
            if(currentNode.value > parent.value){       //case 3
                redBlack.leftRotate(currentNode);
            }
            else if (currentNode.value < parent.value){     //case 4
                redBlack.rightRotate(currentNode);
                redBlack.leftRotate(currentNode.right);
                currentNode = currentNode.right;
            }
            let tempColor = currentNode.parent.color;
            currentNode.parent.color = currentNode.parent.left.color;
            currentNode.parent.left.color = tempColor;
            redBlack.reCheck(gpa);
        }
    }
    else if(red === parent.color  && red === uncle.color){
        parent.color = black;
        uncle.color = black;
        gpa.color = red;
        redBlack.reCheck(gpa);
    }
};

RBT.prototype.rightRotate = function(node){
    if( (node.value < node.parent.value) && (node.value > node.parent.parent.value) ){
        let parent = node.parent;
        let gpa = parent.parent;
        let nodeRightChild = node.right;
        if(nodeRightChild !== null){
            parent.left = nodeRightChild;
            nodeRightChild.parent = parent;
        }
        else{
            parent.left = null;
        }
        node.right = parent;
        parent.parent = node;
        gpa.right = node;
        node.parent = gpa;
    }
    else if( (node.value < node.parent.value) && (node.value < node.parent.parent.value) ){
        let parent = node.parent; //node.parent;
        let gpa = parent.parent;
        let gpaParent;
        if(gpa.parent !== null){
            gpaParent = gpa.parent;
            if(gpaParent.value < parent.value){
                gpaParent.right = parent;
                parent.parent = gpaParent
            }
            else{
                gpaParent.left = parent;
                parent.parent = gpaParent;
            }
        }
        else{
            this.root = parent;
            parent.parent = null;
        }
        if(parent.right !== null){
            gpa.left = parent.right;
            parent.right.parent = gpa;
        }
        else{
            gpa.left = null;
        }
        gpa.parent = parent;
        parent.right = gpa;
    }
};

RBT.prototype.leftRotate = function(node) {
    if( (node.value > node.parent.value) && (node.value < node.parent.parent.value) ){
        let parent = node.parent;
        let gpa = parent.parent;
        let nodeLeftChild = node.left;
        if(nodeLeftChild !== null){
            parent.right = nodeLeftChild;
            nodeLeftChild.parent = parent;
        }
        else{                                  //this one should happen
            parent.right = null;
        }
        node.left = parent;
        parent.parent = node;
        gpa.left = node;
        node.parent = gpa;
    }
    else if( (node.value > node.parent.value) && (node.value > node.parent.parent.value) ){
        let parent = node.parent;//gpa.right;
        let gpa = parent.parent;
        let gpaParent;
        if(gpa.parent !== null){
            gpaParent = gpa.parent;
            if(gpaParent.value < parent.value){
                gpaParent.right = parent;
                parent.parent = gpaParent;
            }
            else{
                gpaParent.left = parent;
                parent.parent = gpaParent;
            }
        }
        else{
            this.root = parent;
            parent.parent = null;
        }
        if(parent.left !== null){
            gpa.right = parent.left;
            parent.left.parent = gpa;
        }
        else{
            gpa.right = null;
        }
        gpa.parent = parent;
        parent.left = gpa;
    }
};

function CircleObj(circle, node, text, depth){
    this.circle = circle;
    this.node = node;
    this.text = text;
    this.depth = depth;
    this.getX = function(){
        return this.circle._translation.x;
    };
    this.getY = function(){
        return this.circle._translation.y;
    };
}

function findParentCircleNode(circleObjArray, parent){
    for(let i = 0; i < circleObjArray.length; i++){
        if(circleObjArray[i].node === parent){
            return circleObjArray[i];
        }
    }
}

function findCircleNode(circleObjArray, node){
    for(let i = 0; i < circleObjArray.length; i++){
        if(circleObjArray[i].node === node){
            return circleObjArray[i];
        }
    }
}

function display(root){
    const primeX = Math.round(document.getElementById('draw-shapes').offsetWidth/2);
    const primeY = 55;
    const radius = 25;
    const branch = 60;
    two.clear();
    two.update();
    let circleObjArray = [];
    let nodesToGenerateArray = BFS(root);
    (function generateRoot(){
        if(nodesToGenerateArray.length === 0 )
            return console.log("Empty tree...");
        let rootCircle = two.makeCircle(primeX, primeY, radius);
        rootCircle.fill = nodesToGenerateArray[0][0].color;
        let text = two.makeText(nodesToGenerateArray[0][0].value, primeX, primeY);
        if (rootCircle.fill === black)
            text.fill = 'white';
        circleObjArray.push(new CircleObj(rootCircle, nodesToGenerateArray[0][0], text));
    }());
    function displayHelper(currentNode){
        let currentCircleNode = findCircleNode(circleObjArray, currentNode);
        let currentBL = currentCircleNode.getX() - radius;
        let currentBR = currentCircleNode.getX() + radius;
        let centerCurrent = currentCircleNode.getX();
        let tempRoot = root;
        let centerRoot = circleObjArray[0].getX();

        if(currentNode.value < currentNode.parent.value && currentNode.parent.value < currentNode.parent.parent.value && centerRoot !== centerCurrent){
            return;
        }
        if(currentNode.value > currentNode.parent.value && currentNode.parent.value > currentNode.parent.parent.value && centerRoot !== centerCurrent){
            return;
        }
        while(tempRoot !== null){
            let tempRootCircleNode = findCircleNode(circleObjArray, tempRoot);
            let boundaryL = tempRootCircleNode.getX() - radius;
            let boundaryR = tempRootCircleNode.getX() + radius;
            if(currentNode.value < tempRoot.value){
                if(currentBR >= boundaryL){
                    let targetCircleNode;
                    if(currentNode.parent.parent !== root){
                        if(currentNode.value >= currentNode.parent.value && currentNode.parent.value >= currentNode.parent.parent.value){
                            targetCircleNode = findCircleNode(circleObjArray, tempRoot.left);
                        }else{
                            if(currentNode.value >= root.value){
                                let parent = findCircleNode(circleObjArray, tempRoot.parent);
                                tempRootCircleNode.text.translation.set(tempRootCircleNode.getX() + (Math.abs(parent.getX() - tempRootCircleNode.getX()) + branch),
                                    tempRootCircleNode.getY());
                                tempRootCircleNode.circle.translation.set(tempRootCircleNode.getX() + (Math.abs(parent.getX() - tempRootCircleNode.getX()) + branch),
                                    tempRootCircleNode.getY());
                                targetCircleNode = findCircleNode(circleObjArray, tempRoot.left);
                                restructureDisplay(tempRootCircleNode, 'rightCase');
                            }else{
                                targetCircleNode = findCircleNode(circleObjArray, tempRoot.left);
                            }
                        }
                    }else{
                        targetCircleNode = findCircleNode(circleObjArray, tempRoot.left);
                    }
                    targetCircleNode = findCircleNode(circleObjArray, tempRoot.left);
                    targetCircleNode.text.translation.set(tempRootCircleNode.getX() - (Math.abs(tempRootCircleNode.getX() - targetCircleNode.getX()) + branch),
                        targetCircleNode.getY());
                    targetCircleNode.circle.translation.set(tempRootCircleNode.getX() - (Math.abs(tempRootCircleNode.getX() - targetCircleNode.getX()) + branch),
                        targetCircleNode.getY());
                    restructureDisplay(targetCircleNode, 'rightCase');
                    break;
                }else{
                    tempRoot = tempRoot.left;
                }
            }else{
                if(currentBL <= boundaryR){
                    let targetCircleNode;
                    if(currentNode.parent.parent !== root){
                        if(currentNode.value < currentNode.parent.value && currentNode.parent.value < currentNode.parent.parent.value){
                            targetCircleNode = findCircleNode(circleObjArray, tempRoot.right);
                        }else{
                            if(currentNode.value < root.value){
                                let parent = findCircleNode(circleObjArray, tempRoot.parent);
                                tempRootCircleNode.text.translation.set(tempRootCircleNode.getX() - (Math.abs(parent.getX() - tempRootCircleNode.getX()) + branch),
                                    tempRootCircleNode.getY());
                                tempRootCircleNode.circle.translation.set(tempRootCircleNode.getX() - (Math.abs(parent.getX() - tempRootCircleNode.getX()) + branch),
                                    tempRootCircleNode.getY());
                                targetCircleNode = findCircleNode(circleObjArray, tempRoot.right);
                                restructureDisplay(tempRootCircleNode, 'leftCase');
                            }else{
                                targetCircleNode = findCircleNode(circleObjArray, tempRoot.right);
                            }
                        }
                    }else{
                        targetCircleNode = findCircleNode(circleObjArray, tempRoot.right);
                    }
                    targetCircleNode.text.translation.set(tempRootCircleNode.getX() + (Math.abs(tempRootCircleNode.getX() - targetCircleNode.getX()) + branch),
                        targetCircleNode.getY());
                    targetCircleNode.circle.translation.set(tempRootCircleNode.getX() + (Math.abs(tempRootCircleNode.getX() - targetCircleNode.getX()) + branch),
                        targetCircleNode.getY());
                    restructureDisplay(targetCircleNode, 'leftCase');
                    break;
                }else{
                    tempRoot = tempRoot.right;
                }
            }
        }
        function restructureDisplay(targetCircleNode, flag){
            if (flag === 'leftCase') {
                if (targetCircleNode.node === currentNode.parent) {
                    currentCircleNode.circle.translation.set(targetCircleNode.getX() - branch, targetCircleNode.getY() + primeY);
                    currentCircleNode.text.translation.set(targetCircleNode.getX() - branch, targetCircleNode.getY() + primeY);
                }
                else {
                    if (targetCircleNode.node.left !== null) {
                        let targetCircleNodeLeft = findCircleNode(circleObjArray, targetCircleNode.node.left);
                        targetCircleNodeLeft.circle.translation.set(targetCircleNode.getX() - branch, targetCircleNode.getY() + primeY);
                        targetCircleNodeLeft.text.translation.set(targetCircleNode.getX() - branch, targetCircleNode.getY() + primeY);
                    }
                    if (targetCircleNode.node.right !== null) {
                        let targetCircleNodeRight = findCircleNode(circleObjArray, targetCircleNode.node.right);
                        targetCircleNodeRight.circle.translation.set(targetCircleNode.getX() + branch, targetCircleNode.getY() + primeY);
                        targetCircleNodeRight.text.translation.set(targetCircleNode.getX() + branch, targetCircleNode.getY() + primeY);
                    }
                    let currentCircleNodeParent = findCircleNode(circleObjArray, currentNode.parent);
                    if (currentNode.value >= currentNode.parent.value) {
                        currentCircleNode.circle.translation.set(currentCircleNodeParent.getX() + branch, currentCircleNodeParent.getY() + primeY);
                        currentCircleNode.text.translation.set(currentCircleNodeParent.getX() + branch, currentCircleNodeParent.getY() + primeY);
                    } else {
                        currentCircleNode.circle.translation.set(currentCircleNodeParent.getX() - branch, currentCircleNodeParent.getY() + primeY);
                        currentCircleNode.text.translation.set(currentCircleNodeParent.getX() - branch, currentCircleNodeParent.getY() + primeY);
                    }
                }
            }else if(flag === 'rightCase'){
                if (targetCircleNode.node === currentNode.parent) {
                    currentCircleNode.circle.translation.set(targetCircleNode.getX() + branch, targetCircleNode.getY() + primeY);
                    currentCircleNode.text.translation.set(targetCircleNode.getX() + branch, targetCircleNode.getY() + primeY);
                    if (targetCircleNode.node.left !== null) {
                        let sibling = findCircleNode(circleObjArray, targetCircleNode.node.left);
                        sibling.text.translation.set(targetCircleNode.getX() - branch, targetCircleNode.getY() + primeY);
                        sibling.circle.translation.set(targetCircleNode.getX() - branch, targetCircleNode.getY() + primeY);
                    }
                }
                else {
                    if (targetCircleNode.node.left !== null) {
                        let targetCircleNodeLeft = findCircleNode(circleObjArray, targetCircleNode.node.left);
                        targetCircleNodeLeft.circle.translation.set(targetCircleNode.getX() - branch, targetCircleNode.getY() + primeY);
                        targetCircleNodeLeft.text.translation.set(targetCircleNode.getX() - branch, targetCircleNode.getY() + primeY);
                    }
                    if (targetCircleNode.node.right !== null) {
                        let targetCircleNodeRight = findCircleNode(circleObjArray, targetCircleNode.node.right);
                        targetCircleNodeRight.circle.translation.set(targetCircleNode.getX() + branch, targetCircleNode.getY() + primeY);
                        targetCircleNodeRight.text.translation.set(targetCircleNode.getX() + branch, targetCircleNode.getY() + primeY);
                    }
                    let currentCircleNodeParent = findCircleNode(circleObjArray, currentNode.parent);
                    if (currentNode.value >= currentNode.parent.value) {
                        currentCircleNode.circle.translation.set(currentCircleNodeParent.getX() + branch, currentCircleNodeParent.getY() + primeY);
                        currentCircleNode.text.translation.set(currentCircleNodeParent.getX() + branch, currentCircleNodeParent.getY() + primeY);
                    } else {
                        currentCircleNode.circle.translation.set(currentCircleNodeParent.getX() - branch, currentCircleNodeParent.getY() + primeY);
                        currentCircleNode.text.translation.set(currentCircleNodeParent.getX() - branch, currentCircleNodeParent.getY() + primeY);
                    }
                }
            }
        }
    }

    for(let i = 1; i < nodesToGenerateArray.length; i++){
        let parentNodeCircle = findParentCircleNode(circleObjArray, nodesToGenerateArray[i][0].parent);
        if (nodesToGenerateArray[i][0].value < nodesToGenerateArray[i][0].parent.value) {
            if (nodesToGenerateArray[i][0].parent === root) {
                let circle = two.makeCircle(parentNodeCircle.getX() - branch, parentNodeCircle.getY() + primeY, radius);
                circle.fill = nodesToGenerateArray[i][0].color;
                let text = two.makeText(nodesToGenerateArray[i][0].value, parentNodeCircle.getX() - branch, parentNodeCircle.getY() + primeY);
                if (circle.fill === black)
                    text.fill = 'white';
                circleObjArray.push(new CircleObj(circle, nodesToGenerateArray[i][0], text, nodesToGenerateArray[i][1]));
            } else {
                let circle = two.makeCircle(parentNodeCircle.getX() - branch, parentNodeCircle.getY() + primeY, radius);
                circle.fill = nodesToGenerateArray[i][0].color;
                let text = two.makeText(nodesToGenerateArray[i][0].value, parentNodeCircle.getX() - branch, parentNodeCircle.getY() + primeY);
                if (circle.fill === black)
                    text.fill = 'white';
                circleObjArray.push(new CircleObj(circle, nodesToGenerateArray[i][0], text, nodesToGenerateArray[i][1]));
                displayHelper(nodesToGenerateArray[i][0]);
            }
        } else {
            if (nodesToGenerateArray[i][0].parent === root) {
                let circle = two.makeCircle(parentNodeCircle.getX() + branch, parentNodeCircle.getY() + primeY, radius);
                circle.fill = nodesToGenerateArray[i][0].color;
                let text = two.makeText(nodesToGenerateArray[i][0].value, parentNodeCircle.getX() + branch, parentNodeCircle.getY() + primeY);
                if (circle.fill === black)
                    text.fill = 'white';
                circleObjArray.push(new CircleObj(circle, nodesToGenerateArray[i][0], text, nodesToGenerateArray[i][1]));
            } else {
                let circle = two.makeCircle(parentNodeCircle.getX() + branch, parentNodeCircle.getY() + primeY, radius);
                circle.fill = nodesToGenerateArray[i][0].color;
                let text = two.makeText(nodesToGenerateArray[i][0].value, parentNodeCircle.getX() + branch, parentNodeCircle.getY() + primeY);
                if (circle.fill === black)
                    text.fill = 'white';
                circleObjArray.push(new CircleObj(circle, nodesToGenerateArray[i][0], text, nodesToGenerateArray[i][1]));
                displayHelper(nodesToGenerateArray[i][0]);
            }
        }
    }
    two.update();
}

// ----- Testing Area Below -----

// window.onload = function () {
//
// };

// Testing if jQuery is functioning properly
// window.onload = function() {
//     if (window.jQuery) {
//         // jQuery is loaded
//         alert("Yeah!");
//     } else {
//         // jQuery is not loaded
//         alert("Doesn't Work");
//     }
// };

//Sample Queue
//============
/*var queue = [];
queue.push(2);
queue.push(5);
queue.push(8);
queue.push(12);
queue.push(15);
console.log(queue);
let head;
for(let i = 0; i < queue.length; i++){
    head = queue.shift();
    if(head !== undefined) {
        i = -1;
        console.log(head, "length: "+queue.length);
    }
}
console.log(queue);*/

//let redBlack = new RBT();
redBlack.insert(100);
redBlack.insert(200);
redBlack.insert(25);
redBlack.insert(150);
redBlack.insert(250);
redBlack.insert(125);
redBlack.insert(175);
redBlack.insert(185);


//console.log('\\n');
//console.log(redBlack.root.value);
//display(redBlack.root);
// redBlack.insert(20);
// redBlack.insert(10);
// redBlack.insert(30);
// redBlack.insert(35);
// redBlack.insert(5);
// redBlack.insert(15);
// redBlack.insert(12);
// redBlack.insert(60);
// redBlack.insert(20);

// redBlack.insert(50);
// redBlack.insert(100);
// redBlack.insert(25);
// redBlack.insert(250);
// redBlack.insert(175);
// redBlack.insert(120);
// redBlack.insert(200);
// redBlack.insert(225);
// redBlack.insert(240);
// redBlack.insert(235);
// redBlack.insert(238);
//
//
//
//redBlack.insert(1);
//redBlack.insert(11);
//redBlack.insert(111);
//inOrder(redBlack.root);