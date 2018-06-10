/**
 * Created by Aren on 10/14/2017.
 */

//On Document Load
$(document).ready(function(){
    $('#insert').on('input', function(){ //html insert function
        let text = $('#insert').val();
        let display = $('#output');
        text = parseInt(text, 10); //remove leading zeros
        if(isNaN(text)){ //check if input is not a number
            display.text(0);
        }
        else{
            display.text(text);
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
        inOrder(redBlack.root);
    });
});

//Global Variables
var red = 'red';
var black = 'black';

//Display Inorder Traversal
function inOrder(node){
    if(node){
        inOrder(node.left);
        if(node.parent == null){
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

//RBT "Class"
function RBT(){
    this.root = null;
}

function Node(value){
    this.value = value;
    this.left = null;
    this.right = null;
    this.color = red;
    this.parent = null;
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
            if(!temp.right){ //if value is larger than current add to right
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
    if(grand.parent != null) {
        while (true) {
            let parent = grand.parent;
            if (red == grand.color && red == parent.color)
                redBlack.insertionHelper(grand);
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
    if(parent.parent != null ){
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
    if( (red == parent.color && null == uncle) || (red == parent.color && black == uncle.color) ){
        if(side == 0){
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
        else if(side == 1){
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
    else if(red == parent.color  && red == uncle.color){
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
        if(nodeRightChild != null){         //this scenario should never happen
            parent.left = nodeRightChild;
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
        if(gpa.parent != null){
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
        if(parent.right != null){
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
        if(nodeLeftChild != null){             //this scenario should never happen
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
        if(gpa.parent != null){
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
        if(parent.left != null){
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

let redBlack = new RBT();
// redBlack.insert(50);
// redBlack.insert(45);
// redBlack.insert(55);
// redBlack.insert(48);
// redBlack.insert(35);
// redBlack.insert(52);
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
redBlack.insert(1);
redBlack.insert(11);
redBlack.insert(111);
inOrder(redBlack.root);




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
