# Red-Black-Tree

Three Cases for Insertion

1) If empty tree, add root and color black
2) If adding node to black parent, simply add new node as red
3) If adding node to red parent
	a) if uncle is black (or null) then rotate, recolor, and recheck
	b) if uncle is red then recolor and recheck