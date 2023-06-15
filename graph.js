/** Node class for graph. */

class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}


/** Graph class. */

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  /** add Node instance and add it to nodes property on graph. */
  addVertex(vertex) {
    // add single node to this.nodes on graph class 
    this.nodes.add(vertex);
  }

  /** add array of new Node instances and adds to them to nodes property. */
  addVertices(vertexArray) {
    for (let vertex of vertexArray) {
      this.nodes.add(vertex);
    }
  }

  /** add edge between vertices v1,v2 */
  addEdge(v1, v2) {
    // create the lines between v1 and v2
    v1.adjacent.add(v2);
    v2.adjacent.add(v1);
  }

  /** remove edge between vertices v1,v2 */
  removeEdge(v1, v2) {
    v1.adjacent.delete(v2);
    v2.adjacent.delete(v1);
  }

  /** remove vertex from graph:
   *
   * - remove it from nodes property of graph
   * - update any adjacency lists using that vertex
   */
  removeVertex(vertex) {
    this.nodes.delete(vertex)

    for (let neighborVertex of vertex.adjacent) {
      neighborVertex.adjacent.delete(vertex)
    }
  }

  /** traverse graph with DFS and returns array of Node values */
  depthFirstSearch(start) {
    const values = [start.value];
    const toVisitStack = [start];
    const seen = new Set(toVisitStack);

    while (toVisitStack.length > 0) {

      let current = toVisitStack.pop();

      for (let neighborVertex of current.adjacent) {
        if (!seen.has(neighborVertex)) {
          seen.add(neighborVertex)
          toVisitStack.push(neighborVertex)
          values.push(neighborVertex.value)
        }
        console.log(toVisitStack)
      }
    }
    return values;
  }

  //init an array to push
  //create a set of vertex we've visited
  //iteratively use a while loop/for loop
  //stack LIFO use .pop
  //

  /** traverse graph with BDS and returns array of Node values */
  breadthFirstSearch(start) { }

  /** find the distance of the shortest path from the start vertex to the end vertex */
  distanceOfShortestPath(start, end) { }
}

module.exports = { Graph, Node }
