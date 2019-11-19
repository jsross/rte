window.addEventListener('load', (event) => {
    let root = new MojjRte.BasicParentNode();

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
});
