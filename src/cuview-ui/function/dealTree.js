/**
 * 递归过滤节点，生成新的树结构
 * @param {Node[]} nodes 要过滤的节点
 * @param {node => boolean} predicate 过滤条件，符合条件的节点保留
 * @return 过滤后的节点
 */
const deal = (nodes, predicate) => {
  // 如果已经没有节点了，结束递归
  if (!(nodes && nodes.length)) {
    return [];
  }
  const newChildren = [];
  for (const node of nodes) {
    if (predicate(node)) {
      // 如果节点符合条件，直接加入新的节点集
      newChildren.push(node);
      node.children = deal(node.children, predicate);
    } else {
      // 如果当前节点不符合条件，递归过滤子节点，
      // 把符合条件的子节点提升上来，并入新节点集
      newChildren.push(...deal(node.children, predicate));
    }
  }
  return newChildren;
}

export default deal;
