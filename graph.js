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
    const values = [];           
    const toVisitStack = [start];            
    const seen = new Set(toVisitStack);      

    while (toVisitStack.length > 0) {

      let current = toVisitStack.pop();      
      values.push(current.value);

      for (let neighborVertex of current.adjacent) {   
        if (!seen.has(neighborVertex)) {
          seen.add(neighborVertex)                     
          toVisitStack.push(neighborVertex)
        }
      }
    }

    console.log(values);
    return values;
  }

  //init an array to push
  //create a set of vertex we've visited
  //iteratively use a while loop/for loop
  //stack LIFO use .pop
  //

  /** traverse graph with BDS and returns array of Node values */
  breadthFirstSearch(start) { 
    const values = [];           
    const toVisitStack = [start];            
    const seen = new Set(toVisitStack);      

    while (toVisitStack.length > 0) {

      let current = toVisitStack.shift();      
      values.push(current.value);

      for (let neighborVertex of current.adjacent) {   
        if (!seen.has(neighborVertex)) {
          seen.add(neighborVertex)                     
          toVisitStack.push(neighborVertex)
        }
      }
    }

    console.log(values);
    return values;
  }

  /** find the distance of the shortest path from the start vertex to the end vertex */
  distanceOfShortestPath(start, end, seen = new Set([start]), counter = 0) {
    if (start === end) return true;
    debugger;

    for (let neighbor of start.adjacent) {
      if (!seen.has(neighbor)) {
        seen.add(neighbor);
        counter += 1;
        if (this.distanceOfShortestPath(neighbor, end, seen, counter)) {
          return counter;
        }
      }
    }
    
    console.log(counter);
    return counter;
  }
}

let graph = new Graph();

    let r = new Node("R");
    let i = new Node("I");
    let t = new Node("T");
    let h = new Node("H");
    let m = new Node("M");

    graph.addVertices([r, i, t, h, m]);

    graph.addEdge(r, i);
    graph.addEdge(r, t);
    graph.addEdge(r, h);
    graph.addEdge(i, t);
    graph.addEdge(t, h);
    graph.addEdge(h, m);

graph.distanceOfShortestPath(r,m)

module.exports = { Graph, Node }


/**
 * p1 = marge
 * p2 = grampa
 * seen = [marge]
 * 
 * if (p1 === p2) return true
 * 
 * [marge]
 * p1.adjacent(marge) = [homer, maggie]
 * 
 * if neighbor not in seen 
 *    seen = [marge, homer]
 *        if (true) // pin
 *            return true 
 * 
 * 
 * 
 * 
 * second call of function 
 * p1 = homer
 * p2 = grampa
 * seen = [marge, homer]
 * 
 * p1.adjacent(homer) = [marge, maggie, lisa]
 * 
 * if neighbor not in seen 
 *  p1.adjacent(homer) [maggie, lisa]
 *  if !seen
 *    seen = [marge, homer, maggie]
 *        if (true) // pin
 *            return true 
 * 
 * third call of function 
 * p1 = maggie
 * p2 = grampa
 * seen = [marge, homer, maggie]
 * 
 * p1.adjacent(maggie) = [marge, lisa, homer]
 * 
 * if neighbor not in seen 
 *  p1.adjacent(maggie) arge, lisa, homer]
 *  if !seen
 *    seen = [marge, homer, maggie, lisa]
 *        if (true) // pin
 *            return true 
 * 
 * fourth call of function 
 * p1 = lisa
 * p2 = grampa
 * seen = [marge, homer, maggie, lisa]
 * 
 * p1.adjacent(lisa) = [grampa, maggie, homer]
 * 
 * if neighbor not in seen 
 *  if !seen
 *    seen = [marge, homer, maggie, lisa, grampa]
 *        if (true) // pin
 *            return true 
 * 
 * 
 * 
 * 
 * 
 *  fifth call of function 
 * p1 = grampa
 * p2 = grampa
 * seen = [marge, homer, maggie, lisa, grampa]
 * 
 * p1.adjacent(grampa) = [lisa]
 * 
 * if (p1 === p2) return true;
 *  -> return true
 */