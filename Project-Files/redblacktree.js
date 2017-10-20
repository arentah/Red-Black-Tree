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
            node.parent = "null";
        }
        console.log("the value of node is: " + node.value + ", color is: " + node.color + " parent of node is: " + node.parent.value  );
        inOrder(node.right);
    }
}

// let bst = new BST();
// bst.push(3);
// bst.push(2);
// bst.push(4);
// bst.push(1);
// bst.push(5);
//
// inOrder(bst.root);


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
    if(parent.parent != null ){
        gpa = parent.parent;
        if(parent.value < gpa.value){
            uncle = gpa.right;
        }
        else{
            uncle = gpa.left;
        }
    }

    if(red == parent.color  && red == uncle.color){
        parent.color = black;
        uncle.color = black;
        gpa.color = red;
    }


    this.root.color = black;
};


let redBlack = new RBT();
redBlack.push(10);
redBlack.push(15);
redBlack.push(5);
redBlack.push(3);

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
