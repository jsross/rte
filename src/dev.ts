import BlockNode from "./core/nodes/concrete/block-node";
import TextNode from "./core/nodes/concrete/text-node";
import BasicParentNode from "./core/nodes/concrete/basic-parent-node";
import ListNode from "./core/nodes/concrete/list-node";

function init(){
    this.root = new BasicParentNode();
    this.root.appendChild(new BlockNode([new TextNode('Hello '), new TextNode('World', ['bigger']), new TextNode('!!!')]));
    this.root.appendChild(new BlockNode([new TextNode('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore'), new TextNode(' magna aliqua. Placerat in egestas erat imperdiet sed euismod nisi porta. Duis ultricies lacus sed turpis.')]));
    this.root.appendChild(new BlockNode([new TextNode('Signed,\nme')], ['style1', 'style2']));
    
    var list = new ListNode();
    list.appendChild(new BasicParentNode([new TextNode('Item 1')]));
    list.appendChild(new BasicParentNode([new TextNode('Item 2')]));
    
    this.root.appendChild(list);
}

document.onloadend = init;