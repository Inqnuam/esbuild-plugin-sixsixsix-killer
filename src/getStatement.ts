import ts from "typescript";

const getIfStatementResult = (context: ts.TransformationContext, node: ts.Node, killCode: number, rec: Function) => {
  // @ts-ignore
  if (node.expression) {
    // @ts-ignore
    if (node.expression?.text == killCode) {
      // @ts-ignore
      if (node.elseStatement) {
        // @ts-ignore
        if (!node.elseStatement.expression) {
          // @ts-ignore
          return node.elseStatement.statements;
        }
        // @ts-ignore
        return getIfStatementResult(context, node.elseStatement, killCode, rec); // rec(node);
      } else {
        return null;
      }

      // @ts-ignore
    } else {
      // @ts-ignore
      return rec(node);
    }
  } else {
    // @ts-ignore
    if (node.elseStatement) {
      // @ts-ignore
      if (!node.elseStatement.expression) {
        // @ts-ignore
        return node.elseStatement.statements;
      }
      // @ts-ignore
      return getIfStatementResult(context, node.elseStatement, killCode, rec);
    } else {
      return rec(node);
    }
  }
};

export function getStatement(context: ts.TransformationContext, node: ts.Node, killCode: number, rec: Function) {
  // @ts-ignore
  if (ts.isIfStatement(node)) {
    const himar = getIfStatementResult(context, node, killCode, rec);
    return himar;
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
  } else if (ts.isParenthesizedExpression(node)) {
    // @ts-ignore
    if (node.expression.left?.text == killCode) {
      return null;
    }
  }

  return node;
}
