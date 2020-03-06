var contentblock = null;
var currentSelection = null;
var diagramContainer = null;
var width=600;

window.addEventListener('load', (event) => {
    let root = new MojjRte.RootNode();

    var header = new MojjRte.TextBlockNode(null,'header');
    header.appendChild(new MojjRte.TextNode('Examp'));
    header.appendChild(new MojjRte.TextNode('le', ['underlined']));
    header.appendChild(new MojjRte.TextNode(' Header'));

    root.appendChild(header);

    var textBlock1 = new MojjRte.TextBlockNode(null, 'basic');
    textBlock1.appendChild(new MojjRte.TextNode('Lorem',['bold']));
    textBlock1.appendChild(new MojjRte.TextNode(' ipsum\ndolor'));
    
    root.appendChild(textBlock1);

    var list = new MojjRte.ListNode();
    list.appendChild(new MojjRte.ListItemNode());
    list.appendChild(new MojjRte.ListItemNode([new MojjRte.TextNode('sit',['bold']), new MojjRte.TextNode(' amet')]));
    
    root.appendChild(list);

    let rte = document.getElementById('main');    

    rte.setValue(root);

    rte.addEventListener('rte:documentChanged',_handleDocumentChanged);

    diagramContainer = document.getElementById('diagram-container');
});

function _handleDocumentChanged(event) {
    var svg = chart(event.detail.html);

    diagramContainer.innerHTML = '';
    diagramContainer.appendChild(svg);
}

function chart(data) {
    var root = tree(data);
    
    let x0 = Infinity;
    let x1 = -x0;
    root.each(d => {
        if (d.x > x1) x1 = d.x;
        if (d.x < x0) x0 = d.x;
    });

  const svg = d3.create("svg")
      .attr("viewBox", [0, 0, width, x1 - x0 + root.dx * 2])
      .style("font", "10px sans-serif");
  
  const g = svg.append("g")
      .attr("font-family", "sans-serif")
      .attr("font-size", 10)
      .attr("transform", `translate(${root.dy / 3},${root.dx - x0})`);
    
  const link = g.append("g")
    .attr("fill", "none")
    .attr("stroke", "#555")
    .attr("stroke-opacity", 0.4)
    .attr("stroke-width", 1.5)
  .selectAll("path")
    .data(root.links())
    .join("path")
      .attr("d", d3.linkHorizontal()
          .x(d => d.y)
          .y(d => d.x));
  
  const node = g.append("g")
      .attr("stroke-linejoin", "round")
      .attr("stroke-width", 3)
    .selectAll("g")
    .data(root.descendants())
    .join("g")
      .attr("transform", d => `translate(${d.y},${d.x})`);

  node.append("circle")
      .attr("fill", d => d.children ? "#555" : "#999")
      .attr("r", 2.5);

  node.append("text")
      .attr("dy", "0.10em")
      .attr("x", d => d.children ? -6 : 6)
      .attr("text-anchor", d => d.children ? "end" : "start")
      .text(text)
      .clone(true).lower()
      .attr("stroke", "white");
  
  return svg.node();
}

function text(d) {
    return d.data.constructor.name;
}

function tree(data) {
    const root = d3.hierarchy(data);
    root.dx = 10;
    root.dy = width / (root.height + 1);

    return d3.tree().nodeSize([root.dx, root.dy])(root);
}

function getPath(root, descendant){
  if(descendant === root){
    return '';
  }
     
  var parent = descendant.parentNode;
  
  if(!parent){
    return undefined;    
  }
    
  var index = Array.prototype.indexOf.call(parent.childNodes, descendant);
  
  return getPath(root, parent) + '/' + index.toString();
}

function depth(tree) {
  var max = 0;
  
  if(tree.children) {
    
    for(var index = 0; index < tree.children.length; index++){
      var current = depth(tree.children[index]);
      
      if(current > max) {
        max = current;
      }
    }  
    
  }
  return max + 1
}