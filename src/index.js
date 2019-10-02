window.addEventListener('load', (event) => {
    let root = new MojjRte.BasicParentNode();
    root.appendChild(new MojjRte.BlockNode([new MojjRte.TextNode('Hello '), new MojjRte.TextNode('World', ['bigger']), new MojjRte.TextNode('!!!')]));
    root.appendChild(new MojjRte.BlockNode([new MojjRte.TextNode('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore'), new MojjRte.TextNode(' magna aliqua. Placerat in egestas erat imperdiet sed euismod nisi porta. Duis ultricies lacus sed turpis.')]));
    root.appendChild(new MojjRte.BlockNode([new MojjRte.TextNode('Signed,\nme')], ['style1', 'style2']));
    
    var list = new MojjRte.ListNode();
    list.appendChild(new MojjRte.ListItemNode([new MojjRte.TextNode('Item 1')]));
    list.appendChild(new MojjRte.ListItemNode([new MojjRte.TextNode('Item 2')]));
    
    root.appendChild(list);

    let rte = document.getElementById('main');

    rte.setValue(root);
});
