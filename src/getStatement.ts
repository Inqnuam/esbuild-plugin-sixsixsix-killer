import ts from "typescript";

export function getStatement(context: ts.TransformationContext, node: ts.Node, killCode: number) {
  // @ts-ignore
  if (ts.isIfStatement(node) && node.expression?.text == killCode) {
    if (!node.elseStatement) {
      return null;
    } else if (node.elseStatement) {
      if (
        // @ts-ignore
        node.elseStatement.expression?.text == killCode
      ) {
        return null;
      } else {
        // @ts-ignore
        return node.elseStatement.expression ? node.elseStatement : node.elseStatement.statements;
      }
    } else {
      return node.elseStatement ?? null;
    }
  } else if (ts.isConditionalExpression(node)) {
    // @ts-ignore
    if (ts.isNumericLiteral(node.condition) && node.condition.text == killCode) {
      return node.whenFalse;
    } else if (
      ts.isPrefixUnaryExpression(node.condition) &&
      ts.isNumericLiteral(node.condition.operand) &&
      // @ts-ignore
      node.condition.operand.text == killCode
    ) {
      return node.whenTrue;
    }
    // @ts-ignore
  } else if (ts.isExpressionStatement(node) && ts.isBinaryExpression(node.expression) && node.expression.left?.text == killCode) {
    return null;
  }

  return undefined;
}
