import ts from "typescript";
import { getStatement } from "./getStatement";

const printer = ts.createPrinter({
  newLine: ts.NewLineKind.LineFeed,
});

function transformFac(context: ts.TransformationContext) {
  const container = this;
  return (rootNode: ts.Node) => {
    function visit(node: ts.Node): ts.Node {
      const foundImport = getStatement(context, node, container.killCode);

      if (typeof foundImport == "object") {
        // @ts-ignore
        return foundImport;
      }

      return ts.visitEachChild(node, visit, context);
    }
    return ts.visitNode(rootNode, visit);
  };
}

export class Killer {
  killCode: number;
  output: string;
  compilerOptions: any;
  constructor(filePath: string, killCode: number, compilerOptions: any, loader: string) {
    this.killCode = killCode;
    this.compilerOptions = compilerOptions;

    const host = loader.startsWith("ts") ? undefined : ts.createCompilerHost(this.compilerOptions);
    const program = ts.createProgram([filePath], this.compilerOptions, host);

    if (host) {
      program.emit();
    }

    const sourceFile = program.getSourceFile(filePath)!;
    const transformationResult = ts.transform(sourceFile, [transformFac.bind(this)], this.compilerOptions);
    const transformedSourceFile = transformationResult.transformed[0];

    this.output = printer.printNode(ts.EmitHint.Unspecified, transformedSourceFile, sourceFile);
  }
}
