/**
 * Created by Aren on 11/1/2017.
 */
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