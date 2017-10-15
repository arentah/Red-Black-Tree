/**
 * Created by Aren on 10/14/2017.
 */

$(document).ready(function(){

    $('#insert').on('input', function(){ //insert function
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

function Node(value){
    this.value = value;
    this.left = null;
    this.right = null;
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
            else{
                current = current.right; //if current.right is not null traverse to this node
            }
        }
    }
};

function inOrder(node){ //display inorder traversal
    if(node){
        inOrder(node.left);
        console.log(node.value);
        inOrder(node.right);
    }
}

let bst = new BST();
bst.push(3);
bst.push(2);
bst.push(4);
bst.push(1);
bst.push(5);

inOrder(bst.root);


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
