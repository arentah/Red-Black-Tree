/**
 * Created by Aren on 10/14/2017.
 */

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
});

var red = 'red';
var black = 'black';

function Node(value){
    this.value = value;
    this.left = null;
    this.right = null;
    this.color = red;
    this.parent = null;
}

function BST(){
    this.root = null;
}

BST.prototype.push = function(value){
    let root = this.root;
    if(!root){ //if root is null add value as root and return
        this.root = new Node(value);
        return;
    }
    let current = root;
    let newNode = new Node(value);
    while(true){
        if(value < current.value){ //if value is smaller than current add to left
            if(!current.left){
                current.left = newNode;
                break;
            }
            else
                current = current.left; //if current.left is not null traverse to this node
        }
        else{
            if(!current.right){ //if value is larger than current add to right
                current.right = newNode;
                break;
            }
            else
                current = current.right; //if current.right is not null traverse to this node
        }
    }
};

function inOrder(node){ //display inorder traversal
    if(node){
        inOrder(node.left);
        if(node.parent == null){
            node.parent = {
                value: "root"
            }
        }
        console.log("the value of node is: " + node.value + ", color is: " + node.color + ", parent of node is: " + node.parent.value  );
        inOrder(node.right);
    }
}

function RBT(){
    this.root = null;
}

RBT.prototype.push = function(value){

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
    let parent = newNode.parent;
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
            if(newNode.value > parent.value){       //case 1
                redBlack.leftRotate(newNode);
                redBlack.rightRotate(newNode.left);
                newNode = newNode.left;
            }
            else if (newNode.value < parent.value){     //case 2
                redBlack.rightRotate(newNode);
            }
            let tempColor = newNode.parent.color;
            newNode.parent.color = newNode.parent.right.color;
            newNode.parent.right.color = tempColor;
        }
        else if(side == 1){
            if(newNode.value > parent.value){       //case 3
                redBlack.leftRotate(newNode);
            }
            else if (newNode.value < parent.value){     //case 4
                redBlack.rightRotate(newNode);
                redBlack.leftRotate(newNode.right);
                newNode = newNode.right;
            }
            let tempColor = newNode.parent.color;
            newNode.parent.color = newNode.parent.left.color;
            newNode.parent.left.color = tempColor;

        }
    }
    else if(red == parent.color  && red == uncle.color){
        parent.color = black;
        uncle.color = black;
        gpa.color = red;
        redBlack.reCheck(gpa);
    }
    this.root.color = black;
};

RBT.prototype.reCheck = function(grand){
    if(grand.parent != null) {
        while (true) {
            //let currentNode = grand;
            let parent = grand.parent;//currentNode.parent;
            let gpa = parent.parent;
            let uncle;
            if (parent != null && gpa != null) {
                if (parent.value < gpa.value) {
                    uncle = gpa.right;
                }
                else {
                    uncle = gpa.left;
                }
            }
            if (red == parent.color && red == uncle.color) {
                parent.color = black;
                uncle.color = black;
                gpa.color = red;
                redBlack.reCheck(gpa);
            }
            else
                break;
        }
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
// redBlack.push(10);
// redBlack.push(1);
// redBlack.push(5);

// redBlack.push(10);
// redBlack.push(3);
// redBlack.push(8);

// redBlack.push(10);
// redBlack.push(15);
// redBlack.push(12);

// redBlack.push(10);
// redBlack.push(20);
// redBlack.push(30);

// redBlack.push(-1);
// redBlack.push(10);
// redBlack.push(15);
// redBlack.push(5);
// redBlack.push(8);
// redBlack.push(1);


redBlack.push(10);
redBlack.push(20);
redBlack.push(15);






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
